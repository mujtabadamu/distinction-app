import { call, put, takeLatest } from 'redux-saga/effects';
import { GetSubjectsSuccess, SubjectError } from '../typings';
import { RequestResult } from '../../../utils/request';

import { httpGetAllSubjects } from '../../../services/subjects';
import { networkErrorHandler } from '../../../utils/errorHandlers';

import {
  fetchSubjectsFailure,
  fetchSubjectsStart,
  fetchSubjectsSuccess,
} from '../reducer';

function* getSubjects({ payload }: ReturnType<typeof fetchSubjectsStart>) {
  const response: RequestResult<GetSubjectsSuccess | SubjectError> = yield call(
    httpGetAllSubjects,
    payload
  );

  const { raw, statusCode, success, message } = response;

  if (success) {
    yield put(fetchSubjectsSuccess(raw as GetSubjectsSuccess));
  } else {
    yield put(fetchSubjectsFailure(raw as SubjectError));
    networkErrorHandler(statusCode, message);
  }
}

export default function* onFetchSubjects() {
  yield takeLatest(fetchSubjectsStart.type, getSubjects);
}
