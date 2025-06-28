import { call, put, takeLatest } from 'redux-saga/effects';
import { StudentPracticeError, StudentPracticeSuccess } from '../typings';
import { RequestResult } from '../../../utils/request';

import { httpPostStudentPractice } from '../../../services/studentPractice';
import { networkErrorHandler } from '../../../utils/errorHandlers';

import {
  createStudentPracticeStart,
  createStudentPracticeSuccess,
  createStudentPracticeFailure,
} from '../reducer';

function* createPractice({
  payload,
}: ReturnType<typeof createStudentPracticeStart>) {
  const { onFailure, onSuccess } = payload;
  const response: RequestResult<
    StudentPracticeSuccess | StudentPracticeError | string
  > = yield call(httpPostStudentPractice, payload);

  const { raw, statusCode, success, message } = response;

  if (success) {
    yield put(createStudentPracticeSuccess(raw as StudentPracticeSuccess));

    if (onSuccess) {
      onSuccess();
    }
  } else {
    yield put(createStudentPracticeFailure(raw as StudentPracticeError));
    networkErrorHandler(statusCode, (raw as string) || message);
    if (onFailure) {
      onFailure();
    }
  }
}

export default function* onCreatePractice() {
  yield takeLatest(createStudentPracticeStart.type, createPractice);
}
