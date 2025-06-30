// User profile slice for managing user profile data
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import type { UserProfileDto } from 'store/result';

interface UserProfileState {
  profile: UserProfileDto | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserProfileState = {
  profile: null,
  isLoading: false,
  error: null,
};

export const userProfileSlice = createSlice({
  name: 'ds_user_profile_v2',
  initialState,
  reducers: {
    setUserProfile: (
      state: UserProfileState,
      action: PayloadAction<UserProfileDto>
    ) => {
      state.profile = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    updateProfile: (
      state: UserProfileState,
      action: PayloadAction<Partial<UserProfileDto>>
    ) => {
      if (state.profile) {
        state.profile = {
          ...state.profile,
          ...action.payload,
        };
      }
    },
    setUserProfileLoading: (
      state: UserProfileState,
      action: PayloadAction<boolean>
    ) => {
      state.isLoading = action.payload;
    },
    setUserProfileError: (
      state: UserProfileState,
      action: PayloadAction<string | null>
    ) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearUserProfile: (state) => {
      state.profile = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  setUserProfile,
  updateProfile,
  setUserProfileLoading,
  setUserProfileError,
  clearUserProfile,
} = userProfileSlice.actions;

export const useUserProfile = () =>
  useSelector((state: RootState) => state.userProfile);

export default userProfileSlice.reducer;
