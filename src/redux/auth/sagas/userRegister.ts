import { call, put, takeLatest } from 'redux-saga/effects';
import {
  userRegisterStart,
  userRegisterSuccess,
  userRegisterFailure,
} from '../reducer';

import { RequestResult } from '../../../utils/request';
import urls from '../../../utils/config';
import request from '../../../utils/request';
import { errorNotifier } from '../../../utils/helpers';

import { RegisterSuccessPayload, ErrorRegisterPayload } from '../typings';
import { PLATFORM as platform } from '../../../utils/constants';

const { API_BASE_URL } = urls || {};

export function* userRegister(action: ReturnType<typeof userRegisterStart>) {
  const {
    email,
    password,
    firstName,
    lastName,
    middleName,
    phone,
    referralCode,
    captcha,
    cb,
  } = action.payload;
  const url = `${API_BASE_URL}/distinction/auth/register`;
  const response: RequestResult<RegisterSuccessPayload | ErrorRegisterPayload> =
    yield call(request, {
      method: 'post',
      url,
      data: {
        email: email.trim(),
        password: password.trim(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        middleName: middleName?.trim(),
        phone: phone?.trim(),
        platform,
        referralCode: referralCode?.trim(),
        captcha,
      },
    });
  if (response.statusCode === 200) {
    yield put(userRegisterSuccess());

    if (cb) {
      cb(response.raw as RegisterSuccessPayload);
    }
  } else {
    const raw = response.raw as ErrorRegisterPayload | string;
    let message: string;
    if (typeof raw === 'string') {
      message = raw;
    } else {
      message = raw.error;
    }

    errorNotifier(message);
    yield put(
      userRegisterFailure({
        message: 'An error occurred while registering. Please try again.',
      })
    );
  }
}

export default function* onRegisterStart() {
  yield takeLatest(userRegisterStart.type, userRegister);
}
