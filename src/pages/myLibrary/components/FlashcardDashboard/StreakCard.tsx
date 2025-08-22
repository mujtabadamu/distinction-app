import React from 'react';
import styled from 'styled-components';
import { Text } from '@flexisaf/flexibull2';

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string;
  streakGoal: number;
}

interface StreakCardProps {
  streak: StreakData | null;
  loading?: boolean;
}

const StreakCard: React.FC<StreakCardProps> = ({ streak, loading = false }) => {
  if (loading) {
    return (
      <Container>
        <Text size="18px" bold style={{ marginBottom: '16px' }}>
          Flashcard 7-Day Streak
        </Text>
        <LoadingPlaceholder>
          <Text size="14px" color="#666">
            Loading streak data...
          </Text>
        </LoadingPlaceholder>
      </Container>
    );
  }

  if (!streak) {
    return (
      <Container>
        <Text size="18px" bold style={{ marginBottom: '16px' }}>
          Flashcard 7-Day Streak
        </Text>
        <EmptyState>
          <Text size="14px" color="#666">
            No streak data available yet
          </Text>
        </EmptyState>
      </Container>
    );
  }

  const getStreakEmoji = (streakCount: number) => {
    if (streakCount === 0) return '😴';
    if (streakCount < 3) return '🔥';
    if (streakCount < 7) return '🔥🔥';
    if (streakCount < 14) return '🔥🔥🔥';
    if (streakCount < 30) return '🔥🔥🔥🔥';
    return '🔥🔥🔥🔥🔥';
  };

  const getStreakMessage = (streakCount: number) => {
    if (streakCount === 0) return 'Start your streak today!';
    if (streakCount === 1) return 'Great start! Keep it going!';
    if (streakCount < 7) return "You're building momentum!";
    if (streakCount < 14) return 'Impressive consistency!';
    if (streakCount < 30) return "You're on fire!";
    return "Unstoppable! You're a learning machine!";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Container>
      <Text size="18px" bold>
        Flashcard 7-Day Streak
      </Text>

      <StreakDisplay>
        <StreakEmoji>{getStreakEmoji(streak.currentStreak)}</StreakEmoji>

        <StreakCount>
          <Text size="48px" bold color="#FF6B35">
            {streak.currentStreak}
          </Text>
          <Text size="16px" color="#666">
            {streak.currentStreak === 1 ? 'day' : 'days'}
          </Text>
        </StreakCount>

        <StreakMessage>
          <Text size="14px" color="#666" style={{ textAlign: 'center' }}>
            {getStreakMessage(streak.currentStreak)}
          </Text>
        </StreakMessage>
      </StreakDisplay>

      <ProgressSection>
        <ProgressHeader>
          <Text size="14px" bold>
            Progress to Goal
          </Text>
          <Text size="12px" color="#666">
            {streak.currentStreak}/7 days
          </Text>
        </ProgressHeader>

        <ProgressBar>
          <ProgressFill
            progress={Math.min((streak.currentStreak / 7) * 100, 100)}
          />
        </ProgressBar>
      </ProgressSection>

      <StatsSection>
        <StatItem>
          <StatLabel>
            <Text size="12px" color="#666">
              Longest Streak
            </Text>
          </StatLabel>
          <StatValue>
            <Text size="16px" bold color="#2EC4B6">
              {streak.longestStreak} days
            </Text>
          </StatValue>
        </StatItem>

        <StatItem>
          <StatLabel>
            <Text size="12px" color="#666">
              Last Study
            </Text>
          </StatLabel>
          <StatValue>
            <Text size="14px" color="#666">
              {formatDate(streak.lastStudyDate)}
            </Text>
          </StatValue>
        </StatItem>
      </StatsSection>
    </Container>
  );
};

export default StreakCard;

// Styled components below
const Container = styled.div`
  background: white;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 2px 8px 0 #101a3312;
  width: 100%;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
const StreakDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 12px;
`;
const StreakEmoji = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;
const StreakCount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 12px;
`;
const StreakMessage = styled.div`
  max-width: 200px;
`;
const ProgressSection = styled.div`
  margin-bottom: 20px;
`;
const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;
const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`;
const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  width: ${(props) => props.progress}%;
  background: linear-gradient(90deg, #ff6b35, #f7931e);
  transition: width 0.3s ease;
`;
const StatsSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding-top: 16px;
  border-top: 1px solid #e0e0e0;
`;
const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
const StatLabel = styled.div`
  margin-bottom: 4px;
`;
const StatValue = styled.div`
  display: flex;
  align-items: center;
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
