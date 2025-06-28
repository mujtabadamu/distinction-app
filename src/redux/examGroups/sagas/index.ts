import { all, call } from 'redux-saga/effects';

import onFetchExamGroups from './getExamGroups';

export default function* examGroupsSaga() {
  yield all([call(onFetchExamGroups)]);
}
