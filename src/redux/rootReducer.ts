import { combineReducers } from 'redux';
// import authReducer from './auth/reducer';
import examGroupsReducer from './examGroups/reducer';
import subjectsReducer from './subjects/reducer';
import examsReducer from './exams/reducer';
import papersReducer from './papers/reducer';
import studentPapersReducer from './studentPapers/reducer';
import studentPracticeReducer from './studentPractice/reducer';
import topicsReducer from './topics/reducer';
import preferenceReducer from './preference/reducer';
import statisticsReducer from './statistics/reducer';
import flagQuestionReducer from './flagQuestion/reducers';
import createAndEarnReducer from './createAndEarn/reducers';
import userProfileSlice from 'pages/auth/userProfileSlice';
import authSlice from 'pages/auth/authSlice';
// import practiceSlice from 'hooks/practice/usePracticeSlice';
// import timerSlice from 'hooks/practice/useTimerSlice';
// import { courseApi } from 'pages/courses/course-api';
// import { enrolledCourseApi } from 'pages/courses/enrolledCourseApi';
import { baseApi } from 'store/emptyApi';

const rootReducer = combineReducers({
  // auth: authReducer,
  authReducer: authSlice, //new auth that use rtk hooks
  userProfile: userProfileSlice, //new auth that use rtk hooks
  // practice: practiceSlice,
  // timer: timerSlice,
  examGroups: examGroupsReducer,
  subjects: subjectsReducer,
  exams: examsReducer,
  papers: papersReducer,
  studentPapers: studentPapersReducer,
  studentPractice: studentPracticeReducer,
  topics: topicsReducer,
  preference: preferenceReducer,
  statistics: statisticsReducer,
  flagQuestion: flagQuestionReducer,
  createAndEarn: createAndEarnReducer,
  // [courseApi.reducerPath]: courseApi.reducer,
  // [enrolledCourseApi.reducerPath]: enrolledCourseApi.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
