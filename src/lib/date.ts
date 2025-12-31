export const formatFullDate = (d: Date = new Date()) => {
  return new Intl.DateTimeFormat(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(d);
};

export const formatShortDate = (d: Date = new Date()) => {
  return new Intl.DateTimeFormat(undefined, { weekday: 'long', month: 'long', day: 'numeric' }).format(d);
};

export const formatDateOnly = (d: Date = new Date()) => {
  return new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'numeric', day: 'numeric' }).format(d);
};

export default { formatFullDate, formatShortDate, formatDateOnly };
