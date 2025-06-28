import { useEffect } from 'react';
import {
  Grid,
  Box,
  Spacer,
  Button,
  Text,
  Table,
  PageTitle,
} from '@flexisaf/flexibull2';
import styled from 'styled-components';
import { TbCoins } from 'react-icons/tb';
import QuickLinks from './components/QuickLinks';
import PracticeSummary from './PerformanceSummary';
import Theme from 'utils/theme';
import PracticeActivityChart from './PracticeActivityChart';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from 'redux/auth/selectors';
import usePointAccumulation from '../points/hooks/usePointAccumulation';
import { formatTime, thousandFormatter } from 'utils/helpers';
import useStatistic from './hooks/useStatistic';
import { TableWrapper } from 'pages/referrals';
import EmptyState from 'components/emptyState/emptyState';
import FolderIcon from 'assets/images/folder.svg';
import usePracticeHistory from './hooks';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import AdSense from 'adsense/AdSense';
import { HORIZONTAL_ADS } from 'adsense/adsConfig';
import useSubscriptionBilling from 'pages/profile/hooks/useSubscriptionBilling';
import StreakComponent from './components/StreakComponent';
import OverallPerformance from './OverallPerformance';
import TourManager from 'components/onboarding/TourManager';

const StudentDashboard = () => {
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const { getTotalPoints, totalPoints, isLoadingPoints } =
    usePointAccumulation();
  const {
    getScoreStats,
    scoreStats,
    isLoadingScoreStats,
    getTimeStats,
    timeStats,
  } = useStatistic();
  const { getPracticeCourse, loadingGroupedCourse, coursePractice } =
    usePracticeHistory();
  const { activePlan, getActivePlan } = useSubscriptionBilling();

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
    getTotalPoints(user?.id ?? '');
    getScoreStats();
    getTimeStats();
    getPracticeCourse();
    getActivePlan();
  }, []);

  const hasPracticeData = coursePractice && coursePractice?.length > 0;

  return (
    <Box pad="1.5rem">
      <PageTitle>Dashboard</PageTitle>
      <StreakComponent />
      <Spacer space={12} />
      <Grid default="auto max-content" style={{ alignItems: 'center' }}>
        <Box>
          <Text size="1.75rem" bold className="welcome-text">
            Welcome back, {user?.firstName}
          </Text>
          <Spacer />
          <Text>It's a good day to practice, and earn points</Text>
        </Box>
        {isLoadingPoints ? (
          <Skeleton height={80} width={200} />
        ) : (
          <PointsSection>
            <Box>
              <TbCoins color="#FF9F29" size={32} />
            </Box>
            <Spacer space={12} />
            <Box
              display="flex"
              style={{
                gap: '24px',
                justifyContent: 'space-between',
                minWidth: '300px',
              }}
            >
              <Box>
                <Text size="1.5rem" bold>
                  {thousandFormatter(totalPoints?.totalPoints ?? 0)}
                </Text>
                <Text style={{ fontWeight: '600' }} size="1.0rem">
                  pts{' '}
                </Text>
              </Box>
              <Button
                onClick={() => navigate('/points')}
                data-tour="earn-more-points"
              >
                Earn More Points
              </Button>
            </Box>
          </PointsSection>
        )}
      </Grid>
      <Spacer space={32} />
      <QuickLinksDescription>
        <Text size="1.25rem" bold>
          Quick Links
        </Text>
        <Spacer space={6} />
        <Text>Click the links below to explore distinction features</Text>
        <Spacer space={12} />
      </QuickLinksDescription>
      <QuickLinks />
      {activePlan?.subscriptionPackage?.code === 'BASIC_PLAN' && (
        <Box pad="1rem 0">
          <AdSense adSlotType={HORIZONTAL_ADS} />
        </Box>
      )}
      {hasPracticeData ? (
        <>
          <Grid default="max-content auto" style={{ alignItems: 'start' }}>
            <Box
              pad="1rem"
              style={{ border: '1px solid #EDEDED', borderRadius: '8px' }}
            >
              <Spacer space={5} />
              {isLoadingScoreStats ? (
                <Skeleton height={300} style={{ minWidth: '300px' }} />
              ) : (
                <>
                  <OverallPerformance stats={performanceData?.stats} />
                  <Spacer space={20} />
                  <Text size="1.5rem" bold>
                    Practice Summary
                  </Text>
                  <Spacer space={5} />
                  <PracticeSummary
                    chartData={practiceData?.chartData}
                    totalScore={practiceData?.totalScore}
                    averageScore={practiceData?.averageScore}
                    stats={practiceData?.stats}
                  />
                </>
              )}
            </Box>
            <Box className="h-full">
              <PracticeActivityChart />
            </Box>
          </Grid>
          <Spacer space={12} />
          <Text size="1.5rem" bold>
            Practice History
          </Text>
          {loadingGroupedCourse ? (
            <Skeleton height={300} />
          ) : (
            <TableWrapper style={{ maxHeight: '540px', overflowY: 'scroll' }}>
              <Table style={{ overflowX: 'auto' }}>
                <table>
                  <thead>
                    <tr>
                      <th>S/N</th>
                      <th>Course</th>
                      <th>Accuracy</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coursePractice?.map((practice, index) => {
                      const practiceAttempts = practice.practiceCount;
                      const practiceAccuracy =
                        practice?.totalScore &&
                        practice?.totalQuestion &&
                        (
                          (practice.totalScore / practice.totalQuestion) *
                          100
                        ).toFixed(2);
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{practice.paperName}</td>
                          <td>{practiceAccuracy}%</td>
                          <td>
                            <Button
                              pale
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
                            >
                              View{' '}
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Table>
            </TableWrapper>
          )}
        </>
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
      <TourManager />
    </Box>
  );
};

export default StudentDashboard;

const PointsSection = styled.div`
  background: #fff;
  padding: 12px;
  border-radius: 8px;
  text-align: right;
`;

const QuickLinksDescription = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;
