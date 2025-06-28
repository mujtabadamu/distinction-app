import { call, put, takeLatest } from 'redux-saga/effects';
import { GetQuestionsSuccess, QuestionsError } from '../typings';
import { RequestResult } from '../../../utils/request';
import { networkErrorHandler } from '../../../utils/errorHandlers';
import {
  fetchQuestionsFailure,
  fetchQuestionsStart,
  fetchQuestionsSuccess,
} from '../reducers';
import { httpGetQuestions } from '../../../services/createAndEarn';

export function* fetchQuestions({
  payload,
}: ReturnType<typeof fetchQuestionsStart>) {
  const response: RequestResult<GetQuestionsSuccess | QuestionsError> =
    yield call(httpGetQuestions, payload);

  const { raw, success, statusCode, message } = response;

  if (success) {
    yield put(fetchQuestionsSuccess(raw as GetQuestionsSuccess));
  } else {
    yield put(fetchQuestionsFailure(raw as QuestionsError));
    networkErrorHandler(statusCode, message);
  }
}

export default function* onFetchQuestions() {
  yield takeLatest(fetchQuestionsStart.type, fetchQuestions);
}
