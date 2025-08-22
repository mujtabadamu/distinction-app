import { useEffect } from 'react';
import { Box, Spacer, Button, Text, PageTitle } from '@flexisaf/flexibull2';
import styled from 'styled-components';
import QuickLinks from './components/QuickLinks';
import PracticeSummary from './PerformanceSummary';
import Theme from 'utils/theme';
import { formatTime, thousandFormatter } from 'utils/helpers';
import useStatistic from './hooks/useStatistic';
import EmptyState from 'components/emptyState/emptyState';
import FolderIcon from 'assets/images/folder.svg';
import usePracticeHistory from './hooks';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import AdSense from 'adsense/AdSense';
import { HORIZONTAL_ADS } from 'adsense/adsConfig';
import useSubscriptionBilling from 'pages/profile/hooks/useSubscriptionBilling';
import OverallPerformance from './OverallPerformance';
import TourManager from 'components/onboarding/TourManager';
import StreakTracker from 'pages/points/components/StreakTracker';
import { ExpandableCard } from './components/expandableCard';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import UserEmptyState from 'assets/images/ImageEmptyState.svg';
import useStreak from 'pages/points/hooks/useStreak';
import { useUserProfile } from 'pages/auth/userProfileSlice';
import { useAuthSlice } from 'pages/auth/authSlice';
import {
  useEnhancedGetTotalPointsQuery,
  useEnhancedGetActiveQuizathonQuery,
} from 'store/enhancedApi';
import NotificationCard from './components/NotificationCard';
import UpcomingEventCard from './components/UpComingEventCard';

const StudentDashboard = () => {
  const { user: authUser } = useAuthSlice();
  const user = authUser?.user;
  const { profile: profileData } = useUserProfile();
  const navigate = useNavigate();

  // Use RTK Query for total points
  const { data: totalPoints, isLoading: isLoadingPoints } =
    useEnhancedGetTotalPointsQuery(
      { userId: user?.id || '' },
      { skip: !user?.id }
    );

  // Quizathon data for notifications
  const { data: activeQuizathon, isLoading: isLoadingActiveQuizathon } =
    useEnhancedGetActiveQuizathonQuery();
  const { streakStats } = useStreak();
  const {
    getScoreStats,
    scoreStats,
    isLoadingScoreStats,
    getTimeStats,
    timeStats,
  } = useStatistic({}); // Pass empty object to get all time stats
  const { getPracticeCourse, loadingGroupedCourse, coursePractice } =
    usePracticeHistory();
  const { activePlan } = useSubscriptionBilling();

  const formatPracticeSummaryData = () => {
    if (!scoreStats) {
      return {
        chartData: [],
        totalScore: 0,
        averageScore: 0,
        stats: [],
      };
    }

    const correctAnswers = scoreStats.totalScore ?? 0;
    const totalQuestions = scoreStats.totalQuestions ?? 0;
    const incorrectAnswers = totalQuestions - correctAnswers;

    return {
      chartData: [
        {
          name: 'Correct',
          value: correctAnswers,
          color: Theme.Correct,
        },
        {
          name: 'Incorrect',
          value: incorrectAnswers,
          color: Theme.Incorrect,
        },
      ],
      totalScore: totalQuestions,
      averageScore:
        totalQuestions > 0
          ? Math.round((correctAnswers / totalQuestions) * 100)
          : 0,
      stats: [
        {
          value: thousandFormatter(correctAnswers ?? 0),
          label: 'Correct Questions',
        },
        {
          value: thousandFormatter(incorrectAnswers ?? 0),
          label: 'Incorrect Questions',
        },
      ],
    };
  };

  const formatOverallPerformanceData = () => {
    if (!scoreStats || !timeStats) {
      return {
        stats: [],
      };
    }

    const correctAnswers = scoreStats.totalScore ?? 0;
    const totalQuestions = scoreStats.totalQuestions ?? 0;
    const totalPracticeTime = timeStats.totalTime ?? 0;

    return {
      stats: [
        {
          value: thousandFormatter(totalQuestions ?? 0),
          label: 'Questions',
        },
        {
          value: `${Math.round(
            totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0
          )}%`,
          label: 'Accuracy',
        },
        {
          value: formatTime(totalPracticeTime ?? 0),
          label: 'Total Practice Time',
        },
      ],
    };
  };

  const practiceData = formatPracticeSummaryData();
  const performanceData = formatOverallPerformanceData();

  useEffect(() => {
    getScoreStats();
    getTimeStats();
    getPracticeCourse();
    // getActivePlan();
  }, []);

  const hasPracticeData = coursePractice && coursePractice?.length > 0;
  const currentStreak = streakStats?.currentStreak ?? 0;

  return (
    <Box pad="1rem 1.5rem">
      <PageTitle>Dashboard</PageTitle>

      <WelcomeSection>
        <UserInfoContainer>
          <ProfileImageContainer>
            <ProfileImage
              src={profileData?.profileImage ?? UserEmptyState}
              alt="user_profile"
              className=" block md:hidden"
            />
          </ProfileImageContainer>
          <UserTextContainer>
            <Text block size="1.2rem">
              Welcome back,
            </Text>
            <WelcomeText size="1.2rem" bold>
              {user?.firstName}
              {profileData?.isNinVerified && (
                <VerifiedBadge>
                  <RiVerifiedBadgeFill size={16} color={Theme.PrimaryBlue} />
                </VerifiedBadge>
              )}
            </WelcomeText>
          </UserTextContainer>
        </UserInfoContainer>

        {isLoadingPoints ? (
          <Skeleton width={60} height={30} style={{ borderRadius: '50px' }} />
        ) : (
          <PointContainer
            onClick={() => navigate('/points')}
            data-tour="earn-more-points"
          >
            ⭐️
            <PointsText size="1rem" bold>
              <PointsValue>
                {thousandFormatter(totalPoints?.totalPoints ?? 0)}
              </PointsValue>
              <PointsLabel>Points</PointsLabel>
            </PointsText>
          </PointContainer>
        )}
      </WelcomeSection>

      <GridContainer>
        <MainContent>
          {currentStreak === 0 && (
            <NotificationBanner>
              <BellIcon>🔔</BellIcon> Start your learning journey today! One
              session is all it takes to begin your streak
            </NotificationBanner>
          )}
          {currentStreak > 0 && currentStreak < 3 && (
            <NotificationBanner>
              <BellIcon>🔔</BellIcon> Great start! Keep your streak alive, one
              session today is all it takes
            </NotificationBanner>
          )}
          {currentStreak >= 3 && currentStreak < 7 && (
            <NotificationBanner>
              <BellIcon>🔥</BellIcon> Amazing progress You're on a{' '}
              {currentStreak}-day streak. Keep it going
            </NotificationBanner>
          )}
          {currentStreak >= 7 && (
            <NotificationBanner>
              <BellIcon>🏆</BellIcon> Incredible! You've maintained a{' '}
              {currentStreak}-day streak. You're unstoppable
            </NotificationBanner>
          )}

          {/* Quizathon Notification Card */}
          <NotificationCard
            quizathon={activeQuizathon}
            isLoadingActiveQuizathon={isLoadingActiveQuizathon}
          />

          <Box
            background="white"
            pad="24px"
            style={{ border: '1px solid #E4E4E4', borderRadius: '8px' }}
          >
            <Text size="1.25rem" bold block>
              Learning Streak
            </Text>
            <Spacer space={5} />

            <Text block>
              Every day counts! See how far you've come this week
            </Text>
            <Spacer space={15} />

            <StreakTracker onClick={() => navigate('/points')} showInfo />
          </Box>

          <Spacer space={20} />

          <Box
            background="white"
            pad="15px 24px"
            style={{
              border: '1px solid #E4E4E4',
              borderRadius: '8px',
              margin: '10px 0px',
            }}
          >
            <QuickLinksDescription>
              <Text size="1.25rem" bold>
                Boost Your Learning
              </Text>
              <Spacer space={6} />
              <Text>
                Choose how you want to learn today, every step counts.
              </Text>
              <Spacer space={12} />
            </QuickLinksDescription>
            <QuickLinks />
          </Box>
          <Spacer space={20} />

          {activePlan?.subscriptionPackage?.code === 'BASIC_PLAN' && (
            <Box pad="1rem 0">
              <AdSense adSlotType={HORIZONTAL_ADS} />
            </Box>
          )}
          <Spacer space={10} />
          {hasPracticeData ? (
            isLoadingScoreStats ? (
              <Skeleton height={300} style={{ minWidth: '300px' }} />
            ) : (
              <Box
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '20px',
                  padding: '15px 20px',
                  border: '1px solid #EDEDED',
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                }}
              >
                <Box
                  style={{
                    flex: '1 1 45%',
                    minWidth: '300px',
                  }}
                >
                  <OverallPerformance stats={performanceData?.stats} />
                </Box>

                <Box
                  style={{
                    flex: '1 1 45%',
                    minWidth: '300px',
                  }}
                >
                  <Text size="1.25rem" bold>
                    Practice Summary
                  </Text>
                  <Spacer space={5} />
                  <PracticeSummary
                    chartData={practiceData?.chartData}
                    totalScore={practiceData?.totalScore}
                    averageScore={practiceData?.averageScore}
                    stats={practiceData?.stats}
                  />
                </Box>
              </Box>
            )
          ) : (
            <Box pad="2rem 0">
              <EmptyState
                image={<img src={FolderIcon} alt="folder_icon" />}
                title="No Activity Found"
                description="Click on start practice button to begin practicing and earn points."
                action={
                  <Button onClick={() => navigate('/practice')}>
                    Start Practice
                  </Button>
                }
              />
            </Box>
          )}
        </MainContent>

        <Sidebar>
          {hasPracticeData && (
            <Box
              background="white"
              pad="15px 24px"
              style={{
                border: '1px solid #E4E4E4',
                borderRadius: '8px',
                marginTop: '20px',
              }}
            >
              <Text size="1.25rem" bold>
                Recent Practice
              </Text>
              {loadingGroupedCourse ? (
                <Skeleton height={300} />
              ) : (
                <Box>
                  {coursePractice?.slice(0, 3).map((practice, index) => {
                    const practiceAttempts = practice.practiceCount;
                    const practiceAccuracy =
                      practice?.totalScore &&
                      practice?.totalQuestion &&
                      (
                        (practice.totalScore / practice.totalQuestion) *
                        100
                      ).toFixed(2);
                    return (
                      <ExpandableCard
                        key={index}
                        title={practice?.paperName ?? ''}
                        value={`${practiceAccuracy}%`}
                        description={`${practiceAttempts} attempts`}
                        onClick={() =>
                          navigate(
                            `/course-practice-history/${practice.paperId}`,
                            {
                              state: {
                                practiceAccuracy,
                                practiceAttempts,
                              },
                            }
                          )
                        }
                      />
                    );
                  })}
                </Box>
              )}
            </Box>
          )}

          {/* Upcoming Events Card */}
          <Box
            style={{
              marginTop: '20px',
            }}
          >
            <UpcomingEventCard
              events={activeQuizathon}
              isLoadingEvents={isLoadingActiveQuizathon}
            />
          </Box>
        </Sidebar>
      </GridContainer>
      <TourManager />
    </Box>
  );
};

export default StudentDashboard;

// Styled Components
const WelcomeSection = styled.div`
  background: #fff;
  padding: 10px 15px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  @media (max-width: 767px) {
    padding: 8px 12px;
    gap: 8px;
  }
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 767px) {
    gap: 6px;
  }
`;

const ProfileImageContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;

  @media (max-width: 767px) {
    width: 40px;
    height: 40px;
  }
`;

const UserTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const WelcomeText = styled(Text)`
  display: flex !important;
  align-items: center !important;

  @media (max-width: 767px) {
    font-size: 1rem !important;
  }
`;

const VerifiedBadge = styled.span`
  margin-left: 4px;

  @media (max-width: 767px) {
    margin-left: 2px;

    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

const PointContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  background: #353593;
  min-width: 100px;
  max-width: fit-content;
  height: 30px;
  border-radius: 50px;
  padding: 10px;
  color: #fff;
  cursor: pointer;

  @media (max-width: 767px) {
    min-width: 80px;
    height: 26px;
    padding: 8px;
    gap: 4px;

    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

const PointsText = styled(Text)`
  display: flex;
  align-items: center;
  gap: 4px;

  @media (max-width: 767px) {
    font-size: 0.875rem !important;
    gap: 3px;
  }
`;

const PointsValue = styled.span`
  font-weight: 500;
`;

const PointsLabel = styled.span`
  font-weight: 300;
`;

const NotificationBanner = styled.div`
  color: #000;
  background: #fff5e2;
  border: 1px solid #ffc24b;
  padding: 8px;
  margin: 20px 0px;
  line-height: 1.8;
  border-radius: 4px;
`;

const BellIcon = styled.span`
  display: inline-block;
  animation: shake 2s ease-in-out;
  transform-origin: center center;
  animation-iteration-count: 2;

  @keyframes shake {
    0%,
    90%,
    100% {
      transform: rotate(0deg);
    }
    10%,
    30% {
      transform: rotate(-10deg);
    }
    20%,
    40% {
      transform: rotate(10deg);
    }
  }
`;
const QuickLinksDescription = styled.div`
  display: block;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-bottom: 70px;

  @media (min-width: 768px) {
    grid-template-columns: minmax(300px, 2fr) minmax(250px, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: minmax(400px, 2.2fr) minmax(300px, 1fr);
  }

  @media (min-width: 1280px) {
    grid-template-columns: minmax(500px, 2.5fr) minmax(350px, 1fr);
  }

  @media (min-width: 1440px) {
    grid-template-columns: minmax(600px, 2.8fr) minmax(400px, 1fr);
  }

  @media (min-width: 1680px) {
    grid-template-columns: minmax(700px, 3fr) minmax(450px, 1fr);
  }
`;

const MainContent = styled.div`
  min-width: 0;
`;

const Sidebar = styled.div`
  min-width: 0;

  @media (max-width: 767px) {
    order: 2;
  }
`;
