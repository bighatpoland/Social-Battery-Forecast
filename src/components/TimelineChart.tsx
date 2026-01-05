import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface DataPoint {
  t: number;
  battery: number;
  event?: string;
}

interface Props {
  series: Array<DataPoint>;
}

// Custom glassmorphic tooltip
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white bg-opacity-90 backdrop-blur-lg border border-white border-opacity-20 rounded-lg p-4 shadow-lg">
        <p className="text-sm font-semibold text-slate-900">
          {new Date(data.t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
        <p className="text-lg font-bold text-indigo-600">{data.battery}% Battery</p>
        {data.event && (
          <p className="text-xs text-slate-600 mt-2 max-w-xs">
            <span className="font-semibold">Event:</span> {data.event}
          </p>
        )}
      </div>
    );
  }
  return null;
};

const TimelineChart: React.FC<Props> = ({ series }) => {
  const data = series.map(s => ({
    t: s.t,
    battery: Math.round(s.battery),
    event: s.event || undefined,
  }));

  return (
    <div className="w-full h-80 bg-white bg-opacity-80 backdrop-blur-xl border border-white border-opacity-20 rounded-2xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">Energy Forecast</h2>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          {/* Gradient definition */}
          <defs>
            <linearGradient id="colorBattery" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Only Y-axis gridlines visible */}
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e2e8f0"
            vertical={false}
            horizontalPoints="true"
          />

          {/* X-axis */}
          <XAxis
            dataKey="t"
            stroke="#64748b"
            tickFormatter={(t) =>
              new Date(t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
            style={{ fontSize: '12px' }}
          />

          {/* Y-axis with energy levels */}
          <YAxis
            domain={[0, 100]}
            stroke="#64748b"
            label={{ value: 'Energy Level (%)', angle: -90, position: 'insideLeft' }}
            style={{ fontSize: '12px' }}
          />

          {/* Custom tooltip */}
          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />

          {/* Area with monotone curve and gradient fill */}
          <Area
            type="monotone"
            dataKey="battery"
            stroke="#4f46e5"
            strokeWidth={3}
            fill="url(#colorBattery)"
            dot={{ fill: '#4f46e5', r: 4 }}
            activeDot={{ r: 6, fill: '#4f46e5' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimelineChart;