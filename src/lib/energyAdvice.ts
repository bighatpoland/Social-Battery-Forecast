import { CalendarEvent, ForecastResult } from '../types';

export interface EnergyWarning {
  message: string;
  eventName: string;
  severity: 'high' | 'medium' | 'low';
}

/**
 * Analyzes forecast data and calendar events to detect critical battery drops.
 * Returns advice if battery drops below 20% after a specific event.
 */
export function getEnergyAdvice(
  forecast: ForecastResult | null,
  events: CalendarEvent[]
): EnergyWarning | null {
  if (!forecast || !forecast.batterySeries || forecast.batterySeries.length === 0) {
    return null;
  }

  // Find points where battery drops below 20%
  const criticalPoints = forecast.batterySeries.filter(point => point.battery < 20);
  
  if (criticalPoints.length === 0) {
    return null;
  }

  // Get the first critical point
  const firstCritical = criticalPoints[0];
  
  // Find which event(s) overlap or precede this critical point
  const relevantEvents = events.filter(
    event => event.start <= firstCritical.t && event.end <= firstCritical.t
  );

  // Get the most recent event before the critical point
  const causingEvent = relevantEvents.sort((a, b) => b.end - a.end)[0];

  if (!causingEvent) {
    return null;
  }

  // Determine severity based on how low the battery is
  let severity: 'high' | 'medium' | 'low' = 'low';
  if (firstCritical.battery < 5) severity = 'high';
  else if (firstCritical.battery < 10) severity = 'medium';

  const message = `Warning: "${causingEvent.title}" will leave you drained. Schedule 30 mins of solo time after.`;

  return {
    message,
    eventName: causingEvent.title,
    severity,
  };
}
