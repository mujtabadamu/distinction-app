import React from 'react';
import styled from 'styled-components';
import { Text, FlexiPagination } from '@flexisaf/flexibull2';
import SectionLoader from 'components/custom/sectionLoader';
import StudyTrendChart from './StudyTrendChart';
import SessionOutcomeDonutChart from './SessionOutcomeDonutChart';
import Achievements from './Achievements';
import WeeklySummary from './WeeklySummary';
import StreakCard from './StreakCard';
import OverviewCards from './OverviewCards';
import SessionHistoryTable from './SessionHistoryTable';
import { useFlashcardDashboard } from 'pages/myLibrary/components/FlashcardDashboard/hooks/useFlashcardDashboard';

const SessionHistoryHeader = styled.div`
  margin-bottom: 32px;
`;

const FlashcardDashboard: React.FC = () => {
  const {
    // Data
    overview,
    trends,
    outcomes,
    achievements,
    weeklySummary,
    streak,
    sessionHistory,
    totalSessionsCount,

    // Loading states
    loading,
    sessionHistoryLoading,

    // Error states
    error,

    // Pagination
    limit,
    setLimit,
    page,
    setPage,
    pageOptions,
    setOffset,
  } = useFlashcardDashboard();

  // Map trends data for the chart
  const mappedTrends = (trends || []).map((item: any) => ({
    date: item.date,
    sessions: item.sessionsCount,
    cardsStudied: item.cardsStudied,
    timeSpent: Math.round(item.timeSpentSeconds / 60),
  }));

  // Map session outcomes data for the donut chart
  const sessionOutcomeColors = {
    COMPLETED: '#2EC4B6', // Teal
    ABANDONED: '#E94F8A', // Pink
    PAUSED: '#FFCB66', // Yellow
    ACTIVE: '#7B61FF', // Purple
  };

  // Create fallback outcomes data from overview if API endpoint doesn't exist
  const createFallbackOutcomes = (overviewData: any) => {
    if (!overviewData) return [];

    const totalSessions = overviewData.totalSessions || 0;
    const completedSessions = overviewData.completedSessions || 0;
    const abandonedSessions = totalSessions - completedSessions;

    const outcomes = [];

    if (completedSessions > 0) {
      outcomes.push({
        name: 'Completed',
        value: completedSessions,
        color: sessionOutcomeColors.COMPLETED,
      });
    }

    if (abandonedSessions > 0) {
      outcomes.push({
        name: 'Abandoned',
        value: abandonedSessions,
        color: sessionOutcomeColors.ABANDONED,
      });
    }

    return outcomes;
  };

  // Convert SessionOutcomes object to array format for the chart
  const convertOutcomesToArray = (outcomesData: any) => {
    if (!outcomesData) return [];

    const outcomes = [];

    if (outcomesData.completedSessions && outcomesData.completedSessions > 0) {
      outcomes.push({
        name: 'Completed',
        value: outcomesData.completedSessions,
        color: sessionOutcomeColors.COMPLETED,
      });
    }

    if (outcomesData.pausedSessions && outcomesData.pausedSessions > 0) {
      outcomes.push({
        name: 'Paused',
        value: outcomesData.pausedSessions,
        color: sessionOutcomeColors.PAUSED,
      });
    }

    if (outcomesData.abandonedSessions && outcomesData.abandonedSessions > 0) {
      outcomes.push({
        name: 'Abandoned',
        value: outcomesData.abandonedSessions,
        color: sessionOutcomeColors.ABANDONED,
      });
    }

    return outcomes;
  };

  const mappedOutcomes = outcomes
    ? convertOutcomesToArray(outcomes)
    : createFallbackOutcomes(overview);

  // Create fallback achievements data if API endpoint doesn't exist
  const createFallbackAchievements = (overviewData: any) => {
    if (!overviewData) return [];

    const totalSessions = overviewData.totalSessions || 0;
    const completedSessions = overviewData.completedSessions || 0;
    const totalCardsStudied = overviewData.totalCardsStudied || 0;
    const totalTimeSpentHours =
      (overviewData.totalTimeSpentSeconds || 0) / 3600;

    const achievements: Array<{
      id: string;
      title: string;
      description: string;
      icon: string;
      isUnlocked: boolean;
      category: 'study' | 'consistency' | 'mastery' | 'speed' | 'endurance';
      progress?: number;
      maxProgress?: number;
    }> = [];

    // Study achievements
    if (totalSessions >= 1) {
      achievements.push({
        id: 'first-session',
        title: 'First Steps',
        description: 'Complete your first flashcard session',
        icon: '🎯',
        isUnlocked: true,
        category: 'study',
      });
    }

    if (totalSessions >= 5) {
      achievements.push({
        id: 'five-sessions',
        title: 'Getting Started',
        description: 'Complete 5 flashcard sessions',
        icon: '📚',
        isUnlocked: true,
        category: 'study',
      });
    } else {
      achievements.push({
        id: 'five-sessions',
        title: 'Getting Started',
        description: 'Complete 5 flashcard sessions',
        icon: '📚',
        isUnlocked: false,
        progress: totalSessions,
        maxProgress: 5,
        category: 'study',
      });
    }

    // Consistency achievements
    if (completedSessions >= 3) {
      achievements.push({
        id: 'consistent-learner',
        title: 'Consistent Learner',
        description: 'Complete 3 sessions without abandoning',
        icon: '🔥',
        isUnlocked: true,
        category: 'consistency',
      });
    } else {
      achievements.push({
        id: 'consistent-learner',
        title: 'Consistent Learner',
        description: 'Complete 3 sessions without abandoning',
        icon: '🔥',
        isUnlocked: false,
        progress: completedSessions,
        maxProgress: 3,
        category: 'consistency',
      });
    }

    // Mastery achievements
    if (totalCardsStudied >= 50) {
      achievements.push({
        id: 'card-master',
        title: 'Card Master',
        description: 'Study 50 flashcard cards',
        icon: '🏆',
        isUnlocked: true,
        category: 'mastery',
      });
    } else {
      achievements.push({
        id: 'card-master',
        title: 'Card Master',
        description: 'Study 50 flashcard cards',
        icon: '🏆',
        isUnlocked: false,
        progress: totalCardsStudied,
        maxProgress: 50,
        category: 'mastery',
      });
    }

    // Endurance achievements
    if (totalTimeSpentHours >= 1) {
      achievements.push({
        id: 'hour-learner',
        title: 'Hour Learner',
        description: 'Spend 1 hour studying flashcards',
        icon: '💪',
        isUnlocked: true,
        category: 'endurance',
      });
    } else {
      achievements.push({
        id: 'hour-learner',
        title: 'Hour Learner',
        description: 'Spend 1 hour studying flashcards',
        icon: '💪',
        isUnlocked: false,
        progress: Math.round(totalTimeSpentHours * 60),
        maxProgress: 60,
        category: 'endurance',
      });
    }

    return achievements;
  };

  // Convert generated OverviewMetrics to component expected OverviewData format
  const convertOverview = (overviewData: any) => {
    if (!overviewData) return null;

    return {
      totalSessions: overviewData.totalSessions || 0,
      completedSessions: overviewData.completedSessions || 0,
      totalCardsStudied: overviewData.totalCardsStudied || 0,
      totalCardsCompleted: overviewData.totalCardsCompleted || 0,
      totalCardsSkipped: overviewData.totalCardsSkipped || 0,
      totalTimeSpentSeconds: overviewData.totalTimeSpentSeconds || 0,
      averageSessionDurationSeconds:
        overviewData.averageSessionDurationSeconds || 0,
      completionRate: overviewData.completionRate || 0,
      formattedTotalTime: overviewData.formattedTotalTime,
    };
  };

  // Convert generated Achievement type to component expected format with proper category types
  const convertAchievements = (achievementsData: any[]) => {
    if (!achievementsData || achievementsData.length === 0) {
      return createFallbackAchievements(overview);
    }

    return achievementsData.map((achievement) => {
      // Map achievement type to component category
      const mapTypeToCategory = (
        type: string
      ): 'study' | 'consistency' | 'mastery' | 'speed' | 'endurance' => {
        switch (type) {
          case 'FIRST_SESSION':
          case 'WEEKLY_GOAL':
            return 'study';
          case 'STREAK_3_DAYS':
          case 'STREAK_7_DAYS':
          case 'STREAK_30_DAYS':
          case 'CONSISTENT_LEARNER':
            return 'consistency';
          case 'COMPLETION_MASTER':
            return 'mastery';
          case 'TIME_DEDICATED':
            return 'endurance';
          default:
            return 'study';
        }
      };

      return {
        id: achievement.id || 'unknown',
        title: achievement.title || 'Unknown Achievement',
        description: achievement.description || '',
        icon: achievement.icon || '🏆',
        isUnlocked: achievement.unlocked || false,
        category: mapTypeToCategory(achievement.type || ''),
        progress: achievement.progress || 0,
        maxProgress: achievement.target || 1,
      };
    });
  };

  const convertedOverview = convertOverview(overview);
  const mappedAchievements = convertAchievements(achievements);
  // Create fallback weekly summary data if API endpoint doesn't exist
  const createFallbackWeeklySummary = (overviewData: any) => {
    if (!overviewData) return null;
    const totalSessions = overviewData.totalSessions || 0;
    const totalCardsStudied = overviewData.totalCardsStudied || 0;
    const totalTimeSpent = overviewData.totalTimeSpentSeconds || 0;
    const completionRate = overviewData.completionRate || 0;

    return {
      weeklySessions: totalSessions,
      weeklyCardsStudied: totalCardsStudied,
      weeklyTimeSpent: totalTimeSpent,
      weeklyCompletionRate: completionRate,
    };
  };

  // Create fallback streak data if API endpoint doesn't exist
  const createFallbackStreak = (overviewData: any) => {
    if (!overviewData) return null;

    const totalSessions = overviewData.totalSessions || 0;
    const currentStreak = Math.min(totalSessions, 7); // Simplified calculation
    const longestStreak = Math.max(currentStreak, 3);
    const lastStudyDate = new Date().toISOString(); // Today's date
    const streakGoal = 7; // Weekly goal

    return {
      currentStreak,
      longestStreak,
      lastStudyDate,
      streakGoal,
    };
  };

  // Convert generated StudyStreak to component expected format
  const convertStreak = (streakData: any) => {
    if (!streakData) {
      return createFallbackStreak(overview);
    }

    return {
      currentStreak: streakData.currentStreak || 0,
      longestStreak: streakData.longestStreak || 0,
      lastStudyDate: streakData.lastStudyDate || new Date().toISOString(),
      streakGoal: 7, // Default weekly goal
    };
  };

  // When using weeklySummaryData from the API, map totalTimeSpentSeconds to totalTimeSpentMinutes if needed
  const mapWeeklySummaryData = (data: any) => {
    if (!data) return null;
    return {
      ...data,
      totalTimeSpentMinutes:
        typeof data.totalTimeSpentMinutes === 'number'
          ? data.totalTimeSpentMinutes
          : Math.round((data.totalTimeSpentSeconds || 0) / 60),
      averageSessionDuration:
        typeof data.averageSessionDuration === 'number'
          ? data.averageSessionDuration
          : Math.round((data.averageSessionDurationSeconds || 0) / 60),
    };
  };

  const weeklySummaryStats = weeklySummary
    ? mapWeeklySummaryData(weeklySummary)
    : createFallbackWeeklySummary(overview);
  const streakStats = convertStreak(streak);

  return (
    <DashboardWrapper>
      {loading ? (
        <SectionLoader height="30vh" />
      ) : error ? (
        <ErrorWrapper>{error}</ErrorWrapper>
      ) : (
        <DashboardGrid>
          <OverviewCards overview={convertedOverview} />
          <StudyTrendChart data={mappedTrends} loading={false} />
          <ChartSummaryRow>
            <SessionOutcomeDonutChart data={mappedOutcomes} loading={false} />
            <WeeklySummary stats={weeklySummaryStats} loading={false} />
          </ChartSummaryRow>
          <StreakAchievementsRow>
            <StreakCard streak={streakStats} loading={false} />
            <Achievements achievements={mappedAchievements} loading={false} />
          </StreakAchievementsRow>
          <div style={{ marginTop: '40px', marginBottom: '20px' }}>
            <SessionHistoryHeader>
              <Text size="24px" bold>
                Session History
              </Text>
            </SessionHistoryHeader>
            <SessionHistoryTable
              sessions={sessionHistory}
              loading={sessionHistoryLoading}
            />
            {sessionHistory.length > 0 && (
              <FlexiPagination
                pageCounts={pageOptions}
                total={totalSessionsCount}
                pageSize={limit}
                onChange={(newPage: number) => {
                  setPage(newPage);
                  setOffset(newPage - 1);
                }}
                changePageSize={({ value }: { value: number }) =>
                  setLimit(value)
                }
                current={page}
                style={{ margin: '0' }}
              />
            )}
          </div>
        </DashboardGrid>
      )}
    </DashboardWrapper>
  );
};

export default FlashcardDashboard;

const DashboardWrapper = styled.div`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 5rem;
`;

const DashboardGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const ErrorWrapper = styled.div`
  color: #e94f8a;
  text-align: center;
  min-height: 120px;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StreakAchievementsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  width: 100%;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ChartSummaryRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  width: 100%;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;
