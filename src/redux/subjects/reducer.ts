import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  SubjectError,
  GetSubjectsSuccess,
  SubjectsState,
  GetSubjectsPayload,
} from './typings';

const initialState: SubjectsState = {
  subjects: [],
  isFetchingSubjects: false,
  error: null,
};

const subjectsSlice = createSlice({
  name: 'subjects',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fetchSubjectsStart: (state, action: PayloadAction<GetSubjectsPayload>) => {
      state.isFetchingSubjects = true;
    },
    fetchSubjectsSuccess: (
      state,
      action: PayloadAction<GetSubjectsSuccess>
    ) => {
      state.subjects = action.payload;
      state.isFetchingSubjects = false;
    },
    fetchSubjectsFailure: (state, action: PayloadAction<SubjectError>) => {
      state.error = action.payload;
      state.isFetchingSubjects = false;
    },
  },
});

export const {
  fetchSubjectsStart,
  fetchSubjectsSuccess,
  fetchSubjectsFailure,
} = subjectsSlice.actions;

const subjectsReducer = subjectsSlice.reducer;

export default subjectsReducer;
