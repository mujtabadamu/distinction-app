import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import { Text, Spacer, Grid } from '@flexisaf/flexibull2';
import { Select } from 'antd';
import Theme from '../../../utils/theme';
import { formatTime, thousandFormatter } from '../../../utils/helpers';
import useRecentPracticesQuery from '../../../hooks/practice/useRecentPracticesQuery';
import devices from '../../../utils/devices';
import ActivityPanel from '../../../components/activityPanel/activityPanel';
import { useState } from 'react';
import LineGraph from '../../../components/custom/LineGraph';
import RecommendedPracticeCard from '../../../components/learnerDashboard/RecommendedPracticeCard';
import useOverviewStatisticsQuery from '../../../hooks/statistics/useOverviewStatisticsQuery';
import { generateYears } from '../../../utils/helpers';
import usePapersGet from '../../../hooks/papers/usePapersGet';
//TODO trace and remove this hook and all it's redux content
const Overview = () => {
  const { loadingRecent, recentPractices } = useRecentPracticesQuery();

  const { papers } = usePapersGet({});

  const [selectYear, setSelectYear] = useState<string>('');
  const years = generateYears();
  const { overview, loadingOverview } = useOverviewStatisticsQuery({
    year: selectYear,
  });

  const calculatePercentagePerformance = (
    totalScore: number,
    totalQuestions: number
  ) => {
    if (!totalScore && !totalQuestions) return 0;
    const percentage = (totalScore / totalQuestions) * 100;

    return Math.floor(percentage);
  };

  const recommendedPractice = papers?.items
    .slice()
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);

  if (loadingOverview || loadingRecent)
    return (
      <OverviewWrapper>
        <div className="stats-box">
          {[1, 2].map((el) => (
            <Skeleton
              key={el}
              count={1}
              baseColor="#d0d5d933"
              highlightColor="#c2cad133"
              width="100%"
              height="8rem"
            />
          ))}
        </div>
        <Spacer space="40px" />
        <Skeleton
          count={1}
          baseColor="#d0d5d933"
          highlightColor="#c2cad133"
          width="100%"
          height="8rem"
        />
        <Spacer space="40px" />
        <Grid default="auto auto">
          {[1, 2].map((el) => (
            <Skeleton
              key={el}
              count={1}
              baseColor="#d0d5d933"
              highlightColor="#c2cad133"
              width="100%"
              height="20rem"
            />
          ))}
        </Grid>
      </OverviewWrapper>
    );
  return (
    <OverviewWrapper>
      <Wrapper>
        <div>
          <h2 style={{ marginTop: '0.5rem', fontSize: '14px' }}>
            Overall Performance
          </h2>
          <div className="stats-cards">
            <StatCard
              bgColor={Theme.PrimaryColor}
              titleColor="white"
              valueColor="white"
            >
              <span className="value">
                <Text size="32px" bold>
                  {calculatePercentagePerformance(
                    overview?.score?.totalScore || 0,
                    overview?.score?.totalQuestions || 0
                  )}
                  %
                </Text>
              </span>
              <span className="title">Accuracy</span>
            </StatCard>
            <StatCard>
              <div className="align">
                <div>
                  <span className="time">
                    {formatTime(overview?.activity?.totalTime || 0)}
                  </span>
                  <span className="title">Total Practice Time</span>
                </div>
                <div>
                  <span className="time">
                    {thousandFormatter(overview?.score?.totalQuestions ?? 0)}
                  </span>
                  <span className="title">Total Questions Practiced</span>
                </div>
              </div>
            </StatCard>
          </div>
        </div>
        <div className="chart">
          <div className="chart-filter">
            <h2 style={{ marginTop: '0.5rem', fontSize: '14px' }}>
              Practice Activity Trend
            </h2>
            <Select
              style={{ height: '25px' }}
              placeholder="year"
              className="selectYear"
              options={years.map((year) => ({ label: year, value: year }))}
              value={selectYear || null}
              onChange={(value) => {
                setSelectYear(value);
              }}
            />
          </div>
          <div className="chart">
            <LineGraph overview={overview} />
          </div>
        </div>
      </Wrapper>
      <div className="RecommendedPracticeWrapper">
        <Text size="15px" bold>
          Recommended Practice
        </Text>
        <div className="RecommendedPracticeContainer">
          {recommendedPractice &&
            recommendedPractice.map((recommend) => (
              <RecommendedPracticeCard
                CourseTitle={recommend.name}
                recommendedPracticeId={recommend.id}
              />
            ))}
        </div>
      </div>
      <div className="recent-practices">
        <ActivityPanel recentPractices={recentPractices} />
      </div>
    </OverviewWrapper>
  );
};

export default Overview;

export const OverviewWrapper = styled.div`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 5rem;
  @media ${devices.tablet} {
    margin-bottom: 0;
  }
  & .stats-box {
    display: grid;
    grid-template-columns: 1fr; /* Changed */
    gap: 20px;
    max-width: 100%; /* Changed */

    @media ${devices.tablet} {
      grid-template-columns: 1fr 1fr;
    }

    @media ${devices.laptop} {
      grid-template-columns: 1fr 1fr;
    }
  }
  & .stats-cards {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    max-width: 100%;
    @media ${devices.tablet} {
      grid-template-columns: 1fr 1fr;
    }

    @media ${devices.laptop} {
      grid-template-columns: 1fr 1fr;
    }
  }

  & .chart-filter {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    margin-bottom: 0.2rem;
  }
  & .chart {
    width: 100%;
    height: 100%;
  }
  & .selectYear {
    width: 30%;
    @media ${devices.laptop} {
      width: 15%;
    }
  }
  & .recent-practices {
    margin-top: 2.4rem;
  }
  & .RecommendedPracticeContainer {
    display: flex;
    overflow-x: auto;
    gap: 1rem;
    width: 100%;
    padding: 0.5rem 0.5rem;
    margin-top: 1rem;

    ::-webkit-scrollbar {
      display: none;
    }
  }
  & .RecommendedPracticeWrapper {
    margin-top: 1rem;
  }

  & .topInfo {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const StatCard = styled.div<{
  bgColor?: string;
  titleColor?: string;
  valueColor?: string;
  minHeight?: string;
}>`
  width: 100%;
  min-height: ${(props) => props.minHeight || '8rem'};
  background-color: ${(props) => props.bgColor || 'white'};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;

  & .info {
    font-size: 10px;
    font-weight: 600;
    color: #f2c94c;
  }

  & .value {
    font-size: 18px;
    font-weight: 600;
    color: ${(props) => props.valueColor || '#757575'};
  }
  & .time {
    font-size: 18px;
    font-weight: 700;
    color: #1d4ed8;
  }
  & .align > div {
    display: flex;
    flex-direction: column;
  }
  & .align {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem;
    min-height: 8rem;
    margin-right: auto;
  }
  & .title {
    font-size: 14px;
    color: ${(props) => props.titleColor || '#9E9E9E'};
  }
`;

export const ThreeStatCard = styled.div<{
  bgColor?: string;
  titleColor?: string;
  valueColor?: string;
  minHeight?: string;
}>`
  width: 100%;
  min-height: ${(props) => props.minHeight || '8rem'};
  background-color: ${(props) => props.bgColor || 'white'};
  border-radius: 5px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
  gap: 5px;

  & .info {
    font-size: 10px;
    font-weight: 600;
    color: #f2c94c;
  }

  & .value {
    font-size: 18px;
    font-weight: 600;
    color: ${(props) => props.valueColor || '#757575'};
  }

  & .title {
    font-size: 14px;
    color: ${(props) => props.titleColor || '#9E9E9E'};
  }
`;

export const FlexItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const PracticeCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  display: flex;
`;

export const Practice = styled.div`
  padding: 15px 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: white;
  height: fit-content;
`;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media ${devices.laptop} {
    gap: 10px;
    grid-template-columns: 1fr 1fr;
  }
`;
