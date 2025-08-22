import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

const selectStatistics = (state: RootState) => state.statistics;

export const selectShowContinuePractice = createSelector(
  [selectStatistics],
  (statistics) => statistics?.showContinuePractice || false
);

export const selectMostRecentStartedPractice = createSelector(
  [selectStatistics],
  (statistics) => statistics?.mostRecentPractice || null
);
