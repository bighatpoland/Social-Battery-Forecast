#!/usr/bin/env node
// Simple local proxy server for testing comet-proxy logic.
// Usage: GOOGLE_API_KEY=... GOOGLE_MODEL=gemini-1.5-flash node serverless/dev-proxy-server.cjs

const http = require('http');

const PORT = process.env.PORT || 3001;

const parseJson = (req) => new Promise((resolve, reject) => {
  let body = '';
  req.on('data', (chunk) => { body += chunk.toString(); });
  req.on('end', () => {
    try { resolve(JSON.parse(body || '{}')); } catch (e) { reject(e); }
  });
  req.on('error', reject);
});

const now = () => Date.now();

const server = http.createServer(async (req, res) => {
  if (req.method !== 'POST' || req.url !== '/api/comet') {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
    return;
  }

  try {
    const body = await parseJson(req);
    const messages = body.messages || [];
    if (!messages.length) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing messages' }));
      return;
    }

    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
    const GOOGLE_MODEL = process.env.GOOGLE_MODEL;

    if (GOOGLE_API_KEY && GOOGLE_MODEL) {
      const combinedText = messages.map((m) => m.content || m.text || '').join('\n').trim();
      const payload = { contents: [{ parts: [{ text: combinedText || '' }] }] };
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GOOGLE_MODEL}:generateContent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': GOOGLE_API_KEY,
        },
        body: JSON.stringify(payload),
      });
      const data = await r.json();
      res.writeHead(r.status, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ proxied_status: r.status, data }));
      return;
    }

    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'No upstream configured' }));
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: String(err) }));
  }
});

server.listen(PORT, () => console.log(`Dev proxy listening on http://localhost:${PORT}/api/comet`));
