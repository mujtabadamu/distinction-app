import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  FlaggedQuestionSuccess,
  FlagQuestionError,
  FlagQuestionPayload,
  FlagQuestionState,
} from './typings';

const initialState: FlagQuestionState = {
  flaggedQuestion: null,
  isFlaggingQUestion: false,
  error: null,
};

export const flagQuestion = createSlice({
  name: 'flag',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createFlagStart: (state, action: PayloadAction<FlagQuestionPayload>) => {
      state.isFlaggingQUestion = true;
    },
    createFlagSuccess: (
      state,
      action: PayloadAction<FlaggedQuestionSuccess>
    ) => {
      state.isFlaggingQUestion = false;
      state.flaggedQuestion = action.payload;
    },
    createFlagFailure: (state, action: PayloadAction<FlagQuestionError>) => {
      state.isFlaggingQUestion = false;
      state.flaggedQuestion = null;
      state.error = action.payload;
    },
  },
});

export const { createFlagStart, createFlagSuccess, createFlagFailure } =
  flagQuestion.actions;

const flagQuestionReducer = flagQuestion.reducer;
export default flagQuestionReducer;
