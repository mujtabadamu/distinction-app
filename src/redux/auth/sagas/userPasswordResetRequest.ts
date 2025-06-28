import { call, put, takeLatest } from 'redux-saga/effects';
import {
  passwordResetRequestFailure,
  passwordResetRequestStart,
  passwordResetRequestSuccess,
} from '../reducer';
import { httpPostPasswordRequest } from '../../../services/auth';

import { RequestResult } from '../../../utils/request';

import { AuthError } from '../typings';
import { networkErrorHandler } from '../../../utils/errorHandlers';

export function* userPasswordResetRequest(
  action: ReturnType<typeof passwordResetRequestStart>
) {
  const { email, onFailure, onSuccess } = action.payload;

  const response: RequestResult<null | AuthError> = yield call(
    httpPostPasswordRequest,
    { email }
  );
  const { raw, statusCode, success, message } = response;

  if (success) {
    yield put(passwordResetRequestSuccess());

    if (onSuccess) {
      onSuccess();
    }
  } else {
    yield put(passwordResetRequestFailure(raw as AuthError));
    networkErrorHandler(statusCode, message);
    if (onFailure) {
      onFailure();
    }
  }
}

export default function* onPasswordResetRequest() {
  yield takeLatest(passwordResetRequestStart.type, userPasswordResetRequest);
}
