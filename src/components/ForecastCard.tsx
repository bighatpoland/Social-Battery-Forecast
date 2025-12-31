import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { ForecastResult } from '../types';
import useCurrentDate from '../lib/useCurrentDate';

interface Props {
  result: ForecastResult | null;
}

const ForecastCard: React.FC<Props> = ({ result }) => {
  const { formattedShort } = useCurrentDate();
  if (!result) return <Card sx={{ mb: 2 }}><CardContent>Calculating...</CardContent></Card>;
  return (
    <Card sx={{ mb: 2, bgcolor: 'secondary.light' }}>
      <CardContent>
        <Typography variant="h2" sx={{ mb: 1 }}>Forecast</Typography>
        <Typography variant="subtitle2" sx={{ mb: 2, color: 'primary.light' }}>Your social battery forecast for today ({formattedShort})</Typography>
        <Typography variant="h4" sx={{ mb: 2, color: '#8F019F' }}>{result.warning}</Typography>
        <Typography sx={{ mb: 2, color: 'primary.main' }}>Recovery: {new Date(result.recoveryTime).toLocaleString()}</Typography>
        <Typography sx={{ color: 'text.primary' }}>{result.explanation}</Typography>
      </CardContent>
    </Card>
  );
};

export default ForecastCard;