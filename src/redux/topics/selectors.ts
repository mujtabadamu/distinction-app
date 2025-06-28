import { createSelector } from 'reselect';
import { RootState } from '../store';

const selectTopics = (state: RootState) => state.topics;

export const selectIsFetchingTopics = createSelector(
  [selectTopics],
  (topics) => topics.isLoading
);

export const selectTopicsData = createSelector(
  [selectTopics],
  (topics) => topics.topics
);
