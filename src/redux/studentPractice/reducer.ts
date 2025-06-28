/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import {
  StudentPracticeError,
  StudentPracticeState,
  StudentPracticeSuccess,
  PostStudentPracticePayload,
  GetStudentPracticePayload,
  GetStudentPracticeSuccess,
  GetSingleStudentPracticePayload,
} from './typings';

const initialState: StudentPracticeState = {
  error: null,
  isFetchingStudentPractice: false,
  isCreatingStudentPractice: false,
  isFetchingSingleStudentPractice: false,
  studentPractice: null,
  practices: null,
};

const studentPracticeSlice = createSlice({
  name: 'StudentPractice',
  initialState,
  reducers: {
    resetStudentPracticeState: (state) => {
      Object.assign(state, initialState);
    },
    createStudentPracticeStart: (
      state,
      action: PayloadAction<PostStudentPracticePayload>
    ) => {
      state.isCreatingStudentPractice = true;
      state.studentPractice = null;
    },
    createStudentPracticeSuccess: (
      state,
      action: PayloadAction<StudentPracticeSuccess>
    ) => {
      state.isCreatingStudentPractice = false;
      state.studentPractice = action.payload;
    },
    createStudentPracticeFailure: (
      state,
      action: PayloadAction<StudentPracticeError>
    ) => {
      state.isCreatingStudentPractice = false;
      state.error = action.payload;
    },
    fetchStudentPracticeStart: (
      state,
      action: PayloadAction<GetStudentPracticePayload>
    ) => {
      state.isFetchingStudentPractice = true;
      state.error = null;
    },
    fetchStudentPracticeSuccess: (
      state,
      action: PayloadAction<GetStudentPracticeSuccess>
    ) => {
      state.isFetchingStudentPractice = false;
      state.practices = action.payload;
    },
    fetchStudentPracticeFailure: (
      state,
      action: PayloadAction<StudentPracticeError>
    ) => {
      state.isFetchingStudentPractice = false;
      state.error = action.payload;
    },
    fetchSingleStudentPracticeStart: (
      state,
      action: PayloadAction<GetSingleStudentPracticePayload>
    ) => {
      state.isFetchingSingleStudentPractice = true;
    },
    fetchSingleStudentPracticeSuccess: (
      state,
      action: PayloadAction<StudentPracticeSuccess>
    ) => {
      state.isFetchingSingleStudentPractice = false;
      state.studentPractice = action.payload;
    },
    fetchSingleStudentPracticeFailure: (
      state,
      action: PayloadAction<StudentPracticeError>
    ) => {
      state.isFetchingSingleStudentPractice = false;
      state.error = action.payload;
      state.studentPractice = null;
    },
  },
});

export const {
  createStudentPracticeStart,
  createStudentPracticeSuccess,
  createStudentPracticeFailure,
  resetStudentPracticeState,
  fetchStudentPracticeStart,
  fetchStudentPracticeSuccess,
  fetchStudentPracticeFailure,
  fetchSingleStudentPracticeFailure,
  fetchSingleStudentPracticeStart,
  fetchSingleStudentPracticeSuccess,
} = studentPracticeSlice.actions;

const studentPracticeReducer = studentPracticeSlice.reducer;

const persistConfig = {
  key: 'StudentPractice',
  storage,
  whitelist: ['studentPractice'],
};

export default persistReducer(persistConfig, studentPracticeReducer);
