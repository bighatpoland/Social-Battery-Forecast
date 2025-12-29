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