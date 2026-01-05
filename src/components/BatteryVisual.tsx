import React from 'react';

interface BatteryVisualProps {
  level: number; // 0-100
}

const BatteryVisual: React.FC<BatteryVisualProps> = ({ level }) => {
  // Ensure level is between 0-100
  const normalizedLevel = Math.max(0, Math.min(100, level));

  // Determine color based on level
  const getColor = () => {
    if (normalizedLevel >= 60) {
      return '#16a34a'; // energy-full-600
    } else if (normalizedLevel >= 30) {
      return '#d97706'; // energy-mid-600
    } else {
      return '#dc2626'; // energy-low-600
    }
  };

  const liquidColor = getColor();
  const isLowBattery = normalizedLevel < 20;

  // SVG dimensions
  const width = 120;
  const height = 300;
  const padding = 15;
  const batteryWidth = width - padding * 2;
  const batteryHeight = height - padding * 2 - 30; // Leave space for terminal
  const cornerRadius = 12;

  // Calculate liquid level (from bottom)
  const liquidHeight = (batteryHeight * normalizedLevel) / 100;

  return (
    <div className="flex flex-col items-center justify-center">
      <style>{`
        @keyframes breathing {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }

        .battery-pulse {
          animation: breathing 2s ease-in-out infinite;
        }
      `}</style>

      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className={isLowBattery ? 'battery-pulse' : ''}
      >
        {/* Battery terminal (top) */}
        <rect
          x={width / 2 - 15}
          y={5}
          width="30"
          height="12"
          rx="3"
          fill="#334155"
        />

        {/* Battery body background */}
        <rect
          x={padding}
          y={padding}
          width={batteryWidth}
          height={batteryHeight}
          rx={cornerRadius}
          fill="#e2e8f0"
          stroke="#94a3b8"
          strokeWidth="2"
        />

        {/* Liquid fill with gradient */}
        <defs>
          <linearGradient
            id="liquidGradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor={liquidColor} stopOpacity="1" />
            <stop offset="100%" stopColor={liquidColor} stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Animated liquid */}
        <rect
          x={padding + 2}
          y={padding + batteryHeight - liquidHeight}
          width={batteryWidth - 4}
          height={liquidHeight}
          rx={cornerRadius - 2}
          fill="url(#liquidGradient)"
          style={{
            transition: 'all 0.6s ease-in-out',
          }}
        />

        {/* Highlight for glass effect */}
        <rect
          x={padding + 2}
          y={padding}
          width={batteryWidth * 0.35}
          height={batteryHeight * 0.4}
          rx={cornerRadius - 2}
          fill="white"
          opacity="0.2"
          pointerEvents="none"
        />
      </svg>

      {/* Level text below */}
      <div className="mt-4 text-center">
        <p className="text-2xl font-bold text-slate-900">{normalizedLevel}%</p>
        <p className="text-sm text-slate-600">
          {isLowBattery
            ? 'Low - Recharge soon!'
            : normalizedLevel < 50
              ? 'Medium'
              : 'Full'}
        </p>
      </div>
    </div>
  );
};

export default BatteryVisual;
