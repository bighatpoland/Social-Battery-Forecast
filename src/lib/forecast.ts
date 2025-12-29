import { SocialInputs, CalendarEvent, ForecastResult } from '../types';
import { formatTime } from './time';
import * as templates from './templates';

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function pickWarning(severity: string, inputs: SocialInputs): string {
  let arr: string[];
  if (severity === 'nuclear') arr = templates.warningsNuclear;
  else if (severity === 'dramatic') arr = templates.warningsDramatic;
  else arr = templates.warningsMild;
  const seed = inputs.humansEncountered * 100 + inputs.eyeContactIntensity;
  const index = Math.floor(seededRandom(seed) * arr.length);
  return arr[index];
}

export function forecast(inputs: SocialInputs, events: CalendarEvent[]): ForecastResult {
  const start = inputs.startTime;
  const end = start + 12 * 60 * 60 * 1000;
  const steps: Array<{ t: number; battery: number }> = [];
  let battery = 100;
  const baseDrain = 0.05; // per minute
  for (let t = start; t <= end; t += 5 * 60 * 1000) {
    let drain = baseDrain;
    drain += inputs.humansEncountered * 0.002;
    drain += Math.pow(inputs.eyeContactIntensity, 2) * 0.01;
    drain += inputs.smallTalkMinutes * 0.001;
    drain += inputs.noiseAnnoyance * 0.005;
    const overlapping = events.filter(e => e.start <= t && e.end >= t);
    drain += overlapping.reduce((sum, e) => sum + e.socialCost * 0.001, 0);
    if (inputs.pseudoscienceMode) {
      const seed = Math.floor(t / (24 * 60 * 60 * 1000)) + inputs.humansEncountered + inputs.eyeContactIntensity;
      const mercury = seededRandom(seed) * 0.2;
      const barista = (new Date(t).getHours() % 12) * 0.01;
      drain += mercury + barista;
    }
    battery = Math.max(0, battery - drain * 5);
    steps.push({ t, battery });
  }
  const depletionTime = steps.find(s => s.battery <= 0)?.t || end;
  const timeToDepletion = (depletionTime - start) / (60 * 60 * 1000);
  let severity: 'mild' | 'dramatic' | 'nuclear';
  if (timeToDepletion < 2) severity = 'nuclear';
  else if (timeToDepletion < 6) severity = 'dramatic';
  else severity = 'mild';
  const warning = pickWarning(severity, inputs).replace('{TIME}', formatTime(depletionTime));
  const recoveryTime = depletionTime + 24 * 60 * 60 * 1000;
  const explanation = `Pseudoscience mode ${inputs.pseudoscienceMode ? 'active' : 'inactive'}. Cosmic factors included.`;
  return {
    depletionTime,
    batterySeries: steps,
    warning,
    recoveryTime,
    explanation
  };
}