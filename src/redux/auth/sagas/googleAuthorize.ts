import { call, put, takeLatest } from 'redux-saga/effects';
import { GoogleAuthorizeSuccess } from '../typings';
import { RequestResult } from '../../../utils/request';

import {
  googleAuthorizeFailure,
  googleAuthorizeStart,
  googleAuthorizeSuccess,
} from '../reducer';

import { httpGetGoogleAuthorize } from '../../../services/auth';
import { networkErrorHandler } from '../../../utils/errorHandlers';

export function* getGoogleAuthorize({
  payload,
}: ReturnType<typeof googleAuthorizeStart>) {
  const { onFailure, onSuccess } = payload;
  const response: RequestResult<GoogleAuthorizeSuccess> = yield call(
    httpGetGoogleAuthorize,
    payload
  );

  const { raw, success, statusCode, message } = response;

  if (success) {
    yield put(googleAuthorizeSuccess(raw as string));

    window.location.href = raw;

    if (onSuccess) {
      onSuccess();
    }
  } else {
    yield put(googleAuthorizeFailure());
    networkErrorHandler(
      statusCode,
      message ||
        'Failure to get necessary google authorization parameters. Please contact support'
    );

    if (onFailure) {
      onFailure();
    }
  }
}

export default function* onGetGoogleAuthroize() {
  yield takeLatest(googleAuthorizeStart.type, getGoogleAuthorize);
}
