import { all, call } from 'redux-saga/effects';
import onFetchQuestions from './getQuestions';
import onFetchQuestionsStats from './getQuestionsStats';
import onCreateQuestion from './createQuestion';
import onCreateBulkQuestion from './createBulkQuestions';

export default function* createAndEarnSaga() {
  yield all([
    call(onFetchQuestions),
    call(onFetchQuestionsStats),
    call(onCreateQuestion),
    call(onCreateBulkQuestion),
  ]);
}
