import { call, put, takeLatest } from 'redux-saga/effects';
import { StudentPapersError, StudentPaperFull } from '../typings';
import { RequestResult } from '../../../utils/request';

import { httpGetSingleStudentPaper } from '../../../services/studentPapers';
import { networkErrorHandler } from '../../../utils/errorHandlers';

import {
  fetchSingleStudentPaperStart,
  fetchSingleStudentPaperFailure,
  fetchSingleStudentPaperSuccess,
} from '../reducer';

function* getSingleStudentPaper({
  payload,
}: ReturnType<typeof fetchSingleStudentPaperStart>) {
  const { onFailure, onSuccess } = payload;

  const response: RequestResult<
    StudentPaperFull | StudentPapersError | string
  > = yield call(httpGetSingleStudentPaper, payload);

  const { raw, statusCode, success, message } = response;

  if (success) {
    yield put(fetchSingleStudentPaperSuccess(raw as StudentPaperFull));

    if (onSuccess) {
      onSuccess();
    }
  } else {
    yield put(fetchSingleStudentPaperFailure(raw as StudentPapersError));
    networkErrorHandler(statusCode, (raw as string) || message);

    if (onFailure) {
      onFailure();
    }
  }
}

export default function* onGetSingleStudentPaper() {
  yield takeLatest(fetchSingleStudentPaperStart.type, getSingleStudentPaper);
}
