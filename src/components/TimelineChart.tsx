import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  series: Array<{ t: number; battery: number }>;
}

const TimelineChart: React.FC<Props> = ({ series }) => {
  const data = series.map(s => ({
    time: new Date(s.t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    battery: Math.round(s.battery)
  }));
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h3" sx={{ mb: 2 }}>Battery Timeline</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Line type="monotone" dataKey="battery" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TimelineChart;