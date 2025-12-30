import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { ForecastResult } from '../types';

interface Props {
  result: ForecastResult | null;
}

const ForecastCard: React.FC<Props> = ({ result }) => {
  if (!result) return <Card sx={{ mb: 2 }}><CardContent>Calculating...</CardContent></Card>;
  return (
    <Card sx={{ mb: 2, bgcolor: 'secondary.light' }}>
      <CardContent>
        <Typography variant="h2" sx={{ mb: 2 }}>Forecast</Typography>
        <Typography variant="h4" sx={{ mb: 2 }}>{result.warning}</Typography>
        <Typography sx={{ mb: 2 }}>Recovery: {new Date(result.recoveryTime).toLocaleString()}</Typography>
        <Typography>{result.explanation}</Typography>
      </CardContent>
    </Card>
  );
};

export default ForecastCard;