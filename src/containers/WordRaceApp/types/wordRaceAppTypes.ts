export type AppStatus = 'STARTED' | 'STOPPED' | 'FINISHED' | 'IDLE' | 'LOADING';

export interface WordRaceAppState {
  status: AppStatus;
  score: number;
}
