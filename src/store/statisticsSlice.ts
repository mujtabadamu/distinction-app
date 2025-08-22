import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import storageSession from 'redux-persist/lib/storage/session';
import { persistReducer } from 'redux-persist';

interface StatisticsState {
  showContinuePractice: boolean;
  mostRecentPractice: any | null;
}

const initialState: StatisticsState = {
  showContinuePractice: false,
  mostRecentPractice: null,
};

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    setShowContinuePractice: (state, action: PayloadAction<boolean>) => {
      state.showContinuePractice = action.payload;
    },
    setMostRecentPractice: (state, action: PayloadAction<any | null>) => {
      state.mostRecentPractice = action.payload;
    },
  },
});

export const { setShowContinuePractice, setMostRecentPractice } =
  statisticsSlice.actions;

const statisticsReducer = statisticsSlice.reducer;

const persistConfig = {
  key: 'statistics',
  storage: storageSession,
  whitelist: ['showContinuePractice'],
};

export default persistReducer(persistConfig, statisticsReducer);
