import { call, put, takeLatest } from 'redux-saga/effects';
import { FlagQuestionError, FlaggedQuestionSuccess } from '../typings';
import { RequestResult } from '../../../utils/request';

import {
  createFlagStart,
  createFlagSuccess,
  createFlagFailure,
} from '../reducers';
import { httpPostQuestionFlag } from '../../../services/flagQuestion';

function* createQuestionFlag({ payload }: ReturnType<typeof createFlagStart>) {
  const { onFailure, onSuccess } = payload;
  const response: RequestResult<FlaggedQuestionSuccess | FlagQuestionError> =
    yield call(httpPostQuestionFlag, payload);

  const { raw, success } = response;

  if (success) {
    yield put(createFlagSuccess(raw as FlaggedQuestionSuccess));
    if (onSuccess) {
      onSuccess();
    }
  } else {
    yield put(createFlagFailure(raw as FlagQuestionError));
    if (onFailure) {
      onFailure();
    }
  }
}

export default function* onCreateQuestionFlag() {
  yield takeLatest(createFlagStart.type, createQuestionFlag);
}
