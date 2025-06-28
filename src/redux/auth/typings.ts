interface Contact {
  contact: string;
  contactType: string;
}

export interface AuthError {
  message: string;
}

export interface AuthState {
  isLoading: boolean;
  isLoadingGoogleAuth: boolean;
  isLoginViaToken: boolean;
  redirectUrl: null | string;
  isAuthenticated: boolean;
  error: AuthError | null;
  currentUser: CurrentUser | null;
  isRequestingPasswordReset: boolean;
  isResetingPassword: boolean;
  isSubscribed: boolean;
  isConfirmingEmail: boolean;
  isSessionExpired: boolean;
  needsVerification: boolean;
}

export interface CurrentUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  otherName?: string | null;
  organisation: string;
  verified: boolean;
  blocked: boolean;
  createdAt: Date | null;
  contacts: Contact[];
}

// Login
export interface LoginPayload {
  username: string;
  password: string;
  cb?: (userDetails?: LoginSuccessPayload) => void;
}

export interface LoginSuccessPayload {
  accessToken: string;
  refreshToken: string;
  user: CurrentUser;
}

export interface ErrorLoginPayload {
  code: number;
  error: string;
}

// Register

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  password: string;
  phone: string;
  referralCode: string;
  captcha: string;
  cb?: (userDetails: RegisterSuccessPayload) => void;
}

export interface RegisterSuccessPayload {
  id: string;
  firstName: string;
  lastName: string;
}

export interface ErrorRegisterPayload {
  code: number;
  error: string;
}

// Google

export interface GoogleAuthorizePayload {
  callbackUrl: string;
  onSuccess?: () => void;
  onFailure?: () => void;
}
export type GoogleAuthorizeSuccess = string;

export interface TokenLoginPayload {
  token: string;
  onSuccess?: () => void;
  onFailure?: () => void;
}

// Confirm Email
export interface ConfirmEmailPayload {
  data: {
    platform: string;
    userId: string;
    token: string;
  };
  onSuccess?: () => void;
  onFailure?: () => void;
}

// Verify
export interface ResendVerfiyEmail {
  username: string;
  onSuccess?: () => void;
}

export interface ResendVerifyEmailSuccess {
  data: object;
}

// Password Reset
export interface PasswordResetRequestPayload {
  email: string;
  onSuccess?: () => void;
  onFailure?: () => void;
}

export interface PasswordResetPayload {
  data: {
    userId: string;
    token: string;
    password: string;
  };
  onSuccess?: () => void;
  onFailure?: () => void;
}
