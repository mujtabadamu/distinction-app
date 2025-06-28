import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import { useSelector } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

interface TimerState {
  timeInMuntes: number;
}

const initialState: TimerState = {
  timeInMuntes: 0,
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

      state.timeInMuntes = time;
    },
    clearTimer: (state) => {
      state.timeInMuntes = 0;
    },

    resetTimerState: () => initialState,
  },
});

export const { setTimer, clearTimer, resetTimerState } =
  userPracticeTimerSlice.actions;

export const usePracticeTimer = () =>
  useSelector((state: RootState) => state.timer.timeInMuntes);

const userPracticeTimerReducer = userPracticeTimerSlice.reducer;

const persistConfig = {
  key: 'practice_timer',
  storage,
  whitelist: ['timeInMuntes'],
};

export default persistReducer(persistConfig, userPracticeTimerReducer);
