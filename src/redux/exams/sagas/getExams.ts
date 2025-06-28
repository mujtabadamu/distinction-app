import { call, put, takeLatest } from 'redux-saga/effects';
import { GetExamsSuccess, ExamsError } from '../typings';
import { RequestResult } from '../../../utils/request';
import {
  fetchExamsFailure,
  fetchExamsStart,
  fetchExamsSuccess,
} from '../reducer';
import { httpGetExams } from '../../../services/exams';
import { networkErrorHandler } from '../../../utils/errorHandlers';

export function* fetchExams({ payload }: ReturnType<typeof fetchExamsStart>) {
  const response: RequestResult<GetExamsSuccess | ExamsError> = yield call(
    httpGetExams,
    payload
  );

  const { raw, success, statusCode, message } = response;

  if (success) {
    yield put(fetchExamsSuccess(raw as GetExamsSuccess));
  } else {
    yield put(fetchExamsFailure(raw as ExamsError));
    networkErrorHandler(statusCode, message);
  }
}

export default function* onFetchExams() {
  yield takeLatest(fetchExamsStart.type, fetchExams);
}
