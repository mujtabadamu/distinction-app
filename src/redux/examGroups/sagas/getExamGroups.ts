import { call, put, takeLatest } from 'redux-saga/effects';
import { GetExamGroupsSuccess, ExamGroupError } from '../typings';
import { RequestResult } from '../../../utils/request';
import {
  fetchExamGroupsStart,
  fetchExamGroupsSuccess,
  fetchExamGroupsFailure,
} from '../reducer';
import { httpGetExamGroups } from '../../../services/examGroups';
import { networkErrorHandler } from '../../../utils/errorHandlers';

export function* fetchExamGroups({
  payload,
}: ReturnType<typeof fetchExamGroupsStart>) {
  const response: RequestResult<GetExamGroupsSuccess | ExamGroupError> =
    yield call(httpGetExamGroups, payload);

  const { raw, success, statusCode, message } = response;

  if (success) {
    yield put(fetchExamGroupsSuccess(raw as GetExamGroupsSuccess));
  } else {
    yield put(fetchExamGroupsFailure(raw as ExamGroupError));
    networkErrorHandler(statusCode, message);
  }
}

export default function* onFetchExamGroups() {
  yield takeLatest(fetchExamGroupsStart.type, fetchExamGroups);
}
