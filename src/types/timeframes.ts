export enum TimeframeError {
  InvalidTimeframe = '[Invalid timeframe] Invalid timeframe arguments',
  InvalidRange = '[Invalid range] Timeframe start must be before timeframe end',
}

export type Timeframe = { id: string; start: number; end: number };

export type TimeframeValidation =
  | { timeframe: Timeframe; error: null }
  | { timeframe: Partial<Timeframe>; error: TimeframeError };
