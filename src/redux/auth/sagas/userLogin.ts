import { call, put, takeLatest } from 'redux-saga/effects';
import { LoginSuccessPayload, ErrorLoginPayload } from '../typings';
import {
  userLoginStart,
  userLoginSuccess,
  userLoginFailure,
  setNeedsVerification,
} from '../reducer';

import { RequestResult } from '../../../utils/request';
import urls from '../../../utils/config';
import request from '../../../utils/request';
import {
  errorNotifier,
  setLocalAccessToken,
  setLocalRefreshToken,
  setLocalUser,
} from '../../../utils/helpers';
import { PLATFORM as platform } from '../../../utils/constants';

const { API_BASE_URL } = urls || {};

export function* userLogin(action: ReturnType<typeof userLoginStart>) {
  const { username, password, cb } = action.payload;
  const url = `${API_BASE_URL}/distinction/auth/login`;
  const response: RequestResult<LoginSuccessPayload | ErrorLoginPayload> =
    yield call(request, {
      method: 'post',
      url,
      data: {
        username: username.trim(),
        password,
        platform,
      },
    });
  if (response.statusCode === 200) {
    const raw = response.raw as LoginSuccessPayload;

    setLocalAccessToken(raw?.accessToken || '');
    setLocalRefreshToken(raw?.refreshToken || '');
    setLocalUser(JSON.stringify(raw?.user));

    yield put(userLoginSuccess(raw));
    if (cb) {
      cb(raw);
    }
  } else if (response.statusCode === 403) {
    yield put(setNeedsVerification(true));
    const errorMessage = 'Your account is not verified';
    errorNotifier(errorMessage);
    yield put(
      userLoginFailure({
        message: errorMessage,
      })
    );
  } else {
    const raw = response.raw as ErrorLoginPayload;
    const errorMessage =
      typeof raw === 'string'
        ? raw
        : raw?.error || 'An error occurred trying to log you in';

    errorNotifier(errorMessage);
    yield put(
      userLoginFailure({
        message: errorMessage,
      })
    );
  }
}

export default function* onLoginStart() {
  yield takeLatest(userLoginStart.type, userLogin);
}
