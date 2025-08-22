import React from 'react';
import styled from 'styled-components';
import { Text } from '@flexisaf/flexibull2';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
  target?: number;
  category: 'study' | 'consistency' | 'mastery' | 'speed' | 'endurance';
}

interface AchievementsProps {
  achievements: Achievement[];
  loading?: boolean;
}

const Achievements: React.FC<AchievementsProps> = ({
  achievements,
  loading = false,
}) => {
  if (loading) {
    return (
      <Container>
        <Text size="18px" bold style={{ marginBottom: '28px' }}>
          Achievements
        </Text>
        <LoadingPlaceholder>
          <Text size="14px" color="#666">
            Loading achievements...
          </Text>
        </LoadingPlaceholder>
      </Container>
    );
  }

  if (!achievements || achievements.length === 0) {
    return (
      <Container>
        <Text size="18px" bold style={{ marginBottom: '28px' }}>
          Achievements
        </Text>
        <EmptyState>
          <Text size="14px" color="#666">
            No achievements available yet
          </Text>
        </EmptyState>
      </Container>
    );
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      study: '#7B61FF',
      consistency: '#2EC4B6',
      mastery: '#FFCB66',
      speed: '#E94F8A',
      endurance: '#F76B3E',
    };
    return colors[category as keyof typeof colors] || '#666';
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      study: '📚',
      consistency: '🔥',
      mastery: '🏆',
      speed: '⚡',
      endurance: '💪',
    };
    return icons[category as keyof typeof icons] || '🎯';
  };

  return (
    <Container>
      <HeaderSection>
        <Text size="18px" bold>
          Achievements
        </Text>
      </HeaderSection>

      <AchievementsGrid>
        {achievements.map((achievement) => (
          <AchievementCard
            key={achievement.id}
            isUnlocked={achievement.isUnlocked}
            categoryColor={getCategoryColor(achievement.category)}
          >
            <AchievementIcon
              isUnlocked={achievement.isUnlocked}
              categoryColor={getCategoryColor(achievement.category)}
            >
              <Text size="20px">
                {achievement.isUnlocked
                  ? achievement.icon
                  : getCategoryIcon(achievement.category)}
              </Text>
            </AchievementIcon>

            <AchievementContent>
              <AchievementHeader>
                <Text size="14px" bold>
                  {achievement.title}
                </Text>
                <CategoryBadge
                  categoryColor={getCategoryColor(achievement.category)}
                >
                  <Text
                    size="8px"
                    color={getCategoryColor(achievement.category)}
                    bold
                  >
                    {achievement.category.toUpperCase()}
                  </Text>
                </CategoryBadge>
              </AchievementHeader>

              <Text
                size="11px"
                color="#666"
                style={{ marginBottom: '5px', lineHeight: '1.4' }}
              >
                {achievement.description}
              </Text>

              {achievement.isUnlocked ? (
                <UnlockedSection>
                  <UnlockedBadge>
                    <Text size="9px" color="white" bold>
                      UNLOCKED
                    </Text>
                  </UnlockedBadge>
                  {achievement.unlockedAt && (
                    <Text size="8px" color="#999">
                      {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </Text>
                  )}
                </UnlockedSection>
              ) : (
                <ProgressSection>
                  <ProgressHeader>
                    <Text size="9px" color="#666" bold>
                      PROGRESS
                    </Text>
                    <Text size="9px" color="#666">
                      {achievement.progress || 0}/{achievement.target || 1}
                    </Text>
                  </ProgressHeader>
                  <ProgressBar>
                    <ProgressFill
                      progress={achievement.progress || 0}
                      maxProgress={achievement.target || 1}
                    />
                  </ProgressBar>
                </ProgressSection>
              )}
            </AchievementContent>
          </AchievementCard>
        ))}
      </AchievementsGrid>
    </Container>
  );
};

export default Achievements;

const Container = styled.div`
  background: white;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 2px 8px 0 #101a3312;
  width: 100%;
  margin-bottom: 24px;
  overflow: hidden; /* Prevent scrolling from affecting the container */

  @media (max-width: 767px) {
    border-radius: 16px;
    padding: 20px 16px;
    margin-bottom: 16px;
  }
`;

const HeaderSection = styled.div`
  margin-bottom: 24px;

  @media (max-width: 767px) {
    margin-bottom: 20px;
  }
`;

const AchievementsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (max-width: 767px) {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 4px 0 8px 0;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    width: 100%;
    margin: 0;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const AchievementCard = styled.div<{
  isUnlocked: boolean;
  categoryColor: string;
}>`
  display: flex;
  align-items: flex-start;
  padding: 20px;
  border-radius: 12px;
  border: 2px solid
    ${(props) => (props.isUnlocked ? props.categoryColor : '#e0e0e0')};
  background: ${(props) =>
    props.isUnlocked ? `${props.categoryColor}08` : '#ffff'};
  transition: all 0.3s ease;
  opacity: ${(props) => (props.isUnlocked ? 1 : 0.75)};
  width: 100%;
  box-sizing: border-box;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 767px) {
    flex-direction: column;
    padding: 16px;
    border-radius: 16px;
    min-width: 200px;
    width: 200px;
    flex-shrink: 0;
    text-align: center;
    align-items: center;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    border-width: 1.5px;
    scroll-snap-align: start;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    }
  }
`;

const AchievementIcon = styled.div<{
  isUnlocked: boolean;
  categoryColor: string;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: white;
  margin-right: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
  color: ${(props) => (props.isUnlocked ? 'white' : 'inherit')};

  @media (max-width: 767px) {
    width: 48px;
    height: 48px;
    border-radius: 16px;
    margin-right: 0;
    margin-bottom: 12px;
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
  }
`;

const AchievementContent = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;

  @media (max-width: 767px) {
    width: 100%;
    align-items: center;
  }
`;

const AchievementHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 2px;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
    gap: 4px;
    margin-bottom: 8px;
  }
`;

const CategoryBadge = styled.div<{ categoryColor: string }>`
  background: ${(props) => `${props.categoryColor}15`};
  border: 1px solid ${(props) => `${props.categoryColor}30`};
  padding: 2px 6px;
  border-radius: 6px;
  flex-shrink: 0;

  @media (max-width: 767px) {
    padding: 3px 8px;
    border-radius: 8px;
  }
`;

const UnlockedSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (max-width: 767px) {
    align-items: center;
  }
`;

const UnlockedBadge = styled.div`
  background: linear-gradient(135deg, #2ec4b6, #20a39e);
  color: white;
  padding: 4px 8px;
  border-radius: 20px;
  display: inline-block;

  @media (max-width: 767px) {
    padding: 6px 10px;
    border-radius: 12px;
  }
`;

const ProgressSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: #e8e8e8;
  border-radius: 6px;
  overflow: hidden;
  position: relative;

  @media (max-width: 767px) {
    height: 4px;
    border-radius: 4px;
  }
`;

const ProgressFill = styled.div<{ progress: number; maxProgress: number }>`
  height: 100%;
  width: ${(props) => (props.progress / props.maxProgress) * 100}%;
  background: linear-gradient(90deg, #7b61ff, #9c88ff);
  border-radius: inherit;
  transition: width 0.4s ease;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3));
    border-radius: inherit;
  }
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
