import { call, put, takeLatest } from 'redux-saga/effects';
import { GetSingleTotalQuestionSuccess, StatisticsError } from '../typings';
import { RequestResult } from '../../../utils/request';
import { httpGetTotalQuestion } from '../../../services/statistics';
import {
  fetchSingleTotalQuestion,
  fetchSingleTotalQuestionFailure,
  fetchSingleTotalQuestionSuccess,
} from '../reducer';
function* getSingleTotalQuestion({
  payload,
}: ReturnType<typeof fetchSingleTotalQuestion>) {
  const { onFailure, onSuccess } = payload;
  const response: RequestResult<
    StatisticsError | GetSingleTotalQuestionSuccess | string
  > = yield call(httpGetTotalQuestion, payload);
  const { raw,  success } = response;
  if (success) {
    yield put(
      fetchSingleTotalQuestionSuccess(raw as GetSingleTotalQuestionSuccess)
    );
    if (onSuccess) {
      onSuccess();
    }
  } else {
    yield put(fetchSingleTotalQuestionFailure(raw as StatisticsError));
    if (onFailure) {
      onFailure();
    }
  }
}
export default function* onGetTotalQuestion() {
  yield takeLatest(fetchSingleTotalQuestion.type, getSingleTotalQuestion);
}