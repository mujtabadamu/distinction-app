import { call, put, takeLatest } from 'redux-saga/effects';
import { QuestionsError } from '../typings';
import { RequestResult } from '../../../utils/request';
import { Notify } from '@flexisaf/flexibull2';
import {
  createQuestionStart,
  createQuestionSuccess,
  createQuestionFailure,
} from '../reducers';
import { httpPostQuestion } from '../../../services/createAndEarn';

function* createQuestion({ payload }: ReturnType<typeof createQuestionStart>) {
  const { callback, data } = payload;
  const response: RequestResult<never | QuestionsError> = yield call(
    httpPostQuestion,
    data
  );

  const { raw, success } = response;

  if (success) {
    yield put(createQuestionSuccess());
    Notify('Question created successfully', { status: 'success' });
    if (callback) {
      callback();
    }
  } else {
    yield put(createQuestionFailure(raw as QuestionsError));
  }
}

export default function* onCreateQuestion() {
  yield takeLatest(createQuestionStart.type, createQuestion);
}
