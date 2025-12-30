import { ChatMessage, loadChatUploadOptIn } from './storage';

// Set your Gemini API key in .env: VITE_GEMINI_API_KEY=...
const GEMINI_API_KEY = (import.meta as any).env.VITE_GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.warn('VITE_GEMINI_API_KEY not set – will fall back to local rules only');
}

const GEMINI_MODEL = (import.meta as any).env.VITE_GEMINI_MODEL || 'gemini-1.5-flash';

// Convert your ChatMessage[] format to Gemini's expected contents format
const convertToGeminiFormat = (messages: ChatMessage[]) => {
  return messages.map((msg) => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.text }],
  }));
};

export const sendMessageToGemini = async (messages: ChatMessage[]) => {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured');
  }

  const contents = convertToGeminiFormat(messages);

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents }),
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Gemini API error ${res.status}: ${errorText}`);
  }

  const data = await res.json();

  // Extract the reply text
  const candidate = data.candidates?.[0] || data.outputs?.[0] || null;
  const text = candidate?.content?.parts?.[0]?.text || candidate?.content?.[0]?.parts?.[0]?.text;

  if (!text) {
    // Try some other common shapes
    const alt = data.candidates?.[0]?.content?.map((c: any) => c.parts?.map((p: any) => p.text).join('')).join('\n')
      || data.outputs?.[0]?.content?.map((c: any) => c.parts?.map((p: any) => p.text).join('')).join('\n');
    if (alt) return alt;
    throw new Error('No response text from Gemini');
  }

  return text;
};

// Fallback local rule engine (unchanged – for offline/demo)
export const localRuleEngine = async (messages: ChatMessage[]) => {
  const last = messages[messages.length - 1];
  const userText = last?.text || '';
  if (/recharge|recover|rest|sleep/i.test(userText)) {
    return { reply: 'Try taking a 10–20 minute break in a quiet space, or plan a low-energy activity you enjoy.' };
  }
  return { reply: `I hear you. You said: "${userText}" — tell me more about what you find draining.` };
};

export const sendMessage = async (messages: ChatMessage[]) => {
  // Respect user opt-in: only send full history if user opted in
  const optIn = loadChatUploadOptIn();
  const messagesForApi = optIn ? messages : [messages[messages.length - 1]];

  try {
    const reply = await sendMessageToGemini(messagesForApi);
    return reply;
  } catch (e) {
    console.error('Gemini failed, falling back to local rules:', e);
    const fallback = await localRuleEngine(messages);
    return fallback.reply;
  }
};

export default { sendMessage };
