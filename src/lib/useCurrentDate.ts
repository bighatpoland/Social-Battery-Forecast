import { useState, useEffect } from 'react';
import { formatFullDate, formatShortDate } from './date';

const useCurrentDate = () => {
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const updateNow = () => setNow(new Date());

    // Update at midnight
    const msUntilMidnight = () => {
      const d = new Date();
      const tomorrow = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
      return tomorrow.getTime() - d.getTime();
    };

    const midnightTimer = setTimeout(() => {
      updateNow();
      // schedule next midnight
      const t = setInterval(updateNow, 24 * 60 * 60 * 1000);
      return () => clearInterval(t);
    }, msUntilMidnight() + 1000);

    // Also keep fairly fresh if app stays open (minute ticks)
    const tick = setInterval(updateNow, 60 * 1000);

    return () => {
      clearTimeout(midnightTimer as any);
      clearInterval(tick as any);
    };
  }, []);

  return {
    now,
    formattedLong: formatFullDate(now),
    formattedShort: formatShortDate(now),
  };
};

export default useCurrentDate;
