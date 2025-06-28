import { call, put, takeLatest } from 'redux-saga/effects';
import { QuestionsError } from '../typings';
import { RequestResult } from '../../../utils/request';
import { Notify } from '@flexisaf/flexibull2';

import {
  createBulkQuestionsStart,
  createBulkQuestionsSuccess,
  createBulkQuestionsFailure,
} from '../reducers';
import { httpPostBulkQuestion } from '../../../services/createAndEarn';

function* createBulkQuestion({
  payload,
}: ReturnType<typeof createBulkQuestionsStart>) {
  const { callback, data } = payload;
  const response: RequestResult<never | QuestionsError> = yield call(
    httpPostBulkQuestion,
    data
  );

  const { raw, success } = response;

  if (success) {
    yield put(createBulkQuestionsSuccess());
    Notify('Questions uploaded successfully', { status: 'success' });
    if (callback) {
      callback();
    }
  } else {
    yield put(createBulkQuestionsFailure(raw as QuestionsError));
  }
}

export default function* onCreateBulkQuestion() {
  yield takeLatest(createBulkQuestionsStart.type, createBulkQuestion);
}
