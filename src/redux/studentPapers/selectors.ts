import { createSelector } from 'reselect';
import { RootState } from '../store';

const selectStudentPapers = (state: RootState) => state.studentPapers;

export const selectIsFetchingStudentPapers = createSelector(
  [selectStudentPapers],
  (studentPapers) => studentPapers.isFetchingStudentPapers
);

export const selectIsCreatingStudentPaper = createSelector(
  [selectStudentPapers],
  (studentPapers) => studentPapers.isCreatingStudentPaper
);

export const selectIsFetchingStudentPaperQuestions = createSelector(
  [selectStudentPapers],
  (studentPapers) => studentPapers.isFetchingStudentPaperQuestions
);
export const selectIsSuccessStudentPaperQuestions = createSelector(
  [selectStudentPapers],
  (studentPapers) => studentPapers.isSuccessStudentPaperQuestions
);

export const selectStudentPapersList = createSelector(
  [selectStudentPapers],
  (studentPapers) => studentPapers.studentPapers
);

export const selectStudentPaperQuestions = createSelector(
  [selectStudentPapers],
  (studentPapers) => studentPapers.studentPaperQuestions
);

export const selectStudentPaper = createSelector(
  [selectStudentPapers],
  (studentPapers) => studentPapers.singlePaper
);

export const selectQuestionAnswerMap = createSelector(
  [selectStudentPapers],
  (studentPapers) => studentPapers.questionAnswerMap
);

export const selectTimeLeft = createSelector(
  [selectStudentPapers],
  (studentPapers) => studentPapers.timeLeft
);

export const selectIsSubmitingPaper = createSelector(
  [selectStudentPapers],
  (studentPapers) => studentPapers.isSubmitingStudentPaper
);

export const selectPaperResult = createSelector(
  [selectStudentPapers],
  (studentPapers) => studentPapers.paperResult
);

export const selectIsFetchingSinglePaper = createSelector(
  [selectStudentPapers],
  (studentPapers) => studentPapers.isFetchingSingleStudentPaper
);

export const selectBookmarks = createSelector(
  [selectStudentPapers],
  (studentPapers) => studentPapers.bookmarks
);

export const selectCompletedStudentPapers = createSelector(
  [selectStudentPapers],
  (studentPapers) => studentPapers.completedStudentPapers
);

export const selectInProgressStudentPapers = createSelector(
  [selectStudentPapers],
  (studentPapers) => studentPapers.inProgressStudentPapers
);
