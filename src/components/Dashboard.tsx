import React from 'react';
import { Typography } from '@mui/material';
import SlidersPanel from './SlidersPanel';
import CalendarEvents from './CalendarEvents';
import ForecastCard from './ForecastCard';
import BatteryGauge from './BatteryGauge';
import TimelineChart from './TimelineChart';
import ChatPanel from './ChatPanel';
import { SocialInputs, CalendarEvent, ForecastResult } from '../types';

interface DashboardProps {
  result: ForecastResult;
  inputs: SocialInputs;
  events: CalendarEvent[];
  onInputsChange: (updates: Partial<SocialInputs>) => void;
  onEventsChange: (events: CalendarEvent[]) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  result,
  inputs,
  events,
  onInputsChange,
  onEventsChange,
}) => {
  return (
    <>
      <SlidersPanel inputs={inputs} onChange={onInputsChange} />
      <CalendarEvents events={events} onChange={onEventsChange} />
      {result?.batterySeries && result.batterySeries.length > 0 && (
        <>
          <ForecastCard result={result} />
          <BatteryGauge battery={result.batterySeries[0]?.battery ?? 100} />
          <TimelineChart series={result.batterySeries ?? []} />
        </>
      )}
      {!result?.batterySeries?.length && (
        <Typography variant="body1" align="center" sx={{ mt: 4, color: 'primary.light' }}>
          No forecast data available. Please try again.
        </Typography>
      )}
      {result && (
        <Typography variant="body2" align="center" sx={{ mt: 4, color: 'primary.light' }}>
          This is satire. Predictions are fake. Your feelings are real.
        </Typography>
      )}
      <ChatPanel />
    </>
  );
};

export default Dashboard;
