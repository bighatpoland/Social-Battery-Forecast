// Proxy serverless function supporting CometAPI and Google Gemini routing.
// When GOOGLE_API_KEY and GOOGLE_MODEL are set, requests are forwarded to
// Google Gemini's generateContent endpoint. Otherwise requests are proxied to
// the configured COMETAPI_ENDPOINT using COMETAPI_KEY.

// Simple in-memory quota bookkeeping for demo purposes.
const userQuotaStore = new Map();

const getClientId = (req) => {
  const hdr = req.headers['x-user-id'] || req.headers['x-client-id'];
  if (hdr) return String(hdr);
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) return String(forwarded).split(',')[0].trim();
  return req.socket && req.socket.remoteAddress ? req.socket.remoteAddress : 'unknown';
};

const now = () => Date.now();
const startOfDay = (ts) => new Date(ts).toISOString().slice(0, 10);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages } = req.body || {};
  if (!messages) return res.status(400).json({ error: 'Missing messages' });

  const COMETAPI_KEY = process.env.COMETAPI_KEY;
  const COMETAPI_ENDPOINT = process.env.COMETAPI_ENDPOINT;
  const SYSTEM_PROMPT = process.env.COMET_SYSTEM_PROMPT;

  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
  const GOOGLE_MODEL = process.env.GOOGLE_MODEL; // e.g. gemini-1.5-flash

  if (!COMETAPI_KEY && !GOOGLE_API_KEY) return res.status(500).json({ error: 'Missing COMETAPI_KEY or GOOGLE_API_KEY' });

  // Quotas (can be set via env vars)
  const MAX_TOKENS_PER_REQUEST = parseInt(process.env.MAX_TOKENS_PER_REQUEST || '1500', 10);
  const MAX_TOKENS_PER_MINUTE = parseInt(process.env.MAX_TOKENS_PER_MINUTE || '3000', 10);
  const MAX_TOKENS_PER_DAY = parseInt(process.env.MAX_TOKENS_PER_DAY || '20000', 10);

  const clientId = getClientId(req);
  const todayKey = startOfDay(now());

  if (!userQuotaStore.has(clientId)) {
    userQuotaStore.set(clientId, {
      day: todayKey,
      tokensToday: 0,
      minuteWindowStart: Math.floor(now() / 60000),
      tokensThisMinute: 0,
    });
  }

  const entry = userQuotaStore.get(clientId);
  if (entry.day !== todayKey) {
    entry.day = todayKey;
    entry.tokensToday = 0;
  }

  if (entry.tokensToday >= MAX_TOKENS_PER_DAY) {
    return res.status(429).json({ error: 'Daily token quota exceeded' });
  }

  try {
    // Prepare messages
    const messagesToSend = Array.isArray(messages) ? [...messages] : [];
    if (SYSTEM_PROMPT && !GOOGLE_API_KEY) {
      messagesToSend.unshift({ role: 'system', content: SYSTEM_PROMPT });
    }

    // If Google env is set, route to Gemini generateContent
    if (GOOGLE_API_KEY && GOOGLE_MODEL) {
      const combinedText = messagesToSend.map((m) => m.content || m.text || '').join('\n').trim();
      const body = { contents: [{ parts: [{ text: combinedText || '' }] }] };

      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GOOGLE_MODEL}:generateContent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': GOOGLE_API_KEY,
        },
        body: JSON.stringify(body),
      });

      const data = await r.json();

      // Try to extract a human-readable reply from common Gemini shapes
      let reply = null;
      if (data?.candidates && data.candidates[0]) {
        const c = data.candidates[0];
        if (Array.isArray(c.content)) {
          reply = c.content.map((it) => it.text || (Array.isArray(it.parts) ? it.parts.map(p => p.text).join('') : '')).join(' ');
        } else if (typeof c === 'string') {
          reply = c;
        }
      } else if (Array.isArray(data?.outputs) && data.outputs[0]?.content) {
        reply = data.outputs[0].content.map((it) => it.text || (Array.isArray(it.parts) ? it.parts.map(p => p.text).join('') : '')).join(' ');
      } else if (data?.reply) {
        reply = data.reply;
      }

      return res.status(200).json({ reply: reply ?? JSON.stringify(data), usage: data?.usage || null });
    }

    // Fallback to Comet upstream
    if (!COMETAPI_ENDPOINT) return res.status(500).json({ error: 'Missing COMETAPI_ENDPOINT' });

    const r = await fetch(COMETAPI_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${COMETAPI_KEY}`,
      },
      body: JSON.stringify({ messages: messagesToSend }),
    });

    const data = await r.json();

    const used = data?.usage?.total_tokens ?? null;

    if (used !== null) {
      if (used > MAX_TOKENS_PER_REQUEST) {
        return res.status(400).json({ error: 'Request exceeds per-request token limit', usage: data.usage });
      }

      const currentMinute = Math.floor(now() / 60000);
      if (entry.minuteWindowStart !== currentMinute) {
        entry.minuteWindowStart = currentMinute;
        entry.tokensThisMinute = 0;
      }

      if (entry.tokensThisMinute + used > MAX_TOKENS_PER_MINUTE) {
        return res.status(429).json({ error: 'Per-minute token quota exceeded' });
      }

      if (entry.tokensToday + used > MAX_TOKENS_PER_DAY) {
        return res.status(429).json({ error: 'Daily token quota would be exceeded by this request' });
      }

      entry.tokensThisMinute += used;
      entry.tokensToday += used;
    }

    const reply = data.reply || (data.choices && data.choices[0]?.text) || data.output || JSON.stringify(data);
    const remainingDay = MAX_TOKENS_PER_DAY - (entry.tokensToday || 0);

    return res.status(200).json({ reply, usage: data.usage || null, quotas: { remainingDay, perRequestLimit: MAX_TOKENS_PER_REQUEST, perMinuteLimit: MAX_TOKENS_PER_MINUTE } });
    } catch (err) {
      console.error('Proxy error', err);
      return res.status(500).json({ error: 'Proxy error' });
    }
  }
