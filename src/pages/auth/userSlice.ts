import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfileDTO } from 'generated/index';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

interface AuthState {
  user: UserProfileDTO | null;
}

const initialState: AuthState = {
  user: null,
};

export const userSlice = createSlice({
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
  },
});

export const { setUser } = userSlice.actions;

export const useUserSlice = () =>
  useSelector((state: RootState) => state.currentUser?.user);

export default userSlice.reducer;
