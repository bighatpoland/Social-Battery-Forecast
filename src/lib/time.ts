export const formatTime = (ms: number) => {
  return new Date(ms).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const now = () => Date.now();