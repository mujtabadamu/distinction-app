import { all, call } from 'redux-saga/effects';

import onFetchTopics from './getTopics';
import onFetchAutoCompleteTopics from './getAutoCompleteTopics';

export default function* topicsSaga() {
  yield all([call(onFetchTopics), call(onFetchAutoCompleteTopics)]);
}
