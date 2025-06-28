import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  QuestionsState,
  QuestionsError,
  GetQuestionsSuccess,
  GetQuestionsPayload,
  GetQuestionsStatsPayload,
  GetQuestionStatsSuccess,
  QuestionCreatePayload,
  BulkQuestionCreatePayload,
} from './typings';

const initialState: QuestionsState = {
  questions: null,
  isFetchingQuestions: false,
  isFetchingQuestionsStats: false,
  questionStats: null,
  error: null,
};

const createAndEarnSlice = createSlice({
  name: 'createAndEarn',
  initialState,
  reducers: {
    fetchQuestionsStart: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      action: PayloadAction<GetQuestionsPayload>
    ) => {
      state.isFetchingQuestions = true;
    },
    fetchQuestionsSuccess: (
      state,
      action: PayloadAction<GetQuestionsSuccess>
    ) => {
      state.isFetchingQuestions = false;
      state.questions = action.payload;
    },
    fetchQuestionsFailure: (state, action: PayloadAction<QuestionsError>) => {
      state.isFetchingQuestions = false;
      state.questions = null;
      state.error = action.payload;
    },

    fetchQuestionsStatsStart: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      action: PayloadAction<GetQuestionsStatsPayload>
    ) => {
      state.isFetchingQuestionsStats = true;
    },
    fetchQuestionsStatsSuccess: (
      state,
      action: PayloadAction<GetQuestionStatsSuccess>
    ) => {
      state.isFetchingQuestionsStats = false;
      state.questionStats = action.payload;
    },
    fetchQuestionsStatsFailure: (
      state,
      action: PayloadAction<QuestionsError>
    ) => {
      state.isFetchingQuestionsStats = false;
      state.questionStats = null;
      state.error = action.payload;
    },

    createQuestionStart: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      action: PayloadAction<QuestionCreatePayload>
    ) => {
      state.isFetchingQuestions = true;
    },
    createQuestionSuccess: (state) => {
      state.isFetchingQuestions = false;
    },
    createQuestionFailure: (state, action: PayloadAction<QuestionsError>) => {
      state.isFetchingQuestions = false;
      state.error = action.payload;
    },

    createBulkQuestionsStart: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      action: PayloadAction<BulkQuestionCreatePayload>
    ) => {
      state.isFetchingQuestions = true;
    },
    createBulkQuestionsSuccess: (state) => {
      state.isFetchingQuestions = false;
    },
    createBulkQuestionsFailure: (
      state,
      action: PayloadAction<QuestionsError>
    ) => {
      state.isFetchingQuestions = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchQuestionsStart,
  fetchQuestionsSuccess,
  fetchQuestionsFailure,
  fetchQuestionsStatsStart,
  fetchQuestionsStatsSuccess,
  fetchQuestionsStatsFailure,
  createQuestionStart,
  createQuestionSuccess,
  createQuestionFailure,
  createBulkQuestionsStart,
  createBulkQuestionsSuccess,
  createBulkQuestionsFailure,
} = createAndEarnSlice.actions;

const createAndEarnReducer = createAndEarnSlice.reducer;

export default createAndEarnReducer;
