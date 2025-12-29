import React from 'react';
import { ForecastResult } from '../types';

interface Props {
  result: ForecastResult | null;
}

const ForecastCard: React.FC<Props> = ({ result }) => {
  if (!result) return <div className="p-4">Calculating...</div>;
  return (
    <div className="p-4 bg-red-100 rounded mb-4">
      <h2 className="text-xl font-bold mb-2">Forecast</h2>
      <p className="text-2xl mb-2">{result.warning}</p>
      <p className="mb-2">Recovery: {new Date(result.recoveryTime).toLocaleString()}</p>
      <p>{result.explanation}</p>
    </div>
  );
};

export default ForecastCard;