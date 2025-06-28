import { all, call } from 'redux-saga/effects';

import authSagas from './auth/sagas';
import examGroupsSaga from './examGroups/sagas';
import subjectsSaga from './subjects/sagas';
import examsSaga from './exams/sagas';
import papersSaga from './papers/sagas';
import studentPapersSaga from './studentPapers/sagas';
import studentPracticeSaga from './studentPractice/sagas';
import topicsSaga from './topics/sagas';
import statisticsSaga from './statistics/sagas';
import flagQuestionSaga from './flagQuestion/sagas';
import createAndEarnSaga from './createAndEarn/sagas';

export default function* rootSaga() {
  yield all([
    call(authSagas),
    call(examGroupsSaga),
    call(subjectsSaga),
    call(examsSaga),
    call(papersSaga),
    call(studentPapersSaga),
    call(studentPracticeSaga),
    call(topicsSaga),
    call(statisticsSaga),
    call(flagQuestionSaga),
    call(createAndEarnSaga),
  ]);
}
