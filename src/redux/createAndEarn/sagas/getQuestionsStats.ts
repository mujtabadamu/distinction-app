import { call, put, takeLatest } from 'redux-saga/effects';
import { GetQuestionStatsSuccess, QuestionsError } from '../typings';
import { RequestResult } from '../../../utils/request';
import { networkErrorHandler } from '../../../utils/errorHandlers';
import {
  fetchQuestionsStatsStart,
  fetchQuestionsStatsSuccess,
  fetchQuestionsStatsFailure,
} from '../reducers';
import { httpGetQuestionsStats } from '../../../services/createAndEarn';

export function* fetchQuestionsStats({
  payload,
}: ReturnType<typeof fetchQuestionsStatsStart>) {
  const response: RequestResult<GetQuestionStatsSuccess | QuestionsError> =
    yield call(httpGetQuestionsStats, payload);

  const { raw, success, statusCode, message } = response;

  if (success) {
    yield put(fetchQuestionsStatsSuccess(raw as GetQuestionStatsSuccess));
  } else {
    yield put(fetchQuestionsStatsFailure(raw as QuestionsError));
    networkErrorHandler(statusCode, message);
  }
}

export default function* onFetchQuestionsStats() {
  yield takeLatest(fetchQuestionsStatsStart.type, fetchQuestionsStats);
}
