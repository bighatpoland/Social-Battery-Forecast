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
  const [loading, setLoading] = useState(false);
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
    setLoading(false);
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
    return <LandingPage onGetStarted={() => {
      setShowLanding(false);
      setLoading(true);
    }} />;
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #000000 0%, #1e3a8a 50%, #7c3aed 100%)' }}>
      <Container maxWidth="md" sx={{ minHeight: '100vh', p: 2 }}>
        <Typography variant="h1" align="center" sx={{ mb: 1, color: 'white' }}>Social Battery Forecast</Typography>
        <Typography variant="h6" align="center" sx={{ mb: 3, color: 'primary.light' }}>{formattedLong}</Typography>
        
        {loading && (
          <Typography variant="h5" align="center" sx={{ mt: 8, color: 'primary.light', animation: 'pulse 1.5s infinite' }}>
            Calculating your energy...
          </Typography>
        )}
        
        {!loading && (
          <>
            <SlidersPanel inputs={inputs} onChange={updateInputs} />
            <CalendarEvents events={events} onChange={updateEvents} />
            {result && result.batterySeries && result.batterySeries.length > 0 && (
              <>
                <ForecastCard result={result} />
                <BatteryGauge battery={result.batterySeries[0]?.battery || 100} />
                <TimelineChart series={result.batterySeries} />
              </>
            )}
            {!result && (
              <Typography variant="body1" align="center" sx={{ mt: 4, color: 'primary.light' }}>
                Loading forecast...
              </Typography>
            )}
            <Typography variant="body2" align="center" sx={{ mt: 4, color: 'primary.light' }}>
              This is satire. Predictions are fake. Your feelings are real.
            </Typography>
          </>
        )}
        
        <ChatPanel />
      </Container>
    </div>
  );
};

export default App;