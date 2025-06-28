import { call, put, takeLatest } from 'redux-saga/effects';
import { Notify } from '@flexisaf/flexibull2';
import { StudentPapersError, SubmitPaperResponseSuccess } from '../typings';
import { RequestResult } from '../../../utils/request';

import { httpPostSubmitStudentPaper } from '../../../services/studentPapers';
// import { networkErrorHandler } from '../../../utils/errorHandlers';

import {
  submitStudentPaperFailure,
  submitStudentPaperStart,
  submitStudentPaperSuccess,
} from '../reducer';

function* submitPaper({ payload }: ReturnType<typeof submitStudentPaperStart>) {
  const { callback } = payload;
  const response: RequestResult<
    SubmitPaperResponseSuccess | StudentPapersError
  > = yield call(httpPostSubmitStudentPaper, payload);

  const { raw, success } = response;

  if (success) {
    yield put(submitStudentPaperSuccess(raw as SubmitPaperResponseSuccess));

    if (callback) {
      callback();
    }
  } else {
    yield put(submitStudentPaperFailure(raw as StudentPapersError));

    Notify(raw, { status: 'error' });
  }
}

export default function* onSubmitPaper() {
  yield takeLatest(submitStudentPaperStart.type, submitPaper);
}
