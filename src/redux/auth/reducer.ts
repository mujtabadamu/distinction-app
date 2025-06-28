/* eslint-disable @typescript-eslint/no-unused-vars */
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  AuthState,
  AuthError,
  LoginPayload,
  RegisterPayload,
  ResendVerfiyEmail,
  PasswordResetRequestPayload,
  PasswordResetPayload,
  LoginSuccessPayload,
  GoogleAuthorizePayload,
  GoogleAuthorizeSuccess,
  TokenLoginPayload,
  ConfirmEmailPayload,
} from './typings';

export const initialState: AuthState = {
  isLoading: false,
  isLoadingGoogleAuth: false,
  isLoginViaToken: false,
  redirectUrl: '',
  isAuthenticated: false,
  error: null,
  currentUser: null,
  isRequestingPasswordReset: false,
  isResetingPassword: false,
  isSubscribed: false,
  isConfirmingEmail: true,
  isSessionExpired: false,
  needsVerification: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoginStart: (state, action: PayloadAction<LoginPayload>) => {
      state.isLoading = true;
      state.error = null;
    },
    userLoginSuccess: (state, action: PayloadAction<LoginSuccessPayload>) => {
      state.currentUser = action.payload.user;
      state.isLoading = false;
      state.error = initialState.error;
      state.isAuthenticated = true;
    },
    setNeedsVerification: (state, action) => {
      state.needsVerification = action.payload;
    },
    userLoginFailure: (state, action: PayloadAction<AuthError>) => {
      state.isLoading = false;
      state.currentUser = null;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    googleAuthorizeStart: (
      state,
      action: PayloadAction<GoogleAuthorizePayload>
    ) => {
      state.isLoadingGoogleAuth = true;
    },
    googleAuthorizeSuccess: (
      state,
      action: PayloadAction<GoogleAuthorizeSuccess>
    ) => {
      state.isLoadingGoogleAuth = false;
      state.redirectUrl = action.payload;
    },
    googleAuthorizeFailure: (state) => {
      state.isLoadingGoogleAuth = false;
    },
    tokenLoginStart: (state, action: PayloadAction<TokenLoginPayload>) => {
      state.isLoginViaToken = true;
    },
    tokenLoginSuccess: (state) => {
      state.isLoginViaToken = false;
    },
    tokenLoginFailure: (state) => {
      state.isLoginViaToken = false;
      state.currentUser = null;
      state.isAuthenticated = false;
    },
    userRegisterStart: (state, action: PayloadAction<RegisterPayload>) => {
      state.isLoading = true;
      state.isAuthenticated = false;
    },
    userRegisterSuccess: (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
    },
    userRegisterFailure: (state, action: PayloadAction<AuthError>) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.currentUser = null;
      state.error = action.payload;
    },
    userLogout: (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.currentUser = null;
      state.error = null;
    },
    resendVerificationEmailStart: (
      state,
      action: PayloadAction<ResendVerfiyEmail>
    ) => {
      state.isLoading = true;
      state.isAuthenticated = false;
    },
    resendVerificationEmailSuccess: (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
    },
    resendVerificationEmailFailure: (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
    },
    userSubscribeSuccess: (state, action: PayloadAction<boolean>) => {
      state.isSubscribed = action.payload;
    },
    passwordResetRequestStart: (
      state,
      action: PayloadAction<PasswordResetRequestPayload>
    ) => {
      state.isRequestingPasswordReset = true;
    },
    passwordResetRequestSuccess: (state) => {
      state.isRequestingPasswordReset = false;
    },
    passwordResetRequestFailure: (state, action: PayloadAction<AuthError>) => {
      state.isRequestingPasswordReset = false;
      state.error = action.payload;
    },
    passwordResetStart: (
      state,
      action: PayloadAction<PasswordResetPayload>
    ) => {
      state.isResetingPassword = true;
    },
    passwordResetSuccess: (state) => {
      state.isResetingPassword = false;
    },
    passwordResetFailure: (state, action: PayloadAction<AuthError>) => {
      state.isResetingPassword = false;
      state.error = action.payload;
    },
    confirmEmailStart: (state, action: PayloadAction<ConfirmEmailPayload>) => {
      state.isConfirmingEmail = true;
    },
    confirmEmailSuccess: (state) => {
      state.isConfirmingEmail = false;
    },
    confirmEmailFailure: (state) => {
      state.isConfirmingEmail = false;
    },
    showSessionExpiryMessage: (state) => {
      state.isSessionExpired = true;
    },
    hideSessionExpiryMessage: (state) => {
      state.isSessionExpired = false;
    },
  },
});

export const {
  userLoginStart,
  userLoginSuccess,
  userLoginFailure,
  googleAuthorizeFailure,
  googleAuthorizeStart,
  googleAuthorizeSuccess,
  tokenLoginFailure,
  tokenLoginSuccess,
  tokenLoginStart,
  userRegisterStart,
  userRegisterSuccess,
  userRegisterFailure,
  userLogout,
  resendVerificationEmailStart,
  resendVerificationEmailSuccess,
  resendVerificationEmailFailure,
  userSubscribeSuccess,
  passwordResetRequestStart,
  passwordResetRequestSuccess,
  passwordResetRequestFailure,
  passwordResetStart,
  passwordResetSuccess,
  passwordResetFailure,
  confirmEmailFailure,
  confirmEmailStart,
  confirmEmailSuccess,
  showSessionExpiryMessage,
  hideSessionExpiryMessage,
  setNeedsVerification,
} = authSlice.actions;

const authReducer = authSlice.reducer;

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: [
    'currentUser',
    'isAuthenticated',
    'isSubscribed',
    'isSessionExpired',
  ],
};
export default persistReducer(persistConfig, authReducer);
