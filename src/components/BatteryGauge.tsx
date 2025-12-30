import React from 'react';
import { Card, CardContent, Typography, LinearProgress } from '@mui/material';

interface Props {
  battery: number;
}

const BatteryGauge: React.FC<Props> = ({ battery }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h3" sx={{ mb: 2 }}>Current Battery</Typography>
        <LinearProgress variant="determinate" value={battery} sx={{ height: 24, mb: 2 }} />
        <Typography align="center" sx={{ color: 'primary.main', fontWeight: 'bold', fontSize: '1.2rem' }}>{battery.toFixed(1)}%</Typography>
      </CardContent>
    </Card>
  );
};

export default BatteryGauge;