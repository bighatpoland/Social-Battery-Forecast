import React from 'react';

interface Props {
  battery: number;
}

const BatteryGauge: React.FC<Props> = ({ battery }) => {
  return (
    <div className="p-4 mb-4">
      <h3 className="text-lg font-bold mb-2">Current Battery</h3>
      <div className="w-full bg-gray-200 rounded-full h-6">
        <div
          className="bg-green-500 h-6 rounded-full transition-all"
          style={{ width: `${battery}%` }}
        ></div>
      </div>
      <p className="text-center mt-2">{battery.toFixed(1)}%</p>
    </div>
  );
};

export default BatteryGauge;