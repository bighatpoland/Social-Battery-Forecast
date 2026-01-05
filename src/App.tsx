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
  const abortControllerRef = React.useRef<AbortController | null>(null);

  const { formattedLong } = useCurrentDate();

  useEffect(() => {
    const savedInputs = loadInputs();
    if (savedInputs) setInputs(savedInputs);
    setEvents(loadEvents());
  }, []);

  useEffect(() => {
    try {
      saveInputs(inputs);
      saveEvents(events);
      console.log('Calculating forecast with inputs:', inputs);
      const res = forecast(inputs, events);
      console.log('Forecast calculated:', res);
      setResult(res);
    } catch (error) {
      console.error('Error calculating forecast:', error);
    } finally {
      setLoading(false);
    }
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

  const handleStart = async () => {
    setShowLanding(false);
    setLoading(true);
    
    // Create a new AbortController for this operation
    abortControllerRef.current = new AbortController();
    
    // Simulate a 1-second calculation delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // Calculate the forecast with current inputs
      const calculatedResult = forecast(inputs, events);
      console.log('Forecast calculated on start:', calculatedResult);
      setResult(calculatedResult);
    } catch (error) {
      console.error('Error calculating forecast on start:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAbort = () => {
    // Abort any pending fetch requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    
    // Reset state
    setLoading(false);
    setResult(null);
    setShowLanding(true);
  };

  if (showLanding) {
    return <LandingPage onGetStarted={handleStart} />;
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #000000 0%, #1e3a8a 50%, #7c3aed 100%)' }}>
      <Container maxWidth="md" sx={{ minHeight: '100vh', p: 2 }}>
        <Typography variant="h1" align="center" sx={{ mb: 1, color: 'white' }}>Social Battery Forecast</Typography>
        <Typography variant="h6" align="center" sx={{ mb: 3, color: 'primary.light' }}>{formattedLong}</Typography>
        
        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
            <Typography variant="h5" align="center" sx={{ color: 'primary.light', animation: 'pulse 1.5s infinite', mb: 3 }}>
              Calculating your energy...
            </Typography>
              <button
              onClick={handleAbort}
              className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/90 font-medium transition hover:bg-white/20 active:bg-white/30"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" style={{ display: 'inline-block' }}>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              Stop Calculation
            </button>
          </div>
        )}
        
        {!loading && (
          <>
            <SlidersPanel inputs={inputs} onChange={updateInputs} />
            <CalendarEvents events={events} onChange={updateEvents} />
            {result && result.batterySeries && result.batterySeries.length > 0 && (
              <>
                <ForecastCard result={result} />
                <BatteryGauge battery={result.batterySeries[0]?.battery ?? 100} />
                <TimelineChart series={result.batterySeries ?? []} />
              </>
            )}
            {!result && (
              <Typography variant="body1" align="center" sx={{ mt: 4, color: 'primary.light' }}>
                Adjust the sliders and click 'Get Started' to see your forecast.
              </Typography>
            )}
            {result && (
              <Typography variant="body2" align="center" sx={{ mt: 4, color: 'primary.light' }}>
                This is satire. Predictions are fake. Your feelings are real.
              </Typography>
            )}
          </>
        )}
        
        <ChatPanel />
      </Container>
    </div>
  );
};

export default App;