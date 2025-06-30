import { useState } from 'react';
import { apiWrapper } from 'utils/http-client';
import {
  DistinctionProfileEventsService,
  DistinctionProfileService,
  PublicUserProfileDTO,
  UserProfileNinRequest,
} from 'generated/index';
import { handleError } from 'utils/errorHandlers';
import { Notify } from '@flexisaf/flexibull2';
// import { setUser, useUserSlice } from 'pages/auth/userSlice';
import { useDispatch } from 'react-redux';
import { useUserProfile } from 'pages/auth/userProfileSlice';
import { setUserProfile } from 'pages/auth/userProfileSlice';

interface EditProfilePayload {
  phoneNumber: string;
  firstName: string;
  lastName: string;
  gender: string;
  matriculationNumber: string;
  department: string;
  stateOfOrigin: string;
  schoolId: string;
  level: string;
  otherName?: string;
  nin: string;
  dateOfBirth: string;
  formData?: {
    profileImage?: Blob;
  };
}

const useProfile = () => {
  const [isLoadingProfile, setIsLoadingProfile] = useState<boolean>(false);
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
  const [isVerifyingNin, setIsVerifyingNin] = useState<boolean>(false);
  const [isUpdatingNin, setIsUpdatingNin] = useState<boolean>(false);
  const [isPublicProfileError, setIsPublicProfileError] =
    useState<boolean>(false);
  const [publicProfile, setPublicProfile] =
    useState<PublicUserProfileDTO | null>(null);
  const [isLoadingPublicProfile, setIsLoadingPublicProfile] =
    useState<boolean>(false);
  const { profile: profileData } = useUserProfile();
  const dispatch = useDispatch();

  const getProfileData = async (studentId: string) => {
    setIsLoadingProfile(true);
    try {
      const data = await apiWrapper(() =>
        DistinctionProfileService.getUserProfile({ studentId })
      );
      dispatch(setUserProfile(data));
      setIsLoadingProfile(false);
    } catch (error) {
      setIsLoadingProfile(false);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };
  const getPublicProfileData = async (username: string) => {
    setIsLoadingPublicProfile(true);
    try {
      const data = await apiWrapper(() =>
        DistinctionProfileService.getPublicUserProfile({ username })
      );
      setPublicProfile(data);
      setIsLoadingPublicProfile(false);
    } catch (error) {
      setIsLoadingPublicProfile(false);
      if (error instanceof Error) {
        console.error(error.message);
        setIsPublicProfileError(true);
      }
    }
  };

  const editProfile = async (payload: EditProfilePayload, cb: () => void) => {
    setIsEditingProfile(true);
    try {
      const response = await apiWrapper(() =>
        DistinctionProfileService.editUserProfile(payload)
      );
      dispatch(setUserProfile(response));
      Notify('Profile Edited successfully', { status: 'success' });
      cb();
      setIsEditingProfile(false);
    } catch (error) {
      setIsEditingProfile(false);
      handleError(error);
    }
  };
  const trackPublicProfileShare = async (payload: {
    sharedPlatform: string;
  }) => {
    const requestData = {
      sharePlatform: payload.sharedPlatform.toUpperCase() as
        | 'WHATSAPP'
        | 'TELEGRAM'
        | 'FACEBOOK'
        | 'LINKEDIN'
        | 'X'
        | 'INSTAGRAM'
        | 'COPY_LINK',
      deviceInfo: `${navigator.platform}`,
      eventType: 'PROFILE_SHARED' as const,
    };
    try {
      await apiWrapper(() =>
        DistinctionProfileEventsService.trackProfileShareEvent({
          requestBody: requestData,
        })
      );
    } catch (error) {
      handleError(error);
    }
  };
  const trackPublicProfileView = async (payload: {
    sharedPlatform: string;
    username: string;
  }) => {
    const requestData = {
      sharePlatform: payload.sharedPlatform.toUpperCase() as
        | 'WHATSAPP'
        | 'TELEGRAM'
        | 'FACEBOOK'
        | 'LINKEDIN'
        | 'X'
        | 'INSTAGRAM'
        | 'COPY_LINK',
      deviceInfo: `${navigator.platform}`,
      eventType: 'PROFILE_CLICKED' as const,
    };
    try {
      await apiWrapper(() =>
        DistinctionProfileEventsService.trackPublicProfileClick({
          requestBody: requestData,
          username: payload.username,
        })
      );
    } catch (error) {
      handleError(error);
    }
  };

  const updateNin = async (
    requestBody: UserProfileNinRequest,
    cb: () => void
  ) => {
    setIsUpdatingNin(true);
    try {
      await apiWrapper(() =>
        DistinctionProfileService.editUserProfileNin({ requestBody })
      );
      cb();
      setIsUpdatingNin(false);
    } catch (error) {
      setIsUpdatingNin(false);
      handleError(error);
    }
  };
  const verifyNin = async (cb: () => void) => {
    setIsVerifyingNin(true);
    try {
      const result = await apiWrapper(() =>
        DistinctionProfileService.verifyProfileNin()
      );
      if (result.isSuccessful) {
        Notify(`Nin verified successfully`, { status: 'success' });
      } else {
        Notify(`${result.errorMessage}`, { status: 'error' });
      }

      cb();
      setIsVerifyingNin(false);
    } catch (error) {
      setIsVerifyingNin(false);
      handleError(error);
    }
  };
  return {
    isLoadingProfile,
    profileData,
    getProfileData,
    isEditingProfile,
    editProfile,
    updateNin,
    isVerifyingNin,
    verifyNin,
    isUpdatingNin,
    getPublicProfileData,
    isLoadingPublicProfile,
    publicProfile,
    isPublicProfileError,
    trackPublicProfileShare,
    trackPublicProfileView,
  };
};

export default useProfile;
