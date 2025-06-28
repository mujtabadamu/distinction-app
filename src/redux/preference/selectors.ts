import { createSelector } from 'reselect';
import { RootState } from '../store';

const selectPreference = (state: RootState) => state.preference;

export const selectPreferredCurrency = createSelector(
  [selectPreference],
  (preference) => preference.preferredCurrency
);
