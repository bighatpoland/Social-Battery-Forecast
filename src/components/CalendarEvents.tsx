import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
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
    <Card sx={{ mb: 2, bgcolor: 'primary.light' }}>
      <CardContent>
        <Typography variant="h2" sx={{ mb: 2 }}>Calendar Events</Typography>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
          <TextField
            label="Event Title"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            fullWidth
            sx={{ flex: 1, minWidth: 200 }}
          />
          <TextField
            label="Start"
            type="datetime-local"
            value={newEvent.start}
            onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="End"
            type="datetime-local"
            value={newEvent.end}
            onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Social Cost"
            type="number"
            inputProps={{ min: 0, max: 10 }}
            value={newEvent.socialCost}
            onChange={(e) => setNewEvent({ ...newEvent, socialCost: +e.target.value })}
            sx={{ width: 100 }}
          />
          <Button variant="contained" onClick={addEvent}>Add Event</Button>
        </div>
        <List>
          {events.map(e => (
            <ListItem key={e.id} secondaryAction={
              <IconButton edge="end" onClick={() => removeEvent(e.id)}>
                <DeleteIcon />
              </IconButton>
            }>
              <ListItemText
                primary={e.title}
                secondary={`${new Date(e.start).toLocaleString()} - ${new Date(e.end).toLocaleString()} - Cost: ${e.socialCost}`}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default CalendarEvents;