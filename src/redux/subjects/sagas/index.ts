import { all, call } from 'redux-saga/effects';

import onFetchSubjects from './getAllSubjects';

export default function* subjectsSaga() {
  yield all([call(onFetchSubjects)]);
}
