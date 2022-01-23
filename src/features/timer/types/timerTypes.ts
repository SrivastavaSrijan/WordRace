type TimerType = 'INCREMENTAL' | 'DECREMENTAL';
export interface TimerState {
  shouldStart: boolean;
  shouldPause: boolean;
  shouldStop: boolean;
  currentTime: number;
  initialTime: number;
  timerType: TimerType;
  interval: number;
  status: string;
}
