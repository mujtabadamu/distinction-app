import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import { useDispatch } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
// import { courseApi } from 'pages/courses/course-api';
// import { enrolledCourseApi } from 'pages/courses/enrolledCourseApi';
import { baseApi } from 'store/emptyApi';

const saga = createSagaMiddleware();
// const otherMiddlewares = [courseApi.middleware, enrolledCourseApi.middleware];

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  //   whitelist: [],
};

// const otherMiddlewares = [courseApi.middleware, enrolledCourseApi.middleware];
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: true, serializableCheck: false })
      .concat(saga)
      .concat(baseApi.middleware),
  // .concat(otherMiddlewares),
  devTools: process.env.NODE_ENV !== 'production',
});

saga.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const persistor = persistStore(store);
