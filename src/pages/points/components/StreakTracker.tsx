import React, { useMemo } from 'react';
import { Box, Grid, Spacer } from '@flexisaf/flexibull2';
import { PointBannerContainer } from './RankingBadges';
import useStreak from '../hooks/useStreak';
import { useNavigate } from 'react-router-dom';
import {
  HeaderRow,
  FireIconContainer,
  AnimatedFireIcon,
  FireParticle,
  Title,
  SubTitle,
  DaysRow,
  Day,
  BarRow,
  StreakBar,
  StreakFill,
  StreakShimmer,
  StreakGlow,
  EarnPointsButton,
  StreakText,
} from './StreakTracker.styles';

interface StreakTrackerProps {
  showInfo?: boolean;
  showEarnButton?: boolean;
  onClick?: () => void;
}

const StreakTracker: React.FC<StreakTrackerProps> = ({
  showInfo,
  showEarnButton,
  onClick,
}: StreakTrackerProps) => {
  const navigate = useNavigate();
  const { streakStats } = useStreak();

  // const totalDays = 7;
  const activeDays = streakStats?.currentStreak ?? 0;
  const fillPercent = ` 100%`;

  const daysOfWeek = useMemo(() => {
    const defaultDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    if (!streakStats?.streakStartDate) {
      return defaultDays;
    }

    const startDate = new Date(streakStats.streakStartDate);
    const startDay = startDate.getDay();

    const reorderedDays = [
      ...defaultDays.slice(startDay),
      ...defaultDays.slice(0, startDay),
    ];
    return reorderedDays;
  }, [streakStats?.streakStartDate]);

  const getActiveDays = useMemo(() => {
    if (!streakStats?.streakStartDate) {
      return Array(7)
        .fill(false)
        .map((_, index) => index < activeDays);
    }

    // For a streak starting on a specific day, mark the first N days as active
    return Array(7)
      .fill(false)
      .map((_, index) => index < activeDays);
  }, [streakStats?.streakStartDate, activeDays]);

  return (
    <PointBannerContainer
      onClick={onClick}
      background="linear-gradient(249.7deg, #304E99 7.9%, #020B22 52.36%)"
    >
      <HeaderRow>
        <FireIconContainer>
          <AnimatedFireIcon />
          <FireParticle delay="0s" />
          <FireParticle delay="0.3s" />
          <FireParticle delay="0.6s" />
          <FireParticle delay="0.9s" />
          <FireParticle delay="1.2s" />
          <FireParticle delay="1.5s" />
          <FireParticle delay="1.8s" />
          <FireParticle delay="2.1s" />
        </FireIconContainer>
        <div>
          <Title>7 Days Streak</Title>
          <SubTitle>Day {activeDays} of 7 &bull; Week 1/1</SubTitle>
        </div>
      </HeaderRow>
      <Spacer space={8} />
      <Grid
        default="auto max-content"
        gap="1rem"
        style={{ alignItems: 'center' }}
      >
        <Box>
          <DaysRow>
            {daysOfWeek.map((day, index) => (
              <Day key={day} active={getActiveDays[index]}>
                {day}
              </Day>
            ))}
          </DaysRow>
          <BarRow>
            {getActiveDays.map((active, index) => (
              <StreakBar key={index}>
                <StreakFill
                  active={active}
                  delay={index}
                  style={{ width: active ? fillPercent : '0%' }}
                />
                <StreakShimmer active={active} delay={index * 0.25} />
                <StreakGlow active={active} delay={index * 0.25} />
              </StreakBar>
            ))}
          </BarRow>
          {showInfo && (
            <StreakText>
              Get <span className="highlight">5 Correct answers daily </span>
              and earn <span className="highlight">50 points</span> after
              streak.
            </StreakText>
          )}
        </Box>
        {showEarnButton && (
          <EarnPointsButton onClick={() => navigate('/new-practice')}>
            Start earning
          </EarnPointsButton>
        )}
      </Grid>
    </PointBannerContainer>
  );
};

export default StreakTracker;
