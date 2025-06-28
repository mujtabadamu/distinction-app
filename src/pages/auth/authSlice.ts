// New auth slice for local state management
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfileDTO } from 'generated/index';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

interface AuthState {
  user: UserProfileDTO | null;
  isSessionExpired: boolean;
  needsVerification: boolean;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isSessionExpired: false,
  needsVerification: false,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'ds_current_user',
  initialState,
  reducers: {
    setUser: (
      state: AuthState,
      action: PayloadAction<Partial<UserProfileDTO>>
    ) => {
      if (!state.user) {
        state.user = action.payload as UserProfileDTO;
      } else {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    },
    setAuth: (
      state: AuthState,
      action: PayloadAction<{ user: UserProfileDTO }>
    ) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
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
  logout,
  setNeedsVerification,
  showSessionExpiryMessage,
  hideSessionExpiryMessage,
} = authSlice.actions;

export const useUserSlice = () =>
  useSelector((state: RootState) => state.currentUser?.user);

export default authSlice.reducer;
