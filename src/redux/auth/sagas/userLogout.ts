import { takeLatest } from 'redux-saga/effects';
import { userLogout } from '../reducer';
import { logout } from '../../../utils/helpers';

export function* logOut() {
  yield logout();
} 

export default function* onLogoutStart() {
  yield takeLatest(userLogout.type, logOut);
}
