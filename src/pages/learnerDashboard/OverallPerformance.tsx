import React from 'react';
import styled from 'styled-components';
import EmptyState from 'components/emptyState/emptyState';
import RankingEmptyState from 'assets/images/ranking_empty_icon.svg';
import { Text, Box, Spacer } from '@flexisaf/flexibull2';
import TargetImg from '../../../public/target-02.svg';

type PracticeSummaryProps = {
  stats: { value: string; label: string }[];
};

const OverallPerformance: React.FC<PracticeSummaryProps> = ({ stats }) => {
  const totalQuestion =
    stats.find((stat) => stat.label === 'Questions')?.value || '0';
  const totalAccuracy =
    stats.find((stat) => stat.label === 'Accuracy')?.value || '0';
  const totalPracticeTime =
    stats.find((stat) => stat.label === 'Total Practice Time')?.value || '0';

  return (
    <>
      <Text size="1.5rem" bold>
        Overall Performance
      </Text>
      {stats.length > 0 ? (
        <Container>
          <StatsContainer>
            <Box className="accuracyLabel">
              <StatValue className="!text-5xl">{totalAccuracy}</StatValue>
              <StatLabel>Accuracy</StatLabel>
            </Box>
            <Box className="time_practice">
              <Box>
                <StatValue>{totalPracticeTime}</StatValue>
                <StatLabel>Total Practice Time</StatLabel>
              </Box>
              <Spacer space={10} />
              <Box>
                <StatValue>{totalQuestion}</StatValue>
                <StatLabel>Questions</StatLabel>
              </Box>
            </Box>
            <img className="opacity-5 absolute right-5" src={TargetImg} />
          </StatsContainer>
        </Container>
      ) : (
        <EmptyState
          image={<img src={RankingEmptyState} alt="No Summary" />}
          title="No summary data"
          description="Take at least one practice to have a summary "
        />
      )}
    </>
  );
};

export default OverallPerformance;

const Container = styled.div`
  width: 100%;
  margin: 1rem auto;
`;

const StatsContainer = styled.div`
  background: linear-gradient(#3e66d6, #1d4ed8);
  background-size: 100% 100%, 100px auto;
  background-position: 0 0, right center;
  background-repeat: no-repeat, no-repeat;
  padding: 1rem;
  display: flex;
  align-items: center;
  border-radius: 10px;
  justify-content: space-between;
  height: 130px;
  position: relative;
  margin: auto;
  & .time_practice {
    width: fit-content;
  }
`;

const StatValue = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 2px;
  color: #fff;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #fff;
`;
