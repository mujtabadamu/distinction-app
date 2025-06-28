import { createSelector } from 'reselect';
import { RootState } from '../store';

const selectCreateAndEarn = (state: RootState) => state.createAndEarn;

export const isFetchingQuestions = createSelector(
  [selectCreateAndEarn],
  (content) => content.isFetchingQuestions
);

export const selectQuestions = createSelector(
  [selectCreateAndEarn],
  (content) => content.questions
);

export const selectQuestionsStats = createSelector(
  [selectCreateAndEarn],
  (content) => content.questionStats
);

export const selectIsFetchingQuestionsStats = createSelector(
  [selectCreateAndEarn],
  (content) => content.isFetchingQuestionsStats
);
