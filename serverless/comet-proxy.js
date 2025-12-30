// Example Vercel serverless function to proxy requests to Cometapi.
// Replace COMETAPI_ENDPOINT with the real Cometapi endpoint and ensure COMETAPI_KEY is set in your deployment environment.

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages } = req.body || {};
  if (!messages) return res.status(400).json({ error: 'Missing messages' });

  const COMETAPI_KEY = process.env.COMETAPI_KEY;
  const COMETAPI_ENDPOINT = process.env.COMETAPI_ENDPOINT;
  const SYSTEM_PROMPT = process.env.COMET_SYSTEM_PROMPT;

  if (!COMETAPI_KEY) return res.status(500).json({ error: 'Missing COMETAPI_KEY' });
  if (!COMETAPI_ENDPOINT) return res.status(500).json({ error: 'Missing COMETAPI_ENDPOINT' });

  try {
    // Optionally prepend server-side system prompt to guide persona (introvert-supportive by default)
    const messagesToSend = Array.isArray(messages) ? [...messages] : [];
    if (SYSTEM_PROMPT) {
      messagesToSend.unshift({ role: 'system', content: SYSTEM_PROMPT });
    }

    const r = await fetch(COMETAPI_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${COMETAPI_KEY}`,
      },
      body: JSON.stringify({ messages: messagesToSend }),
    });

    const data = await r.json();
    // Normalize response to { reply: string }
    const reply = data.reply || (data.choices && data.choices[0]?.text) || data.output || JSON.stringify(data);
    res.status(200).json({ reply });
  } catch (err) {
    console.error('Proxy error', err);
    res.status(500).json({ error: 'Proxy error' });
  }
}
