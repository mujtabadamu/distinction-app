import { createSelector } from 'reselect';
import { RootState } from '../store';

const selectStudentPractice = (state: RootState) => state.studentPractice;

export const selectIsFetchingStudentPractice = createSelector(
  [selectStudentPractice],
  (studentPractice) => studentPractice.isFetchingStudentPractice
);

export const selectIsCreatingStudentPractice = createSelector(
  [selectStudentPractice],
  (studentPractice) => studentPractice.isCreatingStudentPractice
);

export const selectStudentPracticeData = createSelector(
  [selectStudentPractice],
  (studentPractice) => studentPractice.studentPractice
);

export const selectStudentPractices = createSelector(
  [selectStudentPractice],
  (studentPractice) => studentPractice.practices
);

export const selectIsFetchingSinglePractice = createSelector(
  [selectStudentPractice],
  (studentPractice) => studentPractice.isFetchingSingleStudentPractice
);