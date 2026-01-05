import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import LoadingScreen from './components/LoadingScreen';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';
import useCurrentDate from './lib/useCurrentDate';
import { forecast } from './lib/forecast';
import { loadInputs, saveInputs, loadEvents, saveEvents } from './lib/storage';
import { SocialInputs, CalendarEvent, ForecastResult } from './types';

const App: React.FC = () => {
  const [, setShowLanding] = useState(true);
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
    setLoading(true);
    setResult(null); // Clear previous results

    // Create a new AbortController for this operation
    abortControllerRef.current = new AbortController();

    try {
      // 1. Run your calculation logic
      const calculatedData = forecast(inputs, events);
      
      // 2. LOG THE DATA (Check your browser console to see this!)
      console.log("Calculated Data:", calculatedData);

      if (!calculatedData) {
        throw new Error("No data returned from forecast");
      }

      // 3. Set the result FIRST
      setResult(calculatedData);
    } catch (error) {
      console.error("Failed to calculate:", error);
      // Maybe set an error state here
    } finally {
      // 4. Turn off loading LAST
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

  // Ternary logic: loading -> Dashboard -> LandingPage
  return loading ? (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #000000 0%, #1e3a8a 50%, #7c3aed 100%)' }}>
      <Container maxWidth="md" sx={{ minHeight: '100vh', p: 2 }}>
        <Typography variant="h1" align="center" sx={{ mb: 1, color: 'white' }}>Social Battery Forecast</Typography>
        <Typography variant="h6" align="center" sx={{ mb: 3, color: 'primary.light' }}>{formattedLong}</Typography>
        <LoadingScreen onAbort={handleAbort} />
      </Container>
    </div>
  ) : result ? (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #000000 0%, #1e3a8a 50%, #7c3aed 100%)' }}>
      <Container maxWidth="md" sx={{ minHeight: '100vh', p: 2 }}>
        <Typography variant="h1" align="center" sx={{ mb: 1, color: 'white' }}>Social Battery Forecast</Typography>
        <Typography variant="h6" align="center" sx={{ mb: 3, color: 'primary.light' }}>{formattedLong}</Typography>
        <Dashboard
          result={result}
          inputs={inputs}
          events={events}
          onInputsChange={updateInputs}
          onEventsChange={updateEvents}
        />
      </Container>
    </div>
  ) : (
    <LandingPage onGetStarted={handleStart} />
  );
};

export default App;