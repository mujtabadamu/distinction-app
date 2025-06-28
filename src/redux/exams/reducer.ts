import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  ExamsState,
  ExamsError,
  GetExamsSuccess,
  GetExamsPayload,
} from './typings';

const initialState: ExamsState = {
  exams: null,
  isFetchingExams: false,
  error: null,
};

const examsSlice = createSlice({
  name: 'exams',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fetchExamsStart: (state, action: PayloadAction<GetExamsPayload>) => {
      state.isFetchingExams = true;
    },
    fetchExamsSuccess: (state, action: PayloadAction<GetExamsSuccess>) => {
      state.isFetchingExams = false;
      state.exams = action.payload;
    },
    fetchExamsFailure: (state, action: PayloadAction<ExamsError>) => {
      state.isFetchingExams = false;
      state.exams = null;
      state.error = action.payload;
    },
  },
});

export const { fetchExamsStart, fetchExamsSuccess, fetchExamsFailure } =
  examsSlice.actions;

const examsReducer = examsSlice.reducer;

export default examsReducer;
