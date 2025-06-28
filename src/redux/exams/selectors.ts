import { createSelector } from 'reselect';
import { RootState } from '../store';

const selectExams = (state: RootState) => state.exams;

export const selectIsFetchingExams = createSelector(
  [selectExams],
  (exams) => exams.isFetchingExams
);

export const selectExamsList = createSelector(
  [selectExams],
  (exams) => exams.exams
);
