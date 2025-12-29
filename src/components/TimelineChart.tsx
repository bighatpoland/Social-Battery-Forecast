import React from 'react';
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
    <div className="p-4 mb-4">
      <h3 className="text-lg font-bold mb-2">Battery Timeline</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Line type="monotone" dataKey="battery" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimelineChart;