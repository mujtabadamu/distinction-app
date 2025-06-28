import { createSelector } from 'reselect';
import { RootState } from '../store';

const selectSubjects = (state: RootState) => state.subjects;

export const selectIsFetchingSubjects = createSelector(
  [selectSubjects],
  (subjects) => subjects.isFetchingSubjects
);

export const selectSubjectsList = createSelector(
  [selectSubjects],
  (subjects) => subjects.subjects
);
