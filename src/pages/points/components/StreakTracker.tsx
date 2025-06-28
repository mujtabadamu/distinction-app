import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Box, Grid, Spacer } from '@flexisaf/flexibull2';
import { FaFire } from 'react-icons/fa';
import { PointBannerContainer } from './RankingBadges';
import useStreak from '../hooks/useStreak';
import { useNavigate } from 'react-router-dom';

const StreakTracker: React.FC = () => {
  const navigate = useNavigate();
  const { streakStats } = useStreak();

  const totalDays = 7;
  const activeDays = streakStats?.currentStreak ?? 0;
  const fillPercent = `${(activeDays / totalDays) * 100}%`;

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
    <PointBannerContainer background="linear-gradient(249.7deg, #304E99 7.9%, #020B22 52.36%)">
      <HeaderRow>
        <FireIcon />
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
            <StreakBar>
              <StreakFill style={{ width: fillPercent }} />
            </StreakBar>
          </BarRow>
          <StreakText>
            Get <span className="highlight">5 Correct answers daily </span> and
            earn <span className="highlight">50 points</span> after streak.
          </StreakText>
        </Box>
        <EarnPointsButton onClick={() => navigate('/new-practice')}>
          Start earning
        </EarnPointsButton>
      </Grid>
    </PointBannerContainer>
  );
};

export default StreakTracker;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const FireIcon = styled(FaFire)`
  color: #ff8c1a;
  font-size: 2.5rem;
  margin-right: 1rem;
`;

const Title = styled.div`
  font-size: 1.7rem;
  font-weight: 600;
  color: #ffd36a;
`;

const SubTitle = styled.div`
  font-size: 1rem;
  color: #bfc8e6;
  margin-top: 0.2rem;
`;

const DaysRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
`;

const Day = styled.div<{ active?: boolean }>`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ active }) => (active ? '#ffd36a' : '#bfc8e6')};
  opacity: ${({ active }) => (active ? 1 : 0.5)};
`;

const BarRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
`;

const StreakBar = styled.div`
  width: 100%;
  height: 1.3rem;
  background: rgba(82, 82, 83, 1);
  border-radius: 50px;
  overflow: hidden;
`;

const StreakFill = styled.div`
  height: 100%;
  /* background: linear-gradient(90deg, #ff8c1a 60%, #ffd36a 100%); */
  border-radius: 8px;
  background: linear-gradient(90deg, #ff5517 0%, #ffa12e 100%);
  box-shadow: -8px 0px 11.7px 0px rgba(255, 199, 91, 1) inset;

  box-shadow: 4px 0px 7.4px 0px rgba(255, 203, 102, 1);
`;

const EarnPointsButton = styled.button`
  all: unset;
  background: linear-gradient(
    335.51deg,
    #da9b1f 4.46%,
    #d4b579 30.11%,
    #ffe0a4 64.45%,
    #ffcb66 87.21%
  );
  border: 2px solid rgba(255, 248, 234, 0.83);
  color: #232b4a;
  border-radius: 10px;
  padding: 0.5rem 1rem;

  font-size: 1rem;
  cursor: pointer;
  text-align: center;

  min-width: 200px;
  font-weight: 500;
  box-shadow: 0px 2px 10.1px 0px #ffcb6685;
  @media (min-width: 768px) {
    min-height: 64px;
  }
`;

const StreakText = styled.div`
  font-size: 0.85rem;

  color: #fff;
  margin-top: 1rem;
  font-style: italic;

  .highlight {
    color: #fec320;
    font-weight: 400;
  }
  @media (min-width: 768px) {
    font-size: 1.1rem;
  }
`;
