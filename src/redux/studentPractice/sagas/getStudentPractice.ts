import { call, put, takeLatest } from 'redux-saga/effects';
import { StudentPracticeError, GetStudentPracticeSuccess } from '../typings';
import { RequestResult } from '../../../utils/request';
import { httpGetStudentPractice } from '../../../services/studentPractice';

import {
  fetchStudentPracticeStart,
  fetchStudentPracticeFailure,
  fetchStudentPracticeSuccess,
} from '../reducer';

function* getStudentPractice({
  payload,
}: ReturnType<typeof fetchStudentPracticeStart>) {
  const { onFailure, onSuccess } = payload;

  const response: RequestResult<
    StudentPracticeError | GetStudentPracticeSuccess
  > = yield call(httpGetStudentPractice, payload);

  const { raw,  success } = response;

  if (success) {
    yield put(fetchStudentPracticeSuccess(raw as GetStudentPracticeSuccess));

    if (onSuccess) {
      onSuccess();
    }
  } else {
    yield put(fetchStudentPracticeFailure(raw as StudentPracticeError));

    if (onFailure) {
      onFailure();
    }
  }
}

export default function* onGetStudentPractice() {
  yield takeLatest(fetchStudentPracticeStart.type, getStudentPractice);
}
