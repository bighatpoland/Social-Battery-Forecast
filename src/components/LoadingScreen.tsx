import React from 'react';
import { Typography } from '@mui/material';

interface LoadingScreenProps {
  onAbort: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onAbort }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
      <Typography variant="h5" align="center" sx={{ color: 'primary.light', animation: 'pulse 1.5s infinite', mb: 3 }}>
        Calculating your energy...
      </Typography>
      <button
        onClick={onAbort}
        className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/90 font-medium transition hover:bg-white/20 active:bg-white/30"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" style={{ display: 'inline-block' }}>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
        Stop Calculation
      </button>
    </div>
  );
};

export default LoadingScreen;
