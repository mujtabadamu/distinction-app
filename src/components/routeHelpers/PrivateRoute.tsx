import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import useQuizathon from 'pages/quizathon/hooks/useQuizathon';
import { getLevelOptionsByCurriculum } from 'utils/constants';
import ProfileCompleteModal from 'pages/profile/ProfileCompleteModal';
import { useEffect } from 'react';
import useDisclosure from 'hooks/general/useDisclosure';

// import { selectIsAuthenticated } from '../../redux/auth/selectors';
// import { getLocalAccessToken, getLocalUser } from '../../utils/helpers';
import { useAuthSlice } from 'pages/auth/authSlice';
import { useUserProfile } from 'pages/auth/userProfileSlice';

interface Props {
  children: ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const { user: localUser, isAuthenticated } = useAuthSlice();
  const accessToken = localUser?.accessToken;
  // const isAuthenticated = useSelector(selectIsAuthenticated);
  // const accessToken = getLocalAccessToken();
  // const localUser = getLocalUser();
  const auth = !!(localUser && accessToken && isAuthenticated);
  console.log('private route', localUser, isAuthenticated);
  const { profile: profileData, isLoading } = useUserProfile();
  const { schoolList, getSchoolList, isLoadingSchools } = useQuizathon();
  const profileCompleteModalHandler = useDisclosure();

  const loading = isLoading || isLoadingSchools;

  useEffect(() => {
    // getSchoolList();
    // getProfileData(localUser?.user?.id ?? '');
  }, []);

  // Profile completeness logic (same as Profile.tsx)
  let isLevelValid = false;
  const schoolInfo = profileData?.schoolInformationView;
  if (schoolInfo && schoolInfo.level && schoolList?.items) {
    const institutionId = schoolInfo.school?.id;
    const selectedInstitution = schoolList.items.find(
      (s) => s.id === institutionId
    );
    const institutionCurriculum = selectedInstitution?.curriculum;
    const levelOptions = getLevelOptionsByCurriculum(
      institutionCurriculum || ''
    );
    isLevelValid = levelOptions.some((opt) => opt.value === schoolInfo.level);
  }

  const profileIncomplete =
    !profileData?.firstName ||
    !profileData?.lastName ||
    !profileData?.email ||
    !profileData?.dateOfBirth ||
    !profileData?.gender ||
    !profileData?.phoneNumber ||
    !schoolInfo ||
    !schoolInfo.school?.name ||
    !schoolInfo.department?.name ||
    !schoolInfo.level ||
    !isLevelValid ||
    !profileData?.stateOfOrigin ||
    !schoolInfo.matriculationNumber;

  useEffect(() => {
    if (auth && profileIncomplete) {
      profileCompleteModalHandler.onOpen();
    }
  }, [auth, profileIncomplete]);

  if (!auth) return <Navigate to="/login" />;

  return (
    <>
      {children}
      {!loading && profileData && profileIncomplete && (
        <ProfileCompleteModal
          isOpen={profileCompleteModalHandler.isOpen}
          onClose={() => {
            profileCompleteModalHandler.onClose();
            document.body.style.overflow = 'auto';
          }}
        />
      )}
    </>
  );
};

export default PrivateRoute;
