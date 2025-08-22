// New auth slice for local state management
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { UserProfileDTO } from 'generated/index';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Login2ApiResponse } from 'store/result';

interface AuthState {
  user: Login2ApiResponse | null;
  accessToken: string | null;
  refreshToken: string | null;
  isSessionExpired: boolean;
  needsVerification: boolean;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isSessionExpired: false,
  needsVerification: false,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'ds_auth_user_v2',
  initialState,
  reducers: {
    setUser: (
      state: AuthState,
      action: PayloadAction<Partial<Login2ApiResponse>>
    ) => {
      if (!state.user) {
        state.user = action.payload as Login2ApiResponse;
      } else {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    },
    setAuth: (
      state: AuthState,
      action: PayloadAction<{ user: Login2ApiResponse }>
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.user.accessToken || null;
      state.refreshToken = action.payload.user.refreshToken || null;
      state.isAuthenticated = true;

      // Also update localStorage for backward compatibility
      if (typeof window !== 'undefined') {
        if (action.payload.user.accessToken) {
          localStorage.setItem(
            'ds_access_token',
            action.payload.user.accessToken
          );
        }
        if (action.payload.user.refreshToken) {
          localStorage.setItem(
            'ds_refresh_token',
            action.payload.user.refreshToken
          );
        }
      }
    },
    setTokens: (
      state: AuthState,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;

      // Also update localStorage for backward compatibility
      if (typeof window !== 'undefined') {
        localStorage.setItem('ds_access_token', action.payload.accessToken);
        localStorage.setItem('ds_refresh_token', action.payload.refreshToken);
      }
    },
    updateAccessToken: (
      state: AuthState,
      action: PayloadAction<{ accessToken: string }>
    ) => {
      state.accessToken = action.payload.accessToken;
      if (state.user) {
        state.user.accessToken = action.payload.accessToken;
      }

      // Also update localStorage for backward compatibility
      if (typeof window !== 'undefined') {
        localStorage.setItem('ds_access_token', action.payload.accessToken);
      }
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;

      // Also clear localStorage for backward compatibility
      if (typeof window !== 'undefined') {
        localStorage.removeItem('ds_access_token');
        localStorage.removeItem('ds_refresh_token');
        localStorage.removeItem('ds_user');
      }
    },
    setNeedsVerification: (state, action) => {
      state.needsVerification = action.payload;
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
  setUser,
  setAuth,
  setTokens,
  updateAccessToken,
  logout,
  setNeedsVerification,
  showSessionExpiryMessage,
  hideSessionExpiryMessage,
} = authSlice.actions;

export const useAuthSlice = () =>
  useSelector((state: RootState) => state.authReducer);

export default authSlice.reducer;
