import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import { useDispatch } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';

import { courseApi } from 'pages/courses/course-api';
import { enrolledCourseApi } from 'pages/courses/enrolledCourseApi';
import { baseApi } from 'store/emptyApi';
import { userProfileSlice } from 'pages/auth/userProfileSlice';
import { authSlice } from 'pages/auth/authSlice';
import userPracticeReducer from '../hooks/practice/usePracticeSlice';
import userPracticeTimerReducer from '../hooks/practice/useTimerSlice';
import studentPaperUIReducer from '../hooks/studentPapers/useStudentPaperSlice';
import statisticsReducer from './statisticsSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  //   whitelist: [],
};
const rootReducer = combineReducers({
  authReducer: authSlice.reducer,
  userProfile: userProfileSlice.reducer,
  practice: userPracticeReducer,
  timer: userPracticeTimerReducer,
  studentPaperUI: studentPaperUIReducer,
  statistics: statisticsReducer,

  [baseApi.reducerPath]: baseApi.reducer,
  [courseApi.reducerPath]: courseApi.reducer,
  [enrolledCourseApi.reducerPath]: enrolledCourseApi.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: true, serializableCheck: false }).concat(
      baseApi.middleware,
      courseApi.middleware,
      enrolledCourseApi.middleware
    ),
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const persistor = persistStore(store);
