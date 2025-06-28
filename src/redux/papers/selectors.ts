import { createSelector } from 'reselect';
import { RootState } from '../store';

const selectPapers = (state: RootState) => state.papers;

export const selectIsFetchingPapers = createSelector(
  [selectPapers],
  (papers) => papers.isFetchingPapers
);

export const selectPapersList = createSelector(
  [selectPapers],
  (papers) => papers.papers
);

export const selectIsCreatingPaperRating = createSelector(
  [selectPapers],
  (papers) => papers.isCreatingRating
)