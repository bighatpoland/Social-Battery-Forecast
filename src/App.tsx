import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import SlidersPanel from './components/SlidersPanel';
import ForecastCard from './components/ForecastCard';
import BatteryGauge from './components/BatteryGauge';
import TimelineChart from './components/TimelineChart';
import CalendarEvents from './components/CalendarEvents';
import ChatPanel from './components/ChatPanel';
import LandingPage from './components/LandingPage';
import useCurrentDate from './lib/useCurrentDate';
import { forecast } from './lib/forecast';
import { loadInputs, saveInputs, loadEvents, saveEvents } from './lib/storage';
import { SocialInputs, CalendarEvent, ForecastResult } from './types';

const App: React.FC = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [inputs, setInputs] = useState<SocialInputs>({
    startTime: Date.now(),
    humansEncountered: 5,
    eyeContactIntensity: 5,
    smallTalkMinutes: 2,
    calendarLoad: 0,
    noiseAnnoyance: 0,
    pseudoscienceMode: false,
  });
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [result, setResult] = useState<ForecastResult | null>(null);

  const { formattedLong } = useCurrentDate();

  useEffect(() => {
    const savedInputs = loadInputs();
    if (savedInputs) setInputs(savedInputs);
    setEvents(loadEvents());
  }, []);

  useEffect(() => {
    saveInputs(inputs);
    saveEvents(events);
    const res = forecast(inputs, events);
    setResult(res);
  }, [inputs, events]);

  const updateInputs = (updates: Partial<SocialInputs>) => {
    setInputs({ ...inputs, ...updates });
  };

  const updateEvents = (newEvents: CalendarEvent[]) => {
    setEvents(newEvents);
    // Update calendarLoad
    const load = newEvents.reduce((sum, e) => sum + e.socialCost, 0);
    setInputs({ ...inputs, calendarLoad: load });
  };

  if (showLanding) {
    return <LandingPage onGetStarted={() => setShowLanding(false)} />;
  }

  return (
    <Container maxWidth="md" sx={{ minHeight: '100vh', p: 2, background: 'linear-gradient(135deg, #000000 0%, #1e3a8a 50%, #7c3aed 100%)' }}>
      <Typography variant="h1" align="center" sx={{ mb: 1 }}>Social Battery Forecast</Typography>
      <Typography variant="h6" align="center" sx={{ mb: 3, color: 'primary.light' }}>{formattedLong}</Typography>
      <SlidersPanel inputs={inputs} onChange={updateInputs} />
      <CalendarEvents events={events} onChange={updateEvents} />
      {result && (
        <>
          <ForecastCard result={result} />
          <BatteryGauge battery={result.batterySeries[0]?.battery || 100} />
          <TimelineChart series={result.batterySeries} />
        </>
      )}
      <Typography variant="body2" align="center" sx={{ mt: 4, color: 'primary.light' }}>
        This is satire. Predictions are fake. Your feelings are real.
      </Typography>
      <ChatPanel />
    </Container>
  );
};

export default App;