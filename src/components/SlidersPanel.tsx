import React from 'react';
import { Card, CardContent, Typography, Slider, FormControlLabel, Checkbox } from '@mui/material';
import { SocialInputs } from '../types';

interface Props {
  inputs: SocialInputs;
  onChange: (updates: Partial<SocialInputs>) => void;
}

const SlidersPanel: React.FC<Props> = ({ inputs, onChange }) => {
  return (
    <Card sx={{ mb: 2, border: '1px solid rgba(255, 255, 255, 0.2)', backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
      <CardContent>
        <Typography variant="h2" sx={{ mb: 2 }}>Inputs</Typography>
        <div style={{ marginBottom: 16 }}>
          <Typography gutterBottom>Humans Encountered</Typography>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Slider
              value={inputs.humansEncountered}
              onChange={(_, value) => onChange({ humansEncountered: value as number })}
              min={0}
              max={300}
              valueLabelDisplay="on"
              sx={{ flex: 1 }}
            />
            <Typography sx={{ width: 48, textAlign: 'right' }}>{inputs.humansEncountered}</Typography>
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <Typography gutterBottom>Eye Contact Intensity</Typography>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Slider
              value={inputs.eyeContactIntensity}
              onChange={(_, value) => onChange({ eyeContactIntensity: value as number })}
              min={0}
              max={10}
              valueLabelDisplay="on"
              sx={{ flex: 1 }}
            />
            <Typography sx={{ width: 48, textAlign: 'right' }}>{inputs.eyeContactIntensity}</Typography>
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <Typography gutterBottom>Small Talk Minutes</Typography>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Slider
              value={inputs.smallTalkMinutes}
              onChange={(_, value) => onChange({ smallTalkMinutes: value as number })}
              min={0}
              max={20}
              valueLabelDisplay="on"
              sx={{ flex: 1 }}
            />
            <Typography sx={{ width: 48, textAlign: 'right' }}>{inputs.smallTalkMinutes}</Typography>
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <Typography gutterBottom>Noise Annoyance</Typography>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Slider
              value={inputs.noiseAnnoyance}
              onChange={(_, value) => onChange({ noiseAnnoyance: value as number })}
              min={0}
              max={10}
              valueLabelDisplay="on"
              sx={{ flex: 1 }}
            />
            <Typography sx={{ width: 48, textAlign: 'right' }}>{inputs.noiseAnnoyance}</Typography>
          </div>
        </div>
        <FormControlLabel
          control={
            <Checkbox
              checked={inputs.pseudoscienceMode}
              onChange={(e) => onChange({ pseudoscienceMode: e.target.checked })}
            />
          }
          label="Pseudoscience Mode"
        />
      </CardContent>
    </Card>
  );
};

export default SlidersPanel;