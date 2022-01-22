/* eslint-disable no-param-reassign */
import {
  CaseReducer,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import client from '../../../api/client';
import { useHashCode } from '../../../app/hooks';
import { RootState } from '../../../app/store';
import { WordResponse, WordStackState } from '../types/wordStackTypes';

const QUOTABLE_API = 'https://61ebb61c7ec58900177cdd3f.mockapi.io/api/words';
const setLoadingReducer: CaseReducer<WordStackState, PayloadAction<boolean>> = (
  state,
  action: PayloadAction<boolean>,
) => {
  state.isLoading = action.payload;
};

const setErrorReducer: CaseReducer<
  WordStackState,
  PayloadAction<boolean | string | undefined>
> = (state, action: PayloadAction<boolean | string | undefined>) => {
  state.hasError = action.payload;
};

const setCharacterReducer: CaseReducer<
  WordStackState,
  PayloadAction<number>
> = (state, action: PayloadAction<number>) => {
  state.charIndex = action.payload;
};

const changeWordReducer: CaseReducer<WordStackState, PayloadAction<number>> = (
  state,
  action: PayloadAction<number>,
) => {
  state.currentWord = state.wordStackPayload[action.payload]?.text;
};

const wordIndexReducer: CaseReducer<WordStackState, PayloadAction<number>> = (
  state,
  action: PayloadAction<number>,
) => {
  state.wordIndex = action.payload;
};

export const fetchWord = createAsyncThunk('wordStack/fetchWord', async () => {
  const response = await client.get(QUOTABLE_API);
  return response.data as WordResponse[];
});

const initialState = {
  isLoading: false,
  hasError: false,
  wordStackPayload: [],
  charIndex: -1,
  currentWord: '',
  wordIndex: 1,
} as WordStackState;
export const slice = createSlice({
  name: 'keyboard',
  initialState,
  reducers: {
    setLoading: setLoadingReducer,
    hasError: setErrorReducer,
    setCharacter: setCharacterReducer,
    changeWord: changeWordReducer,
    wordIndex: wordIndexReducer,
  },
  extraReducers(builder) {
    builder
      .addCase(fetchWord.pending, (state: WordStackState) => {
        state.isLoading = true;
      })
      .addCase(fetchWord.fulfilled, (state: WordStackState, action) => {
        state.isLoading = false;
        const wordQueue = action.payload.map(
          (val: WordResponse, index: number) => ({
            text: val[index]?.toUpperCase().trim(),
            hash: useHashCode(val[index]),
          }),
        );
        state.wordStackPayload = wordQueue;
        const currentWord = wordQueue[0]?.text;
        state.charIndex = 0;
        state.currentWord = currentWord;
      })
      .addCase(fetchWord.rejected, (state, action) => {
        state.hasError = action.error.message;
      });
  },
});

export const { setLoading, hasError, setCharacter, changeWord, wordIndex } =
  slice.actions;

export const selectCurrentWord = (state: RootState) =>
  state.wordStack.currentWord;

export const selectWordIndex = (state: RootState) => state.wordStack.wordIndex;

export const selectIsLoading = (state: RootState) => state.wordStack.isLoading;

export const selectCharIndex = (state: RootState) => state.wordStack.charIndex;

export default slice.reducer;
