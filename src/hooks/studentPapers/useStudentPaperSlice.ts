import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StudentPaperView } from '../../store/result';

interface StudentPaperUIState {
  selectedPaper: StudentPaperView | null;
  isCreating: boolean;
  isSubmitting: boolean;
  error: string | null;
  bookmarks: Array<{
    questionId: string;
    studentPaperId: string;
  }>;
  questionAnswerMap: Record<
    string,
    {
      questionId: string;
      answerOptionIds: string[];
      answerText?: string;
    }
  >;
  timeLeft: number;
  paperResult: any | null;
}

const initialState: StudentPaperUIState = {
  selectedPaper: null,
  isCreating: false,
  isSubmitting: false,
  error: null,
  bookmarks: [],
  questionAnswerMap: {},
  timeLeft: Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30, // Default 2 days + 30 seconds
  paperResult: null,
};

const studentPaperUISlice = createSlice({
  name: 'studentPaperUI',
  initialState,
  reducers: {
    setSelectedPaper: (
      state,
      action: PayloadAction<StudentPaperView | null>
    ) => {
      state.selectedPaper = action.payload;
    },
    setCreating: (state, action: PayloadAction<boolean>) => {
      state.isCreating = action.payload;
    },
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    addBookmark: (
      state,
      action: PayloadAction<{ questionId: string; studentPaperId: string }>
    ) => {
      const existingIndex = state.bookmarks.findIndex(
        (b) =>
          b.questionId === action.payload.questionId &&
          b.studentPaperId === action.payload.studentPaperId
      );
      if (existingIndex === -1) {
        state.bookmarks.push(action.payload);
      }
    },
    removeBookmark: (
      state,
      action: PayloadAction<{ questionId: string; studentPaperId: string }>
    ) => {
      state.bookmarks = state.bookmarks.filter(
        (b) =>
          !(
            b.questionId === action.payload.questionId &&
            b.studentPaperId === action.payload.studentPaperId
          )
      );
    },
    clearBookmarks: (state) => {
      state.bookmarks = [];
    },
    setQuestionAnswer: (
      state,
      action: PayloadAction<{
        questionId: string;
        answerOptionIds: string[];
        answerText?: string;
      }>
    ) => {
      state.questionAnswerMap[action.payload.questionId] = action.payload;
    },
    clearQuestionAnswerMap: (state) => {
      state.questionAnswerMap = {};
    },
    setTimeLeft: (state, action: PayloadAction<number>) => {
      state.timeLeft = action.payload;
    },
    setPaperResult: (state, action: PayloadAction<any | null>) => {
      state.paperResult = action.payload;
    },
    resetState: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setSelectedPaper,
  setCreating,
  setSubmitting,
  setError,
  addBookmark,
  removeBookmark,
  clearBookmarks,
  setQuestionAnswer,
  clearQuestionAnswerMap,
  setTimeLeft,
  setPaperResult,
  resetState,
} = studentPaperUISlice.actions;

export default studentPaperUISlice.reducer;
