/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import {
  ExamGroupsState,
  GetExamGroupsPayload,
  GetExamGroupsSuccess,
  ExamGroupError,
  ExamGroup,
  ActiveExamGroup,
} from './typings';

const initialState: ExamGroupsState = {
  isFetchingGroups: true,
  isFilteringGroups: false,
  examGroups: {
    count: 0,
    pages: 0,
    items: [],
  },
  error: null,
  activeExamGroup: null,
};

export const examGroupsSlice = createSlice({
  name: 'examGroups',
  initialState,
  reducers: {
    fetchExamGroupsStart: (
      state,
      action: PayloadAction<GetExamGroupsPayload>
    ) => {
      state.isFetchingGroups = true;
    },
    fetchExamGroupsSuccess: (
      state,
      action: PayloadAction<GetExamGroupsSuccess>
    ) => {
      state.isFetchingGroups = false;
      state.isFilteringGroups = false;
      state.examGroups = action.payload;
    },
    fetchExamGroupsFailure: (state, action: PayloadAction<ExamGroupError>) => {
      state.isFetchingGroups = false;
      state.isFilteringGroups = false;
    },
    setIsFilteringGroups: (state, action: PayloadAction<boolean>) => {
      state.isFilteringGroups = action.payload;
    },
    setActiveExamGroup: (
      state,
      action: PayloadAction<ActiveExamGroup | null>
    ) => {
      state.activeExamGroup = action.payload;
    },
  },
});

export const {
  fetchExamGroupsStart,
  fetchExamGroupsSuccess,
  fetchExamGroupsFailure,
  setIsFilteringGroups,
  setActiveExamGroup,
} = examGroupsSlice.actions;

const examGroupsReducer = examGroupsSlice.reducer;
const persistConfig = {
  key: 'examGroups',
  storage,
  whitelist: ['activeExamGroup'],
};

export default persistReducer(persistConfig, examGroupsReducer);
