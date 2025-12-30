import { ChatMessage, loadChatUploadOptIn } from './storage';

const PROXY = (import.meta as any).env.VITE_CHAT_PROXY_URL || '/api/comet';

export const sendMessageToProxy = async (messages: ChatMessage[]) => {
  const res = await fetch(PROXY, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });

  if (!res.ok) {
    throw new Error(`Proxy error: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

// Fallback local rule engine for offline/demo
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
    const data = await sendMessageToProxy(messagesForApi);
    if (data?.reply) return data.reply as string;
    if (data?.choices && data.choices[0]?.text) return data.choices[0].text;
    return JSON.stringify(data);
  } catch (e) {
    const f = await localRuleEngine(messages);
    return f.reply;
  }
};

export default { sendMessage };
