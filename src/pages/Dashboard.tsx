import {
  Avatar,
  Box,
  DropDown,
  Grid,
  Layout,
  SideBarToogle,
  Text,
  Button,
} from '@flexisaf/flexibull2';
import { useEffect } from 'react';
import Media from 'react-media';
import { useAppDispatch } from '../store/store';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// import { userLogout } from '../redux/auth/reducer';
// import { selectCurrentUser } from '../redux/auth/selectors';
import Theme from '../utils/theme';
import {
  LogoBox,
  VerifyContainer,
  AvatarWrapper,
} from '../styles/dashboard/dashboard.styles';
import { Logo } from '../styles/landing/navBar.style';
import BottomNav, { INavItem } from '../components/bottomNav';
import useProfile from './profile/hooks/useProfile';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { IoChevronDownOutline } from 'react-icons/io5';
import useSubscriptionBilling from './profile/hooks/useSubscriptionBilling';
import { capitalizeFirstLetterOFEachWord, isEnvEqual } from 'utils/helpers';
import { Environment, LEVEL_OPTIONS } from 'utils/constants';
import StreakComponent from './learnerDashboard/components/StreakComponent';
// import useStreak from './points/hooks/useStreak';
// import useQuizathon from './quizathon/hooks/useQuizathon';
import ProfileCompleteModal from './profile/ProfileCompleteModal';
import useDisclosure from 'hooks/general/useDisclosure';
import usePaginationWrapper from 'hooks/general/usePaginationWrapper';
import {
  useEnhancedGetAllActiveQuizathonQuery,
  useEnhancedGetQuizathonHistoryQuery,
} from 'store/enhancedApi';
import { useUserProfile } from './auth/userProfileSlice';
import { logout, useAuthSlice } from './auth/authSlice';
//TODO clear unused imports, trace and remove redux selectors no longer needed
const StyledFragment = styled.div`
  @media print {
    display: none;
  }
`;

type ProfileMenuI = {
  key: string;
  text: string;
  iconClass: string;
  onClick: () => void;
  color: string;
};

const BottomMobileNavItems: INavItem[] = [
  {
    icon: 'saf-smart-home',
    name: 'home',
    label: 'Home',
    link: '/home',
  },
  {
    icon: '',
    name: 'Start',
    label: 'Start',
    link: '/home',
    isPrimaryAction: true,
  },
  {
    icon: 'saf-message',
    name: 'chatbot',
    label: 'AI Tutor',
    link: '/chatbot',
  },
];

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAuthSlice();
  const { profileData, getProfileData } = useProfile();
  const profileCompleteModalHandler = useDisclosure();
  const studentId = user?.user?.id ?? '';
  const validLevels = [
    ...LEVEL_OPTIONS.NUC.map((opt) => opt.value),
    ...LEVEL_OPTIONS.NBTE.map((opt) => opt.value),
    ...LEVEL_OPTIONS.NCCE.map((opt) => opt.value),
  ];

  // Check if profile is complete
  const isProfileComplete = Boolean(
    profileData?.firstName &&
      profileData?.lastName &&
      profileData?.gender &&
      profileData?.schoolInformationView?.level &&
      validLevels.includes(
        profileData.schoolInformationView.level.toString()
      ) &&
      profileData?.schoolInformationView?.department?.name &&
      profileData?.schoolInformationView?.matriculationNumber
  );

  useEffect(() => {
    if (studentId) {
      getProfileData(studentId);
    }
  }, [studentId]);

  // Show modal if profile is incomplete
  useEffect(() => {
    if (profileData && !isProfileComplete) {
      profileCompleteModalHandler.onOpen();
    }
  }, [isProfileComplete, profileData]);

  const {
    data: allActiveQuizathon,
    isLoading: isLoadingAllActiveQuizathon,
    // refetch: getAllActiveQuizathon,
  } = useEnhancedGetAllActiveQuizathonQuery();
  const {
    data: quizathonHistory,
    // isLoading: isLoadingQuizathonHistory,
    // refetch: getQuizathonHistory,
  } = useEnhancedGetQuizathonHistoryQuery({
    keyword: '',
    page: 0,
    size: 10,
  });

  const profileMenu: ProfileMenuI[] = [
    {
      key: 'profile',
      text: 'My Profile',
      iconClass: 'saf-profile-circle',
      onClick: () => navigate('/profile'),
      color: 'inherit',
    },
    {
      key: 'subscription',
      text: 'Subscription',
      iconClass: 'saf-empty-wallet',
      onClick: () => navigate('/profile', { state: { tab: 'subscription' } }),
      color: 'inherit',
    },

    {
      key: 'logout',
      text: 'Logout',
      iconClass: 'saf-logout',
      onClick: () => {
        dispatch(logout());
        navigate('/login');
      },
      color: Theme.PrimaryRed,
    },
  ];
  const lastQuizathonId =
    quizathonHistory?.items &&
    quizathonHistory.items[quizathonHistory.items.length - 1].id;

  const getQuizathonNavLink = () => {
    if (allActiveQuizathon && allActiveQuizathon?.length > 0) {
      if (allActiveQuizathon.length === 1) {
        return `/quizathon-profile/${allActiveQuizathon[0].id}`;
      }
      return '/quizathons';
    }

    if (lastQuizathonId) {
      return `/quizathon-profile/${lastQuizathonId}`;
    }

    return '/quizathons';
  };
  const getSideNavMenuItems = () => {
    const menuItems = [
      {
        name: 'dashboard',
        label: 'Dashboard',
        navlink: '/dashboard',
        icon: 'saf-smart-home',
      },

      {
        name: 'quizathon',
        label: 'Quizathon',
        navlink: getQuizathonNavLink(),
        icon: 'saf-medal-star',
      },
      {
        name: 'chatbot',
        label: 'Study Pal',
        navlink: '/chatbot',
        icon: 'saf-message',
      },
      {
        name: 'referrals',
        label: 'Referrals',
        navlink: '/referrals',
        icon: 'saf-people',
      },
      {
        name: 'library',
        label: 'My Library',
        navlink: '/my-library',
        icon: 'saf-book-1',
      },
      {
        name: 'courses',
        label: 'Courses',
        navlink: '/courses',
        disabled: !isEnvEqual(Environment.Development),
        icon: 'saf-book',
      },
    ];

    return menuItems.filter((item) => !item.disabled);
  };
  const { limit, page } = usePaginationWrapper({});

  const { activePlan } = useSubscriptionBilling();
  // const { getStreakStats } = useStreak();

  // useEffect(() => {
  //   // getActivePlan();
  //   // getStreakStats();
  //   getAllActiveQuizathon();
  //   getQuizathonHistory({
  //     studentId,
  //     page: page - 1,
  //     size: limit,
  //   });
  // }, []);

  return (
    <>
      <Layout
        theme={Theme}
        withSideNav
        withTopNav
        sideNavOpenWidth="240px"
        sideNavCloseWidth="80px"
        collapseIcon="saf-arrow-circle-left"
        expandIcon={
          window.innerWidth <= 480
            ? 'flexibull-menu-1'
            : 'saf-arrow-circle-right'
        }
        topNavProps={{
          background: 'transparent',
          elevate: 'none',
          scrollable: true,
          borderline: Theme.PrimaryBorderColor,
          style: {
            overflow: 'visible',
          },
        }}
        sideNavProps={{
          float: window.innerWidth <= 480 ? true : false,
          background: '#fff',
          brandHeight: '30px',
          borderline: Theme.PrimaryBorderColor,
          brand: (
            <SideBarToogle>
              <Box margin="0 0 0 4px">
                <LogoBox width="80%" backgroundColor="none">
                  <Logo />
                </LogoBox>
              </Box>
            </SideBarToogle>
          ),
          menuList: getSideNavMenuItems(),
        }}
        sideNavContent={
          <Box pad="12px" width="100%">
            <Button
              onClick={() => navigate('/new-practice')}
              style={{ width: '100%' }}
              // disabled={isQuizathonInProgress}
            >
              New Practice
            </Button>
          </Box>
        }
        topNavContent={
          <StyledFragment>
            <Media query="(max-width: 480px)">
              {(matches) => {
                return matches ? (
                  <Grid default="max-content">
                    <Box margin="0 20px 0 0" align="right">
                      <Box
                        display="flex"
                        style={{
                          alignItems: 'center',
                          cursor: 'pointer',
                          gap: '20px',
                        }}
                      >
                        {/* Disabled temporarily, pending when it's needed back */}
                        {/* <HeadwayWidget /> */}
                        {/* <StreakComponent bgColor="none" color="#6B7280" /> */}
                        {/* <Box
                          onClick={() =>
                            navigate('/profile', {
                              state: { tab: 'subscription' },
                            })
                          }
                          className="!p-[0.5rem] bg-[#F7960E1A] rounded-[50px]  w-[122px] mx-auto"
                        >
                          <Text className="text-[#333333] flex justify-center items-center text-center">
                            {capitalizeFirstLetterOFEachWord(
                              activePlan?.subscriptionPackage?.name ?? ''
                            )}
                          </Text>
                        </Box> */}
                        <DropDown
                          style={{ zIndex: 20, textAlign: 'left' }}
                          menuAlign="bottom right"
                          trigger="click"
                          width="150px"
                          label={
                            <Box
                              pad="0 10px"
                              display="flex"
                              style={{ alignItems: 'center' }}
                            >
                              <AvatarWrapper>
                                {/* visibility none on mobile */}
                                <div className="hidden md:block">
                                  <Avatar
                                    name={`${user?.user?.firstName} ${user?.user?.lastName}`}
                                    margin="0 10px"
                                    size="40px"
                                    src={profileData?.profileImage}
                                    round
                                  />
                                  {profileData?.isNinVerified && (
                                    <VerifyContainer>
                                      <RiVerifiedBadgeFill
                                        size={16}
                                        color={Theme.PrimaryBlue}
                                      />
                                    </VerifyContainer>
                                  )}
                                </div>
                              </AvatarWrapper>
                              <IoChevronDownOutline
                                size={16}
                                style={{ marginLeft: '-2px' }}
                              />
                            </Box>
                          }
                        >
                          {profileMenu.map(
                            ({ key, text, iconClass, onClick, color }) => (
                              <li
                                key={key}
                                style={{
                                  borderBottom: `1px solid ${Theme.PrimaryBorderColor}`,
                                }}
                                onClick={onClick}
                              >
                                <Text
                                  block
                                  size="12px"
                                  color={color}
                                  style={{
                                    padding: '3px 0',
                                    alignItems: 'center',
                                    display: 'flex',
                                  }}
                                >
                                  <i
                                    className={iconClass}
                                    style={{
                                      marginRight: '10px',
                                      fontSize: '20px',
                                    }}
                                  />
                                  {text}
                                </Text>
                              </li>
                            )
                          )}
                        </DropDown>
                      </Box>
                    </Box>
                  </Grid>
                ) : (
                  <Grid default="max-content">
                    <Box margin="auto 18px auto 0">
                      <Box
                        display="flex"
                        style={{
                          alignItems: 'center',
                          cursor: 'pointer',
                          gap: '20px',
                        }}
                      >
                        {/* <HeadwayWidget /> */}
                        {/* Subscription Plan Tag */}
                        <StreakComponent bgColor="none" color="#000000" />
                        <Box
                          onClick={() =>
                            navigate('/profile', {
                              state: { tab: 'subscription' },
                            })
                          }
                          className="!p-[0.5rem] bg-[#F7960E1A] rounded-[50px]  w-[122px] mx-auto"
                        >
                          <Text className="text-[#333333] flex justify-center items-center text-center">
                            {capitalizeFirstLetterOFEachWord(
                              activePlan?.subscriptionPackage?.name ?? ''
                            )}
                          </Text>
                        </Box>
                        <DropDown
                          style={{ zIndex: 10, textAlign: 'left' }}
                          title={
                            user &&
                            `${user.user?.firstName} ${user.user?.lastName}`
                          }
                          menuAlign="bottom right"
                          width="150px"
                          label={
                            <Box
                              pad="0 10px"
                              display="flex"
                              style={{ alignItems: 'center' }}
                            >
                              <Box margin="0 10px 0 0">
                                {/* visibility none on mobile */}
                                <div className="hidden md:block">
                                  <AvatarWrapper>
                                    <Avatar
                                      name={`${user?.user?.firstName} ${user?.user?.lastName}`}
                                      margin="0 10px"
                                      size="40px"
                                      src={profileData?.profileImage}
                                      round
                                    />
                                    {profileData?.isNinVerified && (
                                      <VerifyContainer>
                                        <RiVerifiedBadgeFill
                                          size={16}
                                          color={Theme.PrimaryBlue}
                                        />
                                      </VerifyContainer>
                                    )}
                                  </AvatarWrapper>
                                </div>
                              </Box>
                              <IoChevronDownOutline
                                size={16}
                                style={{ marginLeft: '-2px' }}
                              />
                            </Box>
                          }
                        >
                          {profileMenu.map(
                            ({ key, text, iconClass, onClick, color }) => (
                              <li
                                key={key}
                                style={{
                                  borderBottom: `1px solid ${Theme.PrimaryBorderColor}`,
                                }}
                                onClick={onClick}
                              >
                                <Text
                                  block
                                  size="12px"
                                  color={color}
                                  style={{
                                    padding: '3px 0',
                                    alignItems: 'center',
                                    display: 'flex',
                                  }}
                                >
                                  <i
                                    className={iconClass}
                                    style={{
                                      marginRight: '10px',
                                      fontSize: '20px',
                                    }}
                                  />
                                  {text}
                                </Text>
                              </li>
                            )
                          )}
                        </DropDown>
                      </Box>
                    </Box>
                  </Grid>
                );
              }}
            </Media>
          </StyledFragment>
        }
      >
        <Box pad="100px 0 0 0">
          <Outlet />
          {profileCompleteModalHandler.isOpen && (
            <ProfileCompleteModal
              isOpen={profileCompleteModalHandler.isOpen}
              onClose={() => {
                profileCompleteModalHandler.onClose();
                document.body.style.overflow = 'auto';
              }}
            />
          )}
          {/* Disable till simultaneous registration is implemented */}
          {/* <QuizathonPopUp /> */}
        </Box>

        <Media query="(max-width: 480px)">
          {(matches) => {
            return matches ? (
              <BottomNav navItems={BottomMobileNavItems} disabled={false} />
            ) : null;
          }}
        </Media>
      </Layout>
    </>
  );
};

export default Dashboard;
