import { call, put, takeLatest } from 'redux-saga/effects';
import {
  GetStudentPaperQuestionsSuccess,
  StudentPapersError,
} from '../typings';
import { RequestResult } from '../../../utils/request';

import { httpGetStudentPaperQuestions } from '../../../services/studentPapers';
import { networkErrorHandler } from '../../../utils/errorHandlers';

import {
  fetchStudentPaperQuestionsStart,
  fetchStudentPaperQuestionsSuccess,
  fetchStudentPaperQuestionsFailure,
} from '../reducer';

function* getStudentPaperQuestions({
  payload,
}: ReturnType<typeof fetchStudentPaperQuestionsStart>) {
  const response: RequestResult<
    GetStudentPaperQuestionsSuccess | StudentPapersError
  > = yield call(httpGetStudentPaperQuestions, payload);

  const { raw, statusCode, success, message } = response;

  if (success) {
    yield put(
      fetchStudentPaperQuestionsSuccess(raw as GetStudentPaperQuestionsSuccess)
    );
  } else {
    yield put(fetchStudentPaperQuestionsFailure(raw as StudentPapersError));
    networkErrorHandler(statusCode, message);
  }
}

export default function* onFetchStudentPaperQuestions() {
  yield takeLatest(
    fetchStudentPaperQuestionsStart.type,
    getStudentPaperQuestions
  );
}
