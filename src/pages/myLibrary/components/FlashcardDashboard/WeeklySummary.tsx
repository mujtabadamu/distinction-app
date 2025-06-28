import React from 'react';
import styled from 'styled-components';
import { Text } from '@flexisaf/flexibull2';

interface WeeklyStats {
  totalSessions: number;
  totalCardsStudied: number;
  totalTimeSpentMinutes: number;
  averageSessionDuration: number;
  completionRate: number;
  mostActiveDay?: string;
  longestStreak: number;
  currentStreak: number;
}

interface WeeklySummaryProps {
  stats: WeeklyStats | null;
  loading?: boolean;
}

const WeeklySummary: React.FC<WeeklySummaryProps> = ({ stats, loading = false }) => {
  if (loading) {
    return (
      <Container>
        <Text size="18px" bold style={{ marginBottom: '16px' }}>
          Weekly Summary
        </Text>
        <LoadingPlaceholder>
          <Text size="14px" color="#666">
            Loading weekly summary...
          </Text>
        </LoadingPlaceholder>
      </Container>
    );
  }

  if (!stats) {
    return (
      <Container>
        <Text size="18px" bold style={{ marginBottom: '16px' }}>
          Weekly Summary
        </Text>
        <EmptyState>
          <Text size="14px" color="#666">
            No weekly data available yet
          </Text>
        </EmptyState>
      </Container>
    );
  }

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getDayName = (day: string) => {
    if (!day) return 'Unknown';
    
    const days = {
      'monday': 'Monday',
      'tuesday': 'Tuesday', 
      'wednesday': 'Wednesday',
      'thursday': 'Thursday',
      'friday': 'Friday',
      'saturday': 'Saturday',
      'sunday': 'Sunday'
    };
    return days[day.toLowerCase() as keyof typeof days] || day;
  };

  // Compute most active day from dailyBreakdown if not provided
  let mostActiveDay = stats.mostActiveDay;
  if ((!mostActiveDay || mostActiveDay === 'Unknown') && (stats as any).dailyBreakdown) {
    const breakdown = (stats as any).dailyBreakdown;
    const mostActive = breakdown
      .filter((d: any) => d.sessionsCount > 0)
      .sort((a: any, b: any) => b.sessionsCount - a.sessionsCount)[0];
    if (mostActive) {
      const date = new Date(mostActive.date);
      mostActiveDay = date.toLocaleDateString('en-US', { weekday: 'long' });
    } else {
      mostActiveDay = 'Unknown';
    }
  }

  return (
    <Container>
      <Text size="18px" bold>
        Weekly Summary
      </Text>
      <div style={{ height: '40px' }} />
      <StatsGrid>
        <StatCard>
          <StatIcon>📚</StatIcon>
          <StatContent>
            <Text size="24px" bold color="#7B61FF">
              {stats.totalSessions}
            </Text>
            <Text size="12px" color="#666" style={{ marginTop: 4 }}>
              Sessions
            </Text>
          </StatContent>
        </StatCard>

        <StatCard>
          <StatIcon>🎯</StatIcon>
          <StatContent>
            <Text size="24px" bold color="#2EC4B6">
              {stats.totalCardsStudied}
            </Text>
            <Text size="12px" color="#666" style={{ marginTop: 4 }}>
              Cards Studied
            </Text>
          </StatContent>
        </StatCard>

        <StatCard>
          <StatIcon>⏱️</StatIcon>
          <StatContent>
            <Text size="24px" bold color="#FFCB66">
              {formatTime(stats.totalTimeSpentMinutes)}
            </Text>
            <Text size="12px" color="#666" style={{ marginTop: 4 }}>
              Time Spent
            </Text>
          </StatContent>
        </StatCard>

        <StatCard>
          <StatIcon>📊</StatIcon>
          <StatContent>
            <Text size="24px" bold color="#E94F8A">
              {typeof stats.completionRate === 'number' ? stats.completionRate.toFixed(1) : stats.completionRate}%
            </Text>
            <Text size="12px" color="#666" style={{ marginTop: 4 }}>
              Completion Rate
            </Text>
          </StatContent>
        </StatCard>
      </StatsGrid>

      <InsightsSection>
        <Text size="16px" bold style={{ marginBottom: '16px' }}>
          Weekly Insights
        </Text>
        <InsightsGrid>
          <InsightItem>
            <InsightIcon>🔥</InsightIcon>
            <InsightContent>
              <Text size="16px" bold>Most Active Day</Text>
              <Text size="14px" color="#888">{getDayName(mostActiveDay || '')}</Text>
            </InsightContent>
          </InsightItem>
          <InsightItem>
            <InsightIcon>⚡</InsightIcon>
            <InsightContent>
              <Text size="16px" bold>Average Session</Text>
              <Text size="14px" color="#888">{typeof stats.averageSessionDuration === 'number' ? `${stats.averageSessionDuration}m` : 'NaN'}</Text>
            </InsightContent>
          </InsightItem>
        </InsightsGrid>
      </InsightsSection>
    </Container>
  );
};

export default WeeklySummary;

const Container = styled.div`
  background: white;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 2px 8px 0 #101a3312;
  width: 100%;
  margin-bottom: 24px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 0;
  align-items: stretch;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 12px;
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`;

const StatIcon = styled.div`
  font-size: 24px;
  margin-right: 12px;
`;

const StatContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const InsightsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-top: 16px;
  align-items: stretch;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const InsightItem = styled.div`
  display: flex;
  align-items: stretch;
  gap: 12px;
  width: 100%;
`;

const InsightIcon = styled.div`
  font-size: 20px;
  margin-top: 2px;
  width: 24px;
  text-align: left;
`;

const InsightContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const LoadingPlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  background: #f8f9fa;
  border-radius: 12px;
`;

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  background: #f8f9fa;
  border-radius: 12px;
`;

const InsightsSection = styled.div`
  border-top: 2px solid #e0e0e0;
  padding-top: 32px;
  margin-top: 40px;
`;