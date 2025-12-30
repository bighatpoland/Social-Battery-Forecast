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
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="time" stroke="#ffffff" />
            <YAxis domain={[0, 100]} stroke="#ffffff" />
            <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', color: '#fff' }} />
            <Line type="monotone" dataKey="battery" stroke="#ffffff" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TimelineChart;