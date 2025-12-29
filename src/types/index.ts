export interface SocialInputs {
  startTime: number;
  humansEncountered: number;
  eyeContactIntensity: number;
  smallTalkMinutes: number;
  calendarLoad: number;
  noiseAnnoyance: number;
  pseudoscienceMode: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: number;
  end: number;
  socialCost: number;
}

export interface ForecastResult {
  depletionTime: number;
  batterySeries: Array<{ t: number; battery: number }>;
  warning: string;
  recoveryTime: number;
  explanation: string;
}