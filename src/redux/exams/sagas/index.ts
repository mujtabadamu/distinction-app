import { all, call } from 'redux-saga/effects';

import onFetchExams from './getExams';

export default function* examsSaga() {
  yield all([call(onFetchExams)]);
}
