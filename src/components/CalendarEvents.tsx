import React, { useState } from 'react';
import { CalendarEvent } from '../types';

interface Props {
  events: CalendarEvent[];
  onChange: (events: CalendarEvent[]) => void;
}

const CalendarEvents: React.FC<Props> = ({ events, onChange }) => {
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '', socialCost: 0 });

  const addEvent = () => {
    if (!newEvent.title || !newEvent.start || !newEvent.end) return;
    const start = new Date(newEvent.start).getTime();
    const end = new Date(newEvent.end).getTime();
    if (start >= end) return;
    const event: CalendarEvent = {
      id: Date.now().toString(),
      title: newEvent.title,
      start,
      end,
      socialCost: newEvent.socialCost,
    };
    onChange([...events, event]);
    setNewEvent({ title: '', start: '', end: '', socialCost: 0 });
  };

  const removeEvent = (id: string) => {
    onChange(events.filter(e => e.id !== id));
  };

  return (
    <div className="p-4 bg-blue-100 rounded mb-4">
      <h2 className="text-lg font-bold mb-2">Calendar Events</h2>
      <div className="mb-4 flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="Event Title"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          className="border p-2 flex-1 min-w-0"
        />
        <input
          type="datetime-local"
          value={newEvent.start}
          onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
          className="border p-2"
        />
        <input
          type="datetime-local"
          value={newEvent.end}
          onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
          className="border p-2"
        />
        <input
          type="number"
          placeholder="Social Cost (0-10)"
          min="0"
          max="10"
          value={newEvent.socialCost}
          onChange={(e) => setNewEvent({ ...newEvent, socialCost: +e.target.value })}
          className="border p-2 w-20"
        />
        <button onClick={addEvent} className="bg-blue-500 text-white p-2 rounded">Add Event</button>
      </div>
      <ul className="space-y-2">
        {events.map(e => (
          <li key={e.id} className="flex justify-between items-center bg-white p-2 rounded">
            <div>
              <strong>{e.title}</strong> ({new Date(e.start).toLocaleString()} - {new Date(e.end).toLocaleString()}) - Cost: {e.socialCost}
            </div>
            <button onClick={() => removeEvent(e.id)} className="text-red-500 ml-2">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarEvents;