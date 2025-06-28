import { all, call } from 'redux-saga/effects';

import onLoginStart from './userLogin';
import onLogoutStart from './userLogout';
import onRegisterStart from './userRegister';
import onVerifyEmailStart from './resendVerificationEmail';
import onPasswordResetRequest from './userPasswordResetRequest';
import onPasswordReset from './userPasswordReset';
import onGetGoogleAuthroize from './googleAuthorize';
import onTokenLogin from './tokenLogin';
import onConfirmEmail from './confirmEmail';

export default function* authSagas() {
  yield all([
    call(onLoginStart),
    call(onLogoutStart),
    call(onRegisterStart),
    call(onVerifyEmailStart),
    call(onPasswordResetRequest),
    call(onPasswordReset),
    call(onGetGoogleAuthroize),
    call(onTokenLogin),
    call(onConfirmEmail),
  ]);
}
