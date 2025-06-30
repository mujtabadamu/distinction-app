import React, { useEffect, useState } from 'react';
import { Select, Box } from '@flexisaf/flexibull2';
import styled from 'styled-components';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import EmptyState from 'components/emptyState/emptyState';
import RankingEmptyState from 'assets/images/ranking_empty_icon.svg';
import useStatistic from './hooks/useStatistic';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from 'redux/auth/selectors';
import { generateYears } from 'utils/helpers';
// import { OptionI } from 'pages/profile/editProfile';
import Skeleton from 'react-loading-skeleton';

const PracticeActivityChart: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<any | null>(null);
  const user = useSelector(selectCurrentUser);
  const years = generateYears();

  const { getMonthlyPracticeStats, isLoadingMonthlyStats, monthlyPractice } =
    useStatistic();

  useEffect(() => {
    const payload = {
      userId: user?.id as string,
      ...(selectedYear && { year: Number(selectedYear.value) }),
    };
    getMonthlyPracticeStats(payload);
  }, [selectedYear]);

  return (
    <ChartContainer>
      {isLoadingMonthlyStats ? (
        <Skeleton height={400} />
      ) : (
        <>
          <Box>
            <Title>Practice Activity</Title>
            <SubTitleContent>
              {monthlyPractice && (
                <Subtitle>
                  Graph showing time spent and the total number of question
                  practice per month in a selected year.
                </Subtitle>
              )}
              {monthlyPractice && (
                <Select
                  placeholder="Year"
                  options={years.map((year) => ({ label: year, value: year }))}
                  value={selectedYear || null}
                  onChange={(value: any) => {
                    setSelectedYear(value);
                  }}
                />
              )}
            </SubTitleContent>
          </Box>

          {monthlyPractice ? (
            <>
              <CustomLegendContainer>
                <LegendItem>
                  <LegendColor color="#7B69EE" />
                  Question practices
                </LegendItem>
                <LegendItem>
                  <LegendColor color="#FF9D5C" />
                  Total Practice Time
                </LegendItem>
              </CustomLegendContainer>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={monthlyPractice?.monthlyStats}
                  margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                  barGap={2}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#f0f0f0"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#666', fontSize: 12 }}
                    padding={{ left: 10, right: 10 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#666', fontSize: 12 }}
                    // domain={[0, 10000]}
                    // ticks={[0, 2500, 5000, 7500, 10000]}
                  />
                  <Tooltip />
                  <Bar
                    dataKey="questionsTaken"
                    fill="#7B69EE"
                    radius={[2, 2, 0, 0]}
                    barSize={28}
                    name="Questions Practiced"
                  />
                  <Bar
                    dataKey="timeSpent"
                    fill="#FF9D5C"
                    radius={[2, 2, 0, 0]}
                    barSize={28}
                    name="Total Practice Time"
                  />
                </BarChart>
              </ResponsiveContainer>
            </>
          ) : (
            <EmptyState
              image={<img src={RankingEmptyState} alt="No Activity" />}
              title="No activity data"
              description="You need to take at least one practice to have an activity record"
            />
          )}
        </>
      )}
    </ChartContainer>
  );
};

export default PracticeActivityChart;

const ChartContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  padding: 16px;
  width: 100%;
  max-width: 1200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

const SubTitleContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 0 6px 0;
`;

const Subtitle = styled.p`
  font-size: 14px;
  margin: 0;
  max-width: 400px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const CustomLegendContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    gap: 12px;
    margin-bottom: 14px;
    justify-content: center;
  }
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;

  @media (max-width: 768px) {
    font-size: 10px;
    gap: 6px;
  }
`;

const LegendColor = styled.div`
  width: 12px;
  height: 12px;
  background-color: ${(props) => props.color};
  border-radius: 2px;

  @media (max-width: 768px) {
    width: 10px;
    height: 10px;
  }
`;
