import { useState, useEffect } from 'react';
import { ChatMessage, loadChatHistory, saveChatHistory, clearChatHistory } from './storage';
import chatApi from './chatApi';

const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const saved = loadChatHistory();
    if (saved && saved.length) setMessages(saved);
  }, []);

  useEffect(() => {
    saveChatHistory(messages);
  }, [messages]);

  const makeId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,9)}`;

  const sendMessage = async (text: string) => {
    const userMsg: ChatMessage = { id: makeId(), role: 'user', text, createdAt: Date.now() };
    setMessages((m) => [...m, userMsg]);
    setIsLoading(true);
    try {
      const reply = await chatApi.sendMessage([...messages, userMsg]);
      const assistant: ChatMessage = { id: makeId(), role: 'assistant', text: reply, createdAt: Date.now() };
      setMessages((m) => [...m, assistant]);
    } catch (err) {
      const errMsg: ChatMessage = { id: makeId(), role: 'assistant', text: 'Sorry, something went wrong.', createdAt: Date.now() };
      setMessages((m) => [...m, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    clearChatHistory();
    setMessages([]);
  };

  return { messages, sendMessage, clearHistory, isLoading };
};

export default useChat;
