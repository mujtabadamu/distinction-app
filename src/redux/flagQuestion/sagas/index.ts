import { all, call } from 'redux-saga/effects';
import onCreateQuestionFlag from './createQuestionFlag';

export default function* flagQuestionSaga() {
  yield all([
    call(onCreateQuestionFlag),
  ]);
  
}
