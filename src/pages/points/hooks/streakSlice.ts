import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserStreakStatusDto } from 'generated/index';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

interface StreakState {
  streakStats: UserStreakStatusDto | null;
  isLoadingStreakStats: boolean;
}

const initialState: StreakState = {
  streakStats: null,
  isLoadingStreakStats: false,
};

const streakSlice = createSlice({
  name: 'streak',
  initialState,
  reducers: {
    setStreakStats: (state, action: PayloadAction<UserStreakStatusDto>) => {
      state.streakStats = action.payload;
    },
    setLoadingStreakStats: (state, action: PayloadAction<boolean>) => {
      state.isLoadingStreakStats = action.payload;
    },
  },
});

export const { setStreakStats, setLoadingStreakStats } = streakSlice.actions;

const streakReducer = streakSlice.reducer;

const persistConfig = {
  key: 'streak',
  storage,
  whitelist: ['streakStats'],
};

export default persistReducer(persistConfig, streakReducer);
