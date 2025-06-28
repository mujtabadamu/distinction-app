import React from 'react';
import styled from 'styled-components';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import EmptyState from 'components/emptyState/emptyState';
import RankingEmptyState from 'assets/images/ranking_empty_icon.svg';

type ChartData = {
  name: string;
  value: number;
  color: string;
};

type PracticeSummaryProps = {
  chartData: ChartData[];
  totalScore: number;
  averageScore: number;
  stats: { value: string; label: string }[];
  mode?: string;
};

const PracticeSummary: React.FC<PracticeSummaryProps> = ({
  chartData,
  totalScore,
  averageScore,
  stats,
  mode,
}) => {
  return (
    <>
      {chartData.length > 0 ? (
        <Container>
          <TopSection>
            <Legend>
              {chartData.map((item, index) => (
                <LegendItem key={index}>
                  <LegendColor color={item.color} />
                  {item.name}
                </LegendItem>
              ))}
            </Legend>

            {mode && <LearningMode>{mode}</LearningMode>}
          </TopSection>

          <Content>
            <ChartContainer>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={0}
                    dataKey="value"
                    // startAngle={90}
                    // endAngle={-270}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              <ChartCenter>
                <Score>
                  {averageScore}
                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: 'normal',
                    }}
                  >
                    /{totalScore}
                  </span>
                </Score>
                <Label>Average Score</Label>
              </ChartCenter>
            </ChartContainer>

            <StatsContainer>
              {stats.map((stat, index) => (
                <StatItem key={index}>
                  <StatValue>{stat.value}</StatValue>
                  <StatLabel>{stat.label}</StatLabel>
                </StatItem>
              ))}
            </StatsContainer>
          </Content>
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

export default PracticeSummary;

const Container = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 15px;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ChartContainer = styled.div`
  width: 50%;
  position: relative;
  min-width: 200px;

  @media (max-width: 600px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;

const Legend = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
  font-size: 14px;
  margin-bottom: 5px;
`;

const LegendColor = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 3px;
  background-color: ${(props) => props.color};
  margin-right: 5px;
  flex-shrink: 0;
`;

const ChartCenter = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
  max-width: 100px;
`;

const Score = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const Label = styled.div`
  font-size: 10px;
  margin-top: 2px;
`;

const StatsContainer = styled.div`
  width: 50%;
  padding-left: 20px;

  @media (max-width: 600px) {
    width: 100%;
    padding-left: 0;
    display: flex;
    justify-content: space-between;
  }
`;

const StatItem = styled.div`
  margin-bottom: 18px;
`;

const StatValue = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 2px;
`;

const StatLabel = styled.div`
  font-size: 14px;
`;

const LearningMode = styled.div`
  background-color: #f6f6f6;
  border-radius: 4px;
  padding: 8px 10px;
  white-space: nowrap;
`;
