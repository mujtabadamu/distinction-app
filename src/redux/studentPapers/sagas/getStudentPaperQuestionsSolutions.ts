import { call, put, takeLatest } from 'redux-saga/effects';
import {
  GetStudentPaperQuestionsSolutionsSuccess,
  StudentPapersError,
} from '../typings';
import { RequestResult } from '../../../utils/request';

import { httpGetStudentPaperQuestionsSolutions } from '../../../services/studentPapers';
import { networkErrorHandler } from '../../../utils/errorHandlers';

import {
  fetchStudentPaperQuestionsSolutionsFailure,
  fetchStudentPaperQuestionsSolutionsStart,
  fetchStudentPaperQuestionsSolutionsSuccess,
} from '../reducer';

function* getStudentPaperQuestionsSolutions({
  payload,
}: ReturnType<typeof fetchStudentPaperQuestionsSolutionsStart>) {
  const response: RequestResult<
    GetStudentPaperQuestionsSolutionsSuccess | StudentPapersError
  > = yield call(httpGetStudentPaperQuestionsSolutions, payload);

  const { raw, statusCode, success, message } = response;

  if (success) {
    yield put(
      fetchStudentPaperQuestionsSolutionsSuccess(
        raw as GetStudentPaperQuestionsSolutionsSuccess
      )
    );
  } else {
    yield put(
      fetchStudentPaperQuestionsSolutionsFailure(raw as StudentPapersError)
    );
    networkErrorHandler(statusCode, message);
  }
}

export default function* onFetchStudentPaperQuestionsSolutions() {
  yield takeLatest(
    fetchStudentPaperQuestionsSolutionsStart.type,
    getStudentPaperQuestionsSolutions
  );
}
