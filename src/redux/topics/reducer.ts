import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  TopicsState,
  TopicsError,
  GetTopicsSuccess,
  TopicsPayload,
} from './typings';

const initialState: TopicsState = {
  topics: null,
  error: null,
  isLoading: false,
};

const topicsSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fetchTopicsStart: (state, action: PayloadAction<TopicsPayload>) => {
      state.error = null;
      state.isLoading = true;
      state.topics = null;
    },
    fetchTopicsSuccess: (state, action: PayloadAction<GetTopicsSuccess>) => {
      state.isLoading = false;
      state.topics = action.payload;
      state.error = null;
    },
    fetchTopicsFailure: (state, action: PayloadAction<TopicsError>) => {
      state.isLoading = false;
      state.topics = null;
      state.error = action.payload;
    },

    clearTopics: (state) => {
      state.topics = null;
    },

    fetchAutoCompleteTopicsStart: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      action: PayloadAction<TopicsPayload>
    ) => {
      state.error = null;
      state.isLoading = true;
      state.topics = null;
    },
    fetchAutoCompleteTopicsSuccess: (
      state,
      action: PayloadAction<GetTopicsSuccess>
    ) => {
      state.isLoading = false;
      state.topics = action.payload;
      state.error = null;
    },
    fetchAutoCompleteTopicsFailure: (
      state,
      action: PayloadAction<TopicsError>
    ) => {
      state.isLoading = false;
      state.topics = null;
      state.error = action.payload;
    },
  },
});

export const {
  fetchTopicsFailure,
  fetchTopicsStart,
  fetchTopicsSuccess,
  clearTopics,
  fetchAutoCompleteTopicsStart,
  fetchAutoCompleteTopicsSuccess,
  fetchAutoCompleteTopicsFailure,
} = topicsSlice.actions;

const topicsReducer = topicsSlice.reducer;

export default topicsReducer;
