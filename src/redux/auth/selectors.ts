import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectAuth = (state: RootState) => state.auth;
const selectCurrentUserState = (state: RootState) => state.currentUser;

export const selectCurrentUserData = createSelector(
  [selectAuth, selectCurrentUserState],
  (auth, currentUser) => auth?.currentUser || currentUser?.user
);

// Backward compatibility alias
export const selectCurrentUser = selectCurrentUserData;

export const selectIsLoading = createSelector(
  [selectAuth],
  (auth) => auth.isLoading
);

export const selectNeedVerification = createSelector(
  [selectAuth, selectCurrentUserState],
  (auth, currentUser) =>
    auth?.needsVerification || currentUser?.needsVerification
);

export const selectIsAuthenticated = createSelector(
  [selectAuth, selectCurrentUserState],
  (auth, currentUser) => {
    // Check if user exists in either auth state
    const hasUser = !!(auth?.currentUser || currentUser?.user);
    const isAuthenticated =
      auth?.isAuthenticated || currentUser?.isAuthenticated || hasUser;
    return isAuthenticated;
  }
);

export const selectIsSubscribed = createSelector(
  [selectAuth],
  (auth) => auth.isSubscribed
);

export const selectIsRequestingPasswordReset = createSelector(
  [selectAuth],
  (auth) => auth.isRequestingPasswordReset
);

export const selectIsResetingPassword = createSelector(
  [selectAuth],
  (auth) => auth.isResetingPassword
);

export const selectUserPhone = createSelector(
  [selectAuth, selectCurrentUserState],
  (auth, currentUser) => {
    const user = auth?.currentUser || currentUser?.user;
    // Handle both old CurrentUser type (with contacts) and new UserProfileDTO type
    if (user && 'contacts' in user && user.contacts) {
      return user.contacts[1]?.contact;
    }
    return undefined;
  }
);

export const selectIsLoadingGoogleAuth = createSelector(
  [selectAuth],
  (auth) => auth.isLoadingGoogleAuth
);

export const selectRedirectUrl = createSelector(
  [selectAuth],
  (auth) => auth.redirectUrl
);

export const selectIsLoginViaToken = createSelector(
  [selectAuth],
  (auth) => auth.isLoginViaToken
);

export const selectIsSessionExpired = createSelector(
  [selectAuth, selectCurrentUserState],
  (auth, currentUser) => auth?.isSessionExpired || currentUser?.isSessionExpired
);
