import React from 'react';
import { Card, CardContent, Typography, Slider, FormControlLabel, Checkbox } from '@mui/material';
import { SocialInputs } from '../types';

interface Props {
  inputs: SocialInputs;
  onChange: (updates: Partial<SocialInputs>) => void;
}

const SlidersPanel: React.FC<Props> = ({ inputs, onChange }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h2" sx={{ mb: 2 }}>Inputs</Typography>
        <div style={{ marginBottom: 16 }}>
          <Typography gutterBottom>Humans Encountered</Typography>
          <Slider
            value={inputs.humansEncountered}
            onChange={(_, value) => onChange({ humansEncountered: value as number })}
            min={0}
            max={300}
            valueLabelDisplay="auto"
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <Typography gutterBottom>Eye Contact Intensity</Typography>
          <Slider
            value={inputs.eyeContactIntensity}
            onChange={(_, value) => onChange({ eyeContactIntensity: value as number })}
            min={0}
            max={10}
            valueLabelDisplay="auto"
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <Typography gutterBottom>Small Talk Minutes</Typography>
          <Slider
            value={inputs.smallTalkMinutes}
            onChange={(_, value) => onChange({ smallTalkMinutes: value as number })}
            min={0}
            max={180}
            valueLabelDisplay="auto"
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <Typography gutterBottom>Noise Annoyance</Typography>
          <Slider
            value={inputs.noiseAnnoyance}
            onChange={(_, value) => onChange({ noiseAnnoyance: value as number })}
            min={0}
            max={10}
            valueLabelDisplay="auto"
          />
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