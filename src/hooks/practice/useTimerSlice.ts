import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

interface TimerState {
  timeInMinutes: number;
}

const initialState: TimerState = {
  timeInMinutes: 0,
};

export const userPracticeTimerSlice = createSlice({
  name: 'practice_timer',
  initialState,
  reducers: {
    setTimer: (
      state,
      action: PayloadAction<{
        time: number;
      }>
    ) => {
      const { time } = action.payload;

      state.timeInMinutes = time;
    },
    clearTimer: (state) => {
      state.timeInMinutes = 0;
    },

    resetTimerState: () => initialState,
  },
});

export const { setTimer, clearTimer, resetTimerState } =
  userPracticeTimerSlice.actions;

export const usePracticeTimer = () =>
  useSelector((state: RootState) => state.timer?.timeInMinutes || 0);

const userPracticeTimerReducer = userPracticeTimerSlice.reducer;

const persistConfig = {
  key: 'practice_timer',
  storage,
  whitelist: ['timeInMinutes'],
};

export default persistReducer(persistConfig, userPracticeTimerReducer);
