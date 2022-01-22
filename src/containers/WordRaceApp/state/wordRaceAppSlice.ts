/* eslint-disable no-param-reassign */
import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { AppStatus, WordRaceAppState } from '../types/wordRaceAppTypes';

const recieveAppStatusReducer: CaseReducer<
  WordRaceAppState,
  PayloadAction<AppStatus>
> = (state, action) => {
  state.status = action.payload;
};

const incrementScoreReducer: CaseReducer<
  WordRaceAppState,
  PayloadAction<number>
> = (state, action) => {
  state.score += action.payload;
};

const decrementScoreReducer: CaseReducer<
  WordRaceAppState,
  PayloadAction<number>
> = (state, action) => {
  state.score -= action.payload;
};

const initialState = { status: 'IDLE', score: 0 } as WordRaceAppState;
export const slice = createSlice({
  name: 'keyboard',
  initialState,
  reducers: {
    recieveAppStatus: recieveAppStatusReducer,
    incrementScore: incrementScoreReducer,
    decrementScore: decrementScoreReducer,
  },
});

export const { recieveAppStatus, incrementScore, decrementScore } =
  slice.actions;

export const selectStatus = (state: RootState) => state.wordRaceApp.status;
export const selectScore = (state: RootState) => state.wordRaceApp.score;

export default slice.reducer;
