/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import storageSession from 'redux-persist/lib/storage/session';
import { persistReducer } from 'redux-persist';

import {
  StatisticsState,
  StatisticsError,
  GetOverviewPayload,
  Overview,
  GetLearningStatsPayload,
  LearningStats,
  GetSingleTotalQuestion,
  GetSingleTotalQuestionSuccess
} from './typings';
import { IRecentPractice } from '../../hooks/practice/useRecentPracticesQuery';

const initialState: StatisticsState = {
  isFetchingOverviewStatistics: false,
  isFetchingLearningStatistics: false,
  activity: null,
  score: null,
  recentPapers: null,
  error: null,
  overview: null,
  learningStats: null,
  mostRecentPractice: null,
  showContinuePractice: false,
  TotalSingleQuestion:null,
  isFetchingTotalQuestion:false,
};

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    fetchOverviewStatisticsStart: (
      state,
      action: PayloadAction<GetOverviewPayload>
    ) => {
      state.isFetchingOverviewStatistics = true;
    },
    fetchOverviewStatisticsSuccess: (
      state,
      action: PayloadAction<Overview>
    ) => {
      state.isFetchingOverviewStatistics = false;
      state.overview = action.payload;
      state.error = null;
    },
    fetchOverviewStatisticsFailure: (
      state,
      action: PayloadAction<StatisticsError>
    ) => {
      state.isFetchingOverviewStatistics = false;
      state.error = action.payload;
      state.overview = null;
    },
    fetchLearningStatisticsStart: (
      state,
      action: PayloadAction<GetLearningStatsPayload>
    ) => {
      state.isFetchingLearningStatistics = true;
    },
    fetchLearningStatisticsSuccess: (
      state,
      action: PayloadAction<LearningStats>
    ) => {
      state.isFetchingLearningStatistics = false;
      state.learningStats = action.payload;
    },
    fetchLearningStatisticsFailure: (
      state,
      action: PayloadAction<StatisticsError>
    ) => {
      state.isFetchingLearningStatistics = false;
      state.error = action.payload;
      state.learningStats = null;
    },
    setMostRecentPractice: (
      state,
      action: PayloadAction<IRecentPractice | null>
    ) => {
      state.mostRecentPractice = action.payload;
    },
    setShowContinuePractice: (state, action: PayloadAction<boolean>) => {
      state.showContinuePractice = action.payload;
    },
    fetchSingleTotalQuestion: (
      state,
      action: PayloadAction<GetSingleTotalQuestion>
    ) => {
      state.isFetchingTotalQuestion = true;
      state.error = null;
    },
    fetchSingleTotalQuestionSuccess: (
      state,
      action: PayloadAction<GetSingleTotalQuestionSuccess>
    ) => {
      state.isFetchingTotalQuestion = false;
      state.error = null;
      state.TotalSingleQuestion = action.payload;
    },
    fetchSingleTotalQuestionFailure: (
      state,
      action: PayloadAction<StatisticsError>
    ) => {
      state.isFetchingTotalQuestion = false;
      state.error = action.payload;
      state.TotalSingleQuestion = null;
    },
  },
});

export const {
  fetchOverviewStatisticsFailure,
  fetchOverviewStatisticsStart,
  fetchOverviewStatisticsSuccess,
  fetchLearningStatisticsStart,
  fetchLearningStatisticsSuccess,
  fetchLearningStatisticsFailure,
  setMostRecentPractice,
  setShowContinuePractice,
  fetchSingleTotalQuestion,
  fetchSingleTotalQuestionFailure,
  fetchSingleTotalQuestionSuccess
} = statisticsSlice.actions;

const statisticsReducer = statisticsSlice.reducer;

const persistConfig = {
  key: 'statistics',
  storage: storageSession,
  whitelist: ['showContinuePractice'],
};

export default persistReducer(persistConfig, statisticsReducer);
