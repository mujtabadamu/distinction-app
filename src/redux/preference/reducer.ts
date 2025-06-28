import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PreferenceState, PreferredCurrency } from './typings';

import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const initialState: PreferenceState = {
  preferredCurrency: {
    label: 'USD',
    value: 'USD',
  },
};

export const preferenceSlice = createSlice({
  name: 'preference',
  initialState,
  reducers: {
    setPreferredCurrency: (state, action: PayloadAction<PreferredCurrency>) => {
      state.preferredCurrency = action.payload;
    },
  },
});

export const { setPreferredCurrency } = preferenceSlice.actions;

const preferenceReducer = preferenceSlice.reducer;
const persistConfig = {
  key: 'preference',
  storage,
  whitelist: ['preferredCurrency'],
};
export default persistReducer(persistConfig, preferenceReducer);
