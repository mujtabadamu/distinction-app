import { call, put, takeLatest } from 'redux-saga/effects';
import {
  passwordResetStart,
  passwordResetFailure,
  passwordResetSuccess,
} from '../reducer';
import { httpPostPasswordReset } from '../../../services/auth';

import { RequestResult } from '../../../utils/request';

import { AuthError } from '../typings';
import { networkErrorHandler } from '../../../utils/errorHandlers';

export function* userPasswordReset({
  payload,
}: ReturnType<typeof passwordResetStart>) {
  const { onSuccess, onFailure } = payload;

  const response: RequestResult<null | AuthError> = yield call(
    httpPostPasswordReset,
    payload
  );
  const { raw, statusCode, success, message } = response;

  if (success) {
    yield put(passwordResetSuccess());

    if (onSuccess) {
      onSuccess();
    }
  } else {
    yield put(passwordResetFailure(raw as AuthError));
    networkErrorHandler(statusCode, message);
    if (onFailure) {
      onFailure();
    }
  }
}

export default function* onPasswordReset() {
  yield takeLatest(passwordResetStart.type, userPasswordReset);
}
