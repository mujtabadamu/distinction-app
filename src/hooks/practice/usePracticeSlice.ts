/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

interface PracticeState {
  questionAnswerMap: {
    [key: number]: {
      questionId: string;
      answerOptionIds: string[];
      answerText?: string;
    };
  };
}

const initialState: PracticeState = {
  questionAnswerMap: {},
};

export const userPracticeSlice = createSlice({
  name: 'practice',
  initialState,
  reducers: {
    setQuestionAnswer: (
      state,
      action: PayloadAction<{
        question: number;
        answerOption: {
          questionId: string;
          answerOptionIds: string[];
          answerText?: string;
        };
        questionType:
          | 'SINGLE_CHOICE'
          | 'MULTIPLE_CHOICE'
          | 'LONG_TEXT'
          | 'SHORT_TEXT';
      }>
    ) => {
      const { question, answerOption, questionType } = action.payload;

      // Create the updated answer
      const updatedAnswer = {
        questionId: answerOption.questionId,
        answerOptionIds: [...answerOption.answerOptionIds],
        answerText: answerOption.answerText,
      };

      // Special handling for text answers
      if (questionType === 'LONG_TEXT' || questionType === 'SHORT_TEXT') {
        updatedAnswer.answerOptionIds = [];
      }

      // Update the specific question in the map
      state.questionAnswerMap[question] = updatedAnswer;
    },
    // Clear all question answers
    clearQuestionAnswers: (state) => {
      state.questionAnswerMap = {};
    },

    // Reset the entire practice state
    resetPracticeState: () => initialState,
  },
});

export const { setQuestionAnswer, clearQuestionAnswers, resetPracticeState } =
  userPracticeSlice.actions;

export const useQuestionAnswerMap = () =>
  useSelector((state: RootState) => state.practice?.questionAnswerMap || {});

// And if you need it as an array somewhere, you can convert it:
export const useQuestionAnswerArray = () => {
  const map = useSelector(
    (state: RootState) => state.practice?.questionAnswerMap || {}
  );
  return Object.entries(map)
    .sort(([keyA], [keyB]) => parseInt(keyA) - parseInt(keyB))
    .map(([_, value]) => value);
};

const userPracticeReducer = userPracticeSlice.reducer;

const persistConfig = {
  key: 'practice',
  storage,
  whitelist: ['questionAnswerMap'],
};

export default persistReducer(persistConfig, userPracticeReducer);
