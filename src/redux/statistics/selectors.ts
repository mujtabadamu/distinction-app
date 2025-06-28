import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectStatistics = (state: RootState) => state.statistics;

export const selectSingleTotalQuestion = createSelector(
  [selectStatistics],
  (statistics) => statistics.TotalSingleQuestion
);

export const selectOverviewStatistics = createSelector(
  [selectStatistics],
  (statistics) => statistics.overview
);

export const selectIsFetchingOverviewStatistics = createSelector(
  [selectStatistics],
  (statistics) => statistics.isFetchingOverviewStatistics
);

export const selectIsFetchingLearningStatistics = createSelector(
  [selectStatistics],
  (statistics) => statistics.isFetchingLearningStatistics
);

export const selectLearningStatistics = createSelector(
  [selectStatistics],
  (statistics) => statistics.learningStats
);

export const selectMostRecentStartedPractice = createSelector(
  [selectStatistics],
  (statistics) => statistics.mostRecentPractice
);

export const selectShowContinuePractice = createSelector(
  [selectStatistics],
  (statistics) => statistics.showContinuePractice
);
