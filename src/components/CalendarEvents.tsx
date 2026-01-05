import React, { useState } from 'react';
import { CalendarEvent } from '../types';

interface Props {
  events: CalendarEvent[];
  onChange: (events: CalendarEvent[]) => void;
}

const quickTags = [
  { id: 'meeting', label: 'Meeting', icon: '📊', cost: 8 },
  { id: 'party', label: 'Party', icon: '🎉', cost: 9 },
  { id: 'coffee', label: 'Coffee', icon: '☕', cost: 4 },
  { id: 'deepwork', label: 'Deep Work', icon: '🎯', cost: 6 },
  { id: 'rest', label: 'Rest', icon: '🧘', cost: -5 },
];

const CalendarEvents: React.FC<Props> = ({ events, onChange }) => {
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '', socialCost: 0 });
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [focusedInput, setFocusedInput] = useState(false);

  const handleTagClick = (tag: typeof quickTags[0]) => {
    setSelectedTag(tag.id);
    setNewEvent({ ...newEvent, title: tag.label, socialCost: tag.cost });
  };

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
    setSelectedTag(null);
  };

  const removeEvent = (id: string) => {
    onChange(events.filter(e => e.id !== id));
  };

  return (
    <div className="bg-white bg-opacity-80 backdrop-blur-xl border border-white border-opacity-20 rounded-2xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Add Event</h2>

      {/* Quick Tags */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-slate-700 mb-3">Quick Tags</p>
        <div className="flex gap-3 flex-wrap">
          {quickTags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => handleTagClick(tag)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedTag === tag.id
                  ? 'bg-indigo-600 text-white shadow-lg scale-105'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span className="text-lg">{tag.icon}</span>
              <span className="text-sm">{tag.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Form Inputs */}
      <div className="space-y-4 mb-6">
        {/* Floating Label Event Name */}
        <div className="relative">
          <input
            type="text"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            onFocus={() => setFocusedInput(true)}
            onBlur={() => setFocusedInput(false)}
            className="peer w-full px-4 py-3 border border-slate-300 rounded-lg bg-white text-slate-900 placeholder-transparent focus:outline-none focus:border-indigo-500 transition"
            placeholder="Event Name"
          />
          <label className={`absolute left-4 transition-all duration-200 pointer-events-none ${
            focusedInput || newEvent.title
              ? '-top-2 bg-white px-1 text-xs font-semibold text-indigo-600'
              : 'top-3 text-slate-600'
          }`}>
            Event Name
          </label>
        </div>

        {/* Start & End Times */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Start Time</label>
            <input
              type="datetime-local"
              value={newEvent.start}
              onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">End Time</label>
            <input
              type="datetime-local"
              value={newEvent.end}
              onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>
        </div>

        {/* Energy Impact */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">Energy Impact</label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="-10"
              max="10"
              value={newEvent.socialCost}
              onChange={(e) => setNewEvent({ ...newEvent, socialCost: +e.target.value })}
              className="flex-1 h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <span className="text-sm font-bold text-slate-900 w-12 text-right">
              {newEvent.socialCost > 0 ? '+' : ''}{newEvent.socialCost}
            </span>
          </div>
        </div>
      </div>

      {/* Add Button */}
      <button
        onClick={addEvent}
        className="w-full px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
      >
        Add Event
      </button>

      {/* Events List */}
      {events.length > 0 && (
        <div className="mt-8 border-t border-slate-200 pt-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Upcoming Events</h3>
          <div className="space-y-3">
            {events.map((e) => (
              <div
                key={e.id}
                className="flex items-start justify-between p-4 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition"
              >
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">{e.title}</p>
                  <p className="text-xs text-slate-600 mt-1">
                    {new Date(e.start).toLocaleString()} – {new Date(e.end).toLocaleString()}
                  </p>
                  <p className={`text-xs font-semibold mt-1 ${
                    e.socialCost > 0 ? 'text-energy-low-600' : 'text-energy-full-600'
                  }`}>
                    Impact: {e.socialCost > 0 ? '+' : ''}{e.socialCost}
                  </p>
                </div>
                <button
                  onClick={() => removeEvent(e.id)}
                  className="ml-4 px-3 py-1 text-red-600 hover:bg-red-50 rounded transition text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarEvents;