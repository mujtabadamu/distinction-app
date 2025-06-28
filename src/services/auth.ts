import request from '../utils/request';
import urls from '../utils/config';
import {
  PasswordResetRequestPayload,
  PasswordResetPayload,
  GoogleAuthorizePayload,
  TokenLoginPayload,
  ConfirmEmailPayload,
} from '../redux/auth/typings';
import { PLATFORM as platform } from '../utils/constants';

const { API_BASE_URL } = urls || {};

export const httpPostPasswordRequest = (
  payload: PasswordResetRequestPayload
) => {
  const { email } = payload;

  const url = `${API_BASE_URL}/distinction/auth/password/reset-request`;

  return request({
    url,
    method: 'post',
    data: {
      username: email.trim(),
      platform,
    },
  });
};

export const httpPostPasswordReset = (payload: PasswordResetPayload) => {
  const { data } = payload;

  const url = `${API_BASE_URL}/distinction/auth/password/reset`;

  return request({
    url,
    method: 'post',
    data: { ...data, platform },
  });
};

export const httpGetGoogleAuthorize = (payload: GoogleAuthorizePayload) => {
  const { callbackUrl } = payload;

  const url = `${API_BASE_URL}/distinction/auth/google-authorize?callbackUrl=${callbackUrl}&platform=${platform}`;

  return request({
    url,
    method: 'get',
  });
};

export const httpPostTokenLogin = (payload: TokenLoginPayload) => {
  const { token } = payload;

  const url = `${API_BASE_URL}/distinction/auth/token-login`;

  return request({
    url,
    method: 'post',
    data: { token, platform },
  });
};

export const httpPostConfirmEmail = (payload: ConfirmEmailPayload) => {
  const {
    data: { userId, token, platform },
  } = payload;

  const url = `${API_BASE_URL}/distinction/auth/verify/confirm`;

  return request({
    url,
    method: 'post',
    data: { userId, token, platform },
  });
};