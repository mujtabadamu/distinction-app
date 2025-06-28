import { call, put, takeLatest } from 'redux-saga/effects';
import {
  confirmEmailFailure,
  confirmEmailStart,
  confirmEmailSuccess,
} from '../reducer';
import { httpPostConfirmEmail } from '../../../services/auth';
import { RequestResult } from '../../../utils/request';

function* confirmEmail({ payload }: ReturnType<typeof confirmEmailStart>) {
  const { onSuccess, onFailure } = payload;

  const response: RequestResult<{ success: boolean }> = yield call(
    httpPostConfirmEmail,
    payload
  );

  const { success } = response;

  if (success) {
    yield put(confirmEmailSuccess());

    if (onSuccess) {
      onSuccess();
    }
  } else {
    yield put(confirmEmailFailure());

    if (onFailure) {
      onFailure();
    }
  }
}

export default function* onConfirmEmail() {
  yield takeLatest(confirmEmailStart.type, confirmEmail);
}
