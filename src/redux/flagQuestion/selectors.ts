import { createSelector } from 'reselect';
import { RootState } from '../store';

const selectFlag = (state: RootState) => state.flagQuestion;

export const selectFlaggedQuestion = createSelector(
  [selectFlag],
  (flag) => flag.flaggedQuestion
);

export const selectIsFlaggingQuestion = createSelector(
  [selectFlag],
  (flag) => flag.isFlaggingQUestion
);
