import { call, put, takeLatest } from 'redux-saga/effects';

import {
  resendVerificationEmailStart,
  resendVerificationEmailFailure,
  resendVerificationEmailSuccess,
} from '../reducer';
import { successNotifier, errorNotifier } from '../../../utils/helpers';
import { ResendVerifyEmailSuccess, ErrorRegisterPayload } from '../typings';

import urls from '../../../utils/config';
import request, { RequestResult } from '../../../utils/request';

import { PLATFORM } from '../../../utils/constants';

const { API_BASE_URL } = urls || {};

export function* verifyEmail(
  action: ReturnType<typeof resendVerificationEmailStart>
) {
  const { username } = action.payload;
  const url = `${API_BASE_URL}/distinction/auth/verify/resend`;
  const response: RequestResult<
    ResendVerifyEmailSuccess | ErrorRegisterPayload
  > = yield call(request, {
    method: 'post',
    url,
    data: { username, platform: PLATFORM },
  });

  if (response.statusCode === 200) {
    yield put(resendVerificationEmailSuccess());
    successNotifier('Verification email resent successfully');
  } else {
    const raw = response.raw as ErrorRegisterPayload;
    yield put(resendVerificationEmailFailure());
    errorNotifier(
      raw.error ||
        'Error occurred resending verification mail. Please try again later or contact support.'
    );
  }
}

export default function* onVerifyEmailStart() {
  yield takeLatest(resendVerificationEmailStart, verifyEmail);
}
