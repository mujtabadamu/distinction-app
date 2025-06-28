import { put, takeLatest } from 'redux-saga/effects';
import { showSessionExpiryMessage } from '../reducer';

function* handleShowSessionExpiredMessage() {
  // Ensure only one modal is shown
  const existingModal = document.querySelector('.session-expired-modal');
  if (existingModal) return;

  yield put(showSessionExpiryMessage());
}

export default function* watchSessionExpiration() {
  yield takeLatest(
    showSessionExpiryMessage.type,
    handleShowSessionExpiredMessage
  );
}
