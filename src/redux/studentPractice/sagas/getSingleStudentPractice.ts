import { call, put, takeLatest } from 'redux-saga/effects';
import { StudentPracticeError, StudentPracticeSuccess } from '../typings';
import { RequestResult } from '../../../utils/request';

import { httpGetSingleStudentPractice } from '../../../services/studentPractice';
import { networkErrorHandler } from '../../../utils/errorHandlers';

import {
  fetchSingleStudentPracticeStart,
  fetchSingleStudentPracticeSuccess,
  fetchSingleStudentPracticeFailure,
} from '../reducer';

function* getSingleStudentPractice({
  payload,
}: ReturnType<typeof fetchSingleStudentPracticeStart>) {
  const { onFailure, onSuccess } = payload;

  const response: RequestResult<StudentPracticeError | StudentPracticeSuccess> =
    yield call(httpGetSingleStudentPractice, payload);

  const { raw, statusCode, success, message } = response;

  if (success) {
    yield put(fetchSingleStudentPracticeSuccess(raw as StudentPracticeSuccess));

    if (onSuccess) {
      onSuccess();
    }
  } else {
    yield put(fetchSingleStudentPracticeFailure(raw as StudentPracticeError));
    networkErrorHandler(statusCode, message);

    if (onFailure) {
      onFailure();
    }
  }
}

export default function* onGetSingleStudentPractice() {
  yield takeLatest(
    fetchSingleStudentPracticeStart.type,
    getSingleStudentPractice
  );
}
