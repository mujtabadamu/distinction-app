import { createSelector } from 'reselect';
import { RootState } from '../store';

const selectExamGroups = (state: RootState) => state.examGroups;

export const selectIsFetchingExamGroups = createSelector(
  [selectExamGroups],
  (examGroups) => examGroups.isFetchingGroups
);

export const selectIsFilteringExamGroups = createSelector(
  [selectExamGroups],
  (examGroups) => examGroups.isFilteringGroups
);

export const selectGroups = createSelector(
  [selectExamGroups],
  (examGroups) => examGroups.examGroups
);

export const selectActiveExamGroup = createSelector(
  [selectExamGroups],
  (examGroups) => examGroups.activeExamGroup
);