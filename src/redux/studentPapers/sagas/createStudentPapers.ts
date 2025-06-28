import { call, put, takeLatest } from 'redux-saga/effects';
import { StudentPapersError, StudentPaperFull } from '../typings';
import { RequestResult } from '../../../utils/request';

import { httpPostStudentPapers } from '../../../services/studentPapers';
import { networkErrorHandler } from '../../../utils/errorHandlers';

import {
  createStudentPaperStart,
  createStudentPaperFailure,
  createStudentPaperSuccess,
} from '../reducer';

function* createPaper({ payload }: ReturnType<typeof createStudentPaperStart>) {
  const { callback } = payload;
  const response: RequestResult<StudentPaperFull | StudentPapersError> =
    yield call(httpPostStudentPapers, payload);

  const { raw, statusCode, success, message } = response;

  if (success) {
    yield put(createStudentPaperSuccess(raw as StudentPaperFull));

    if (callback) {
      callback();
    }
  } else {
    const errorPayload: StudentPapersError =
      typeof raw === 'string' ? { message: raw } : (raw as StudentPapersError);
    yield put(createStudentPaperFailure(errorPayload));
    networkErrorHandler(statusCode, message);
  }
}

export default function* onCreatePaper() {
  yield takeLatest(createStudentPaperStart.type, createPaper);
}
