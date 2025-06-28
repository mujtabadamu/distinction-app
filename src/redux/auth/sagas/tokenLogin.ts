import { call, put, takeLatest } from 'redux-saga/effects';
import { LoginSuccessPayload } from '../typings';
import { RequestResult } from '../../../utils/request';
import {
  tokenLoginFailure,
  tokenLoginStart,
  tokenLoginSuccess,
  userLoginSuccess,
} from '../reducer';

import { httpPostTokenLogin } from '../../../services/auth';
import { networkErrorHandler } from '../../../utils/errorHandlers';
import {
  setLocalAccessToken,
  setLocalRefreshToken,
  setLocalUser,
} from '../../../utils/helpers';

export function* tokenLogin({ payload }: ReturnType<typeof tokenLoginStart>) {
  const { onFailure, onSuccess } = payload;
  const response: RequestResult<LoginSuccessPayload> = yield call(
    httpPostTokenLogin,
    payload
  );

  const { raw, success, statusCode, message } = response;

  if (success) {
    setLocalAccessToken(raw?.accessToken || '');
    setLocalRefreshToken(raw?.refreshToken || '');
    setLocalUser(JSON.stringify(raw?.user));
    yield put(tokenLoginSuccess());
    yield put(userLoginSuccess(raw as LoginSuccessPayload));

    if (onSuccess) {
      onSuccess();
    }
  } else {
    yield put(tokenLoginFailure());
    networkErrorHandler(
      statusCode,
      message ||
        'Unable to login you in. Please check your internet connection and try again.'
    );

    if (onFailure) {
      onFailure();
    }
  }
}

export default function* onTokenLogin() {
  yield takeLatest(tokenLoginStart.type, tokenLogin);
}
