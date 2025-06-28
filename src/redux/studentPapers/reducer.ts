/* eslint-disable @typescript-eslint/no-unused-vars */
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import type { StatisticProps } from 'antd';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  StudentPapersState,
  GetStudentPapersPayload,
  PostStudentPapersPayload,
  GetStudentPapersSuccess,
  GetStudentPaperQuestionsSuccess,
  GetStudentPaperQuestionsSolutionsSuccess,
  GetStudentPaperQuestionsPayload,
  StudentPapersError,
  StudentPaperFull,
  AnswerOptionChoice,
  SubmitPaperPayload,
  SubmitPaperResponseSuccess,
  BookmarksDb,
  GetSingleStudentPaperPayload,
} from './typings';

const initialState: StudentPapersState = {
  isFetchingStudentPapers: false,
  isFetchingSingleStudentPaper: true,
  isCreatingStudentPaper: false,
  isSubmitingStudentPaper: false,
  isFetchingStudentPaperQuestions: true,
  isSuccessStudentPaperQuestions: false,
  completedStudentPapers: null,
  inProgressStudentPapers: null,
  studentPapers: null,
  singlePaper: null,
  error: null,
  studentPaperQuestions: null,
  questionAnswerMap: {},
  timeLeft: Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30,
  paperResult: null,
  bookmarks: [],
  elapsedTime: 0,
};

const studentPapersSlice = createSlice({
  name: 'studentPapers',
  initialState,
  reducers: {
    fetchStudentPapersStart: (
      state,
      action: PayloadAction<GetStudentPapersPayload>
    ) => {
      state.isFetchingStudentPapers = true;
      state.error = null;
    },
    fetchStudentPapersSuccess: (
      state,
      action: PayloadAction<GetStudentPapersSuccess>
    ) => {
      state.isFetchingStudentPapers = false;
      state.error = null;
      state.studentPapers = action.payload;
    },
    fetchStudentPapersFailure: (
      state,
      action: PayloadAction<StudentPapersError>
    ) => {
      state.isFetchingStudentPapers = false;
      state.error = action.payload;
      state.studentPapers = null;
    },
    fetchStudentPaperQuestionsStart: (
      state,
      action: PayloadAction<GetStudentPaperQuestionsPayload>
    ) => {
      state.isFetchingStudentPaperQuestions = true;
      state.studentPaperQuestions = null;
    },
    fetchStudentPaperQuestionsSuccess: (
      state,
      action: PayloadAction<GetStudentPaperQuestionsSuccess>
    ) => {
      state.isFetchingStudentPaperQuestions = false;
      state.studentPaperQuestions = action.payload;
    },
    fetchStudentPaperQuestionsFailure: (
      state,
      action: PayloadAction<StudentPapersError>
    ) => {
      state.isFetchingStudentPaperQuestions = false;
      state.studentPaperQuestions = null;
      state.error = action.payload;
    },
    fetchStudentPaperQuestionsSolutionsStart: (
      state,
      action: PayloadAction<GetStudentPaperQuestionsPayload>
    ) => {
      state.isFetchingStudentPaperQuestions = true;
      state.studentPaperQuestions = null;
      state.isSuccessStudentPaperQuestions = false;
    },
    fetchStudentPaperQuestionsSolutionsSuccess: (
      state,
      action: PayloadAction<GetStudentPaperQuestionsSolutionsSuccess>
    ) => {
      state.isFetchingStudentPaperQuestions = false;
      state.isSuccessStudentPaperQuestions = true;
      state.studentPaperQuestions = action.payload;
    },
    fetchStudentPaperQuestionsSolutionsFailure: (
      state,
      action: PayloadAction<StudentPapersError>
    ) => {
      state.isFetchingStudentPaperQuestions = false;
      state.studentPaperQuestions = null;
      state.isSuccessStudentPaperQuestions = false;
      state.error = action.payload;
    },
    createStudentPaperStart: (
      state,
      action: PayloadAction<PostStudentPapersPayload>
    ) => {
      state.isCreatingStudentPaper = true;
      state.error = null;
    },
    createStudentPaperSuccess: (
      state,
      action: PayloadAction<StudentPaperFull>
    ) => {
      state.isCreatingStudentPaper = false;
      state.singlePaper = action.payload;
    },
    createStudentPaperFailure: (
      state,
      action: PayloadAction<StudentPapersError>
    ) => {
      state.isCreatingStudentPaper = false;
      state.error = action.payload;
      state.singlePaper = null;
    },
    setQuestionAnswerMap: (
      state,
      action: PayloadAction<{
        question: number;
        answerOption: AnswerOptionChoice;
        questionType:
          | 'SINGLE_CHOICE'
          | 'MULTIPLE_CHOICE'
          | 'LONG_TEXT'
          | 'SHORT_TEXT';
      }>
    ) => {
      state.questionAnswerMap[action.payload.question] =
        action.payload.answerOption;
    },
    clearQuestionAnserMap: (state) => {
      state.questionAnswerMap = {};
    },
    setTimeLeft: (state, action: PayloadAction<StatisticProps['value']>) => {
      state.timeLeft = action.payload;
    },
    submitStudentPaperStart: (
      state,
      action: PayloadAction<SubmitPaperPayload>
    ) => {
      state.isSubmitingStudentPaper = true;
    },
    submitStudentPaperSuccess: (
      state,
      action: PayloadAction<SubmitPaperResponseSuccess>
    ) => {
      state.isSubmitingStudentPaper = false;
      state.paperResult = action.payload;
    },
    submitStudentPaperFailure: (
      state,
      action: PayloadAction<StudentPapersError>
    ) => {
      state.isSubmitingStudentPaper = false;
      state.error = action.payload;
    },
    setPaperResult: (
      state,
      action: PayloadAction<SubmitPaperResponseSuccess | null>
    ) => {
      state.paperResult = action.payload;
    },
    resetStudentPapersState: (state) => {
      Object.assign(state, initialState);
    },
    addBookmark: (state, action: PayloadAction<BookmarksDb[]>) => {
      state.bookmarks = action.payload;
    },
    removeBookmark: (state, action: PayloadAction<BookmarksDb>) => {
      const item = action.payload.questionId;
      state.bookmarks = state.bookmarks.filter(
        (bookmark) => bookmark.questionId !== item
      );
    },
    clearBookmarks: (state) => {
      state.bookmarks = [];
    },
    fetchSingleStudentPaperStart: (
      state,
      action: PayloadAction<GetSingleStudentPaperPayload>
    ) => {
      state.isFetchingSingleStudentPaper = true;
    },
    fetchSingleStudentPaperSuccess: (
      state,
      action: PayloadAction<StudentPaperFull>
    ) => {
      state.isFetchingSingleStudentPaper = false;
      state.singlePaper = action.payload;
      state.error = null;
    },
    fetchSingleStudentPaperFailure: (
      state,
      action: PayloadAction<StudentPapersError>
    ) => {
      state.isFetchingSingleStudentPaper = false;
      state.error = action.payload;
      state.singlePaper = null;
    },
    setCompletedStudentPapers: (
      state,
      action: PayloadAction<GetStudentPapersSuccess>
    ) => {
      state.completedStudentPapers = action.payload;
    },
    setInProgressStudentPapers: (
      state,
      action: PayloadAction<GetStudentPapersSuccess>
    ) => {
      state.inProgressStudentPapers = action.payload;
    },
  },
});

export const {
  fetchStudentPapersStart,
  fetchStudentPapersSuccess,
  fetchStudentPapersFailure,
  fetchStudentPaperQuestionsFailure,
  fetchStudentPaperQuestionsStart,
  fetchStudentPaperQuestionsSuccess,
  fetchStudentPaperQuestionsSolutionsFailure,
  fetchStudentPaperQuestionsSolutionsStart,
  fetchStudentPaperQuestionsSolutionsSuccess,
  createStudentPaperStart,
  createStudentPaperFailure,
  createStudentPaperSuccess,
  setQuestionAnswerMap,
  clearQuestionAnserMap,
  setTimeLeft,
  submitStudentPaperStart,
  submitStudentPaperSuccess,
  submitStudentPaperFailure,
  setPaperResult,
  resetStudentPapersState,
  addBookmark,
  removeBookmark,
  clearBookmarks,
  fetchSingleStudentPaperFailure,
  fetchSingleStudentPaperStart,
  fetchSingleStudentPaperSuccess,
  setCompletedStudentPapers,
  setInProgressStudentPapers,
} = studentPapersSlice.actions;

const studentPapersReducer = studentPapersSlice.reducer;
const persistConfig = {
  key: 'studentPapers',
  storage,
  whitelist: [
    'singlePaper',
    'questionAnswerMap',
    'timeLeft',
    'paperResult',
    'studentPaperQuestions',
    'bookmarks',
  ],
};

export default persistReducer(persistConfig, studentPapersReducer);
