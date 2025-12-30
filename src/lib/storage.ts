export const saveInputs = (inputs: any) => {
  localStorage.setItem('socialInputs', JSON.stringify(inputs));
};

export const loadInputs = () => {
  const data = localStorage.getItem('socialInputs');
  return data ? JSON.parse(data) : null;
};

export const saveEvents = (events: any[]) => {
  localStorage.setItem('calendarEvents', JSON.stringify(events));
};

export const loadEvents = (): any[] => {
  const data = localStorage.getItem('calendarEvents');
  return data ? JSON.parse(data) : [];
};

// Chat history helpers
export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  createdAt?: number;
};

export const saveChatHistory = (messages: ChatMessage[]) => {
  localStorage.setItem('chatHistory', JSON.stringify(messages));
};

export const loadChatHistory = (): ChatMessage[] => {
  const data = localStorage.getItem('chatHistory');
  return data ? JSON.parse(data) : [];
};

export const clearChatHistory = () => {
  localStorage.removeItem('chatHistory');
};

// Chat upload opt-in helpers
export const saveChatUploadOptIn = (v: boolean) => {
  localStorage.setItem('chatUploadOptIn', JSON.stringify(!!v));
};

export const loadChatUploadOptIn = (): boolean => {
  const data = localStorage.getItem('chatUploadOptIn');
  return data ? JSON.parse(data) : false;
};