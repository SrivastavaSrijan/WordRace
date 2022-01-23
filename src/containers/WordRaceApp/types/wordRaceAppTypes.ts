export type AppStatus =
  | 'STARTED'
  | 'STOPPED'
  | 'FINISHED'
  | 'IDLE'
  | 'LOADING'
  | 'OVER';

export interface WordRaceAppState {
  status: AppStatus;
  score: number;
  baseScore: number;
  recieveCorrect: boolean;
  level: number;
}
