import { useState, useEffect } from 'react';
import { PublicUserProfileDTO, UserProfileNinRequest } from 'generated/index';
import { handleError } from 'utils/errorHandlers';
import { Notify } from '@flexisaf/flexibull2';
import { useAppDispatch } from '../../../store/store';
import { useUserProfile } from 'pages/auth/userProfileSlice';
import { setUserProfile } from 'pages/auth/userProfileSlice';
import { useAuthSlice } from 'pages/auth/authSlice';
import {
  useEnhancedGetUserProfileByStudentIdQuery,
  useEnhancedEditUserProfileMutation,
  useEnhancedEditUserProfileNinMutation,
  useEnhancedVerifyProfileNinMutation,
  useEnhancedGetPublicUserProfileQuery,
  useEnhancedTrackProfileShareEventMutation,
  useEnhancedTrackPublicProfileClickMutation,
} from 'store/enhancedApi';

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
  dateOfBirth: string;
  otherName?: string;
  bio?: string;
  formData?: {
    profileImage?: Blob;
  };
}

const useProfile = () => {
  const [isPublicProfileError, setIsPublicProfileError] =
    useState<boolean>(false);
  const [publicProfile, setPublicProfile] =
    useState<PublicUserProfileDTO | null>(null);
  const [currentStudentId, setCurrentStudentId] = useState<string>('');
  const [currentUsername, setCurrentUsername] = useState<string>('');
  const { profile: profileData } = useUserProfile();
  const { user: authUser } = useAuthSlice();
  const dispatch = useAppDispatch();

  // Enhanced API hooks
  const {
    data: userProfileData,
    isLoading: isLoadingProfile,
    refetch: refetchProfile,
  } = useEnhancedGetUserProfileByStudentIdQuery(currentStudentId, {
    skip: !currentStudentId, // Skip if no studentId
  });

  const [editProfileMutation, { isLoading: isEditingProfile }] =
    useEnhancedEditUserProfileMutation();
  const [editProfileNinMutation, { isLoading: isUpdatingNin }] =
    useEnhancedEditUserProfileNinMutation();
  const [verifyProfileNinMutation, { isLoading: isVerifyingNin }] =
    useEnhancedVerifyProfileNinMutation();
  const [trackProfileShareEventMutation] =
    useEnhancedTrackProfileShareEventMutation();
  const [trackPublicProfileClickMutation] =
    useEnhancedTrackPublicProfileClickMutation();

  const {
    data: publicProfileData,
    isLoading: isLoadingPublicProfile,
    refetch: refetchPublicProfile,
  } = useEnhancedGetPublicUserProfileQuery(currentUsername, {
    skip: !currentUsername, // Skip if no username
  });

  // Handle profile data updates
  useEffect(() => {
    if (userProfileData) {
      dispatch(setUserProfile(userProfileData));
    }
  }, [userProfileData, dispatch]);

  useEffect(() => {
    if (publicProfileData) {
      setPublicProfile(publicProfileData);
    }
  }, [publicProfileData]);

  // Automatically fetch profile data when component mounts
  useEffect(() => {
    const studentId = authUser?.user?.id;
    if (studentId && !currentStudentId) {
      setCurrentStudentId(studentId);
    }
  }, [authUser?.user?.id, currentStudentId]);

  const getProfileData = async (studentId: string) => {
    try {
      setCurrentStudentId(studentId);
      // The query will automatically run when currentStudentId is set
      // We'll handle the data in a useEffect
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const getPublicProfileData = async (username: string) => {
    try {
      setCurrentUsername(username);
      // The query will automatically run when currentUsername is set
      // We'll handle the data in a useEffect
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        setIsPublicProfileError(true);
      }
    }
  };

  const editProfile = async (payload: EditProfilePayload, cb: () => void) => {
    try {
      const response = await editProfileMutation(payload).unwrap();
      dispatch(setUserProfile(response));
      Notify('Profile Edited successfully', { status: 'success' });
      cb();
    } catch (error) {
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
      await trackProfileShareEventMutation(requestData).unwrap();
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
      await trackPublicProfileClickMutation({
        username: payload.username,
        requestBody: requestData,
      }).unwrap();
    } catch (error) {
      handleError(error);
    }
  };

  const updateNin = async (
    requestBody: UserProfileNinRequest,
    cb: () => void
  ) => {
    try {
      await editProfileNinMutation(requestBody).unwrap();
      cb();
    } catch (error) {
      handleError(error);
    }
  };

  const verifyNin = async (cb: () => void) => {
    try {
      const result = await verifyProfileNinMutation(undefined).unwrap();
      if (result.isSuccessful) {
        Notify(`Nin verified successfully`, { status: 'success' });
      } else {
        Notify(`${result.errorMessage}`, { status: 'error' });
      }
      cb();
    } catch (error) {
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
