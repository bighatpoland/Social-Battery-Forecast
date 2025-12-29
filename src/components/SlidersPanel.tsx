import React from 'react';
import { SocialInputs } from '../types';

interface Props {
  inputs: SocialInputs;
  onChange: (updates: Partial<SocialInputs>) => void;
}

const SlidersPanel: React.FC<Props> = ({ inputs, onChange }) => {
  return (
    <div className="p-4 bg-gray-100 rounded mb-4">
      <h2 className="text-lg font-bold mb-2">Inputs</h2>
      <div className="mb-4">
        <label className="block">Humans Encountered: {inputs.humansEncountered}</label>
        <input
          type="range"
          min="0"
          max="300"
          value={inputs.humansEncountered}
          onChange={(e) => onChange({ humansEncountered: +e.target.value })}
          className="w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block">Eye Contact Intensity: {inputs.eyeContactIntensity}</label>
        <input
          type="range"
          min="0"
          max="10"
          value={inputs.eyeContactIntensity}
          onChange={(e) => onChange({ eyeContactIntensity: +e.target.value })}
          className="w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block">Small Talk Minutes: {inputs.smallTalkMinutes}</label>
        <input
          type="range"
          min="0"
          max="180"
          value={inputs.smallTalkMinutes}
          onChange={(e) => onChange({ smallTalkMinutes: +e.target.value })}
          className="w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block">Noise Annoyance: {inputs.noiseAnnoyance}</label>
        <input
          type="range"
          min="0"
          max="10"
          value={inputs.noiseAnnoyance}
          onChange={(e) => onChange({ noiseAnnoyance: +e.target.value })}
          className="w-full"
        />
      </div>
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={inputs.pseudoscienceMode}
            onChange={(e) => onChange({ pseudoscienceMode: e.target.checked })}
            className="mr-2"
          />
          Pseudoscience Mode
        </label>
      </div>
    </div>
  );
};

export default SlidersPanel;