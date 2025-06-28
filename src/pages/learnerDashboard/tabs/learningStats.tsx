import { useState } from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import {
  Text,
  Select,
  Spacer,
  FlexiPie,
  Grid,
  Box,
  Table,
  EmptyState,
  FlexiPagination,
} from '@flexisaf/flexibull2';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { DatePicker, DatePickerProps } from 'antd';
import moment from 'moment';
import devices from '../../../utils/devices';
import { CalendarOutlined } from '@ant-design/icons';
import {
  Chart,
  ChartCenter,
  Legend,
  LegendWrapper,
} from '../../../styles/result/result.styles';
import usePapersGet from '../../../hooks/papers/usePapersGet';
import useLearningStatisticsQuery from '../../../hooks/statistics/useLearningStatisticsQuery';
import Theme from '../../../utils/theme';
import { Statistic, Typography } from 'antd';
import { capitalizeFirstLetter, formatTime } from '../../../utils/helpers';
import dayjs, { Dayjs } from 'dayjs';
import StatusTag from 'components/statusTag/statusTag';
import PracticeHistory from '../components/PracticeHistory';

const LearningStats = () => {
  const { papers } = usePapersGet({
    size: 10,
  });
  const [activeTab, setActiveTab] = useState<string>('History');
  const [selectCourse, setSelectCourse] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [selectDate, setSelectDate] = useState<any>(null);
  const {
    learningStats,
    loadingLearningStats,
    limit,
    setOffset,
    setLimit,
    totalElements,
    page,
    pageOptions,
    setPage,
  } = useLearningStatisticsQuery({
    paperId: selectCourse?.value,
    date: selectDate && JSON.stringify(selectDate).replace(/"/g, ''),
  });
  const totalScore = learningStats?.score?.totalScore || 1;
  const barChartData = learningStats?.recentPapers
    ? learningStats.recentPapers.items.map((item, index) => {
        const percentage = (item?.result?.score / totalScore) * 100;
        let strength = 'weak';

        if (percentage >= 70) {
          strength = 'excellent';
        } else if (percentage >= 50) {
          strength = 'moderate';
        }

        return {
          name: `${index + 1} take`,
          [strength]: percentage,
        };
      })
    : [];

  const handleChangeDatePicker: DatePickerProps['onChange'] = (
    date: Dayjs | null,
    dateString: string | string[]
  ) => {
    if (!date) return;
    setSelectDate(dateString);
  };
  const handleTabSwitch = (value: string) => setActiveTab(value);

  return (
    <>
      <Spacer space={15} />
      <TabContainer>
        <TabButton
          active={activeTab === 'Statistics'}
          onClick={() => handleTabSwitch('Statistics')}
        >
          STATISTICS
        </TabButton>
        <TabButton
          active={activeTab === 'History'}
          onClick={() => handleTabSwitch('History')}
        >
          HISTORY
        </TabButton>
        <Spacer space={20} />
      </TabContainer>
      <TabPanel active={activeTab === 'History'}>
        <PracticeHistoryContainer>
          <PracticeHistory />
        </PracticeHistoryContainer>
      </TabPanel>
      <TabPanel active={activeTab === 'Statistics'}>
        <LearningStatsWrapper>
          <Grid default="1fr 1fr">
            <Grid default="1fr 1fr" sm="1fr 1fr">
              <Select
                placeholder="Course"
                value={selectCourse}
                block
                onChange={(value: { label: string; value: string }) => {
                  setSelectCourse({
                    label: value.label,
                    value: value.value,
                  });
                }}
                options={papers?.items.map((paper) => ({
                  label: paper.name,
                  value: paper.id,
                }))}
              />

              <DatePicker
                onChange={handleChangeDatePicker}
                placeholder="Date"
                className="date-style"
                format={'YYYY-MM-DD'}
                value={selectDate && dayjs(selectDate)}
                suffixIcon={<CalendarOutlined />}
              />
            </Grid>
          </Grid>
          <Spacer space="30px" />
          <>
            {loadingLearningStats ? (
              <>
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
                <Spacer space={14} />
                <Skeleton
                  count={1}
                  baseColor="#d0d5d933"
                  highlightColor="#c2cad133"
                  width="100%"
                  height="20rem"
                />
              </>
            ) : (
              <>
                {learningStats?.recentPapers?.items.length ? (
                  <Box>
                    <Grid
                      default="1fr 1fr"
                      sm="1fr"
                      rowGap="40px"
                      columnGap="20px"
                    >
                      <Box>
                        <div>
                          <Box>
                            <Text bold style={{ color: '#737373' }}>
                              Practice Summary
                            </Text>
                            <Spacer space="10px" />
                            <div className="chat-container">
                              <LegendWrapper>
                                <Legend
                                  boxColor={Theme.Correct}
                                  style={{ fontSize: '12px' }}
                                >
                                  <div
                                    className="dot"
                                    style={{ width: '20px', height: '20px' }}
                                  />{' '}
                                  Correct
                                </Legend>
                                <Legend
                                  boxColor={Theme.Incorrect}
                                  style={{ fontSize: '12px' }}
                                >
                                  <div
                                    className="dot"
                                    style={{ width: '20px', height: '20px' }}
                                  />{' '}
                                  Incorrect{' '}
                                </Legend>
                                <div className="learning">
                                  <Text
                                    bold
                                    style={{
                                      fontSize: '.8rem',
                                      color: '#26499D',
                                    }}
                                  >
                                    Learning Mode
                                  </Text>
                                </div>
                              </LegendWrapper>
                              <div className="pie-wrapper">
                                <Chart className="pie-contain">
                                  <FlexiPie
                                    xData={['Correct', 'Incorrect']}
                                    radius={100}
                                    thickness={25}
                                    yData={[
                                      { score: totalScore },
                                      {
                                        score:
                                          (learningStats?.score
                                            ?.totalQuestions || 0) -
                                          (totalScore || 0),
                                      },
                                    ]}
                                    doughnut
                                    tooltip
                                    colors={[Theme.Correct, Theme.Incorrect]}
                                  />
                                  <ChartCenter>
                                    <span className="score">Average Score</span>
                                    <Statistic
                                      valueStyle={{
                                        color: `${Theme.PrimaryTextColor}`,
                                        fontSize: '1.6rem',
                                      }}
                                      value={totalScore}
                                      suffix={
                                        <Typography.Text
                                          style={{ fontSize: '.8rem' }}
                                          color={Theme.PrimaryTextColor}
                                        >
                                          /
                                          {learningStats?.score?.totalQuestions}
                                        </Typography.Text>
                                      }
                                    />
                                  </ChartCenter>
                                </Chart>
                                <Box className="time-wrapper">
                                  <div>
                                    <Text block className="time">
                                      Time Spent
                                    </Text>
                                    <Text block bold className="value">
                                      {formatTime(
                                        learningStats?.activity
                                          ?.totalTime as number
                                      )}
                                    </Text>
                                  </div>
                                  <div>
                                    <Text block className="time">
                                      Total Questions
                                    </Text>
                                    <Text block bold className="value">
                                      {learningStats?.score?.totalQuestions}
                                    </Text>
                                  </div>
                                </Box>
                              </div>
                            </div>
                          </Box>
                        </div>
                      </Box>
                      <Box>
                        <div>
                          <div>
                            <Text
                              bold
                              style={{ color: '#737373' }}
                              className="title-text"
                            >
                              Your performance over time
                            </Text>
                            <Spacer space="10px" />
                            <div className="chat-container">
                              <LegendWrapper>
                                <Legend
                                  boxColor="#FB5E9A"
                                  style={{ fontSize: '12px' }}
                                >
                                  <div
                                    className="dot"
                                    style={{ width: '20px', height: '20px' }}
                                  />
                                  Weak
                                </Legend>
                                <Legend
                                  boxColor="#7586E0"
                                  style={{ fontSize: '12px' }}
                                >
                                  <div
                                    className="dot"
                                    style={{ width: '20px', height: '20px' }}
                                  />
                                  Moderate
                                </Legend>
                                <Legend
                                  boxColor="#8FE2C9"
                                  style={{ fontSize: '12px' }}
                                >
                                  <div
                                    className="dot"
                                    style={{ width: '20px', height: '20px' }}
                                  />
                                  Excellent
                                </Legend>
                              </LegendWrapper>
                              <Box pad="20px 0">
                                <div
                                  style={{
                                    position: 'relative',
                                    width: '100%',
                                    paddingBottom: '250px',
                                  }}
                                >
                                  <div
                                    style={{
                                      position: 'absolute',
                                      left: 0,
                                      right: 0,
                                      bottom: 0,
                                      top: 0,
                                    }}
                                  >
                                    <ResponsiveContainer>
                                      <BarChart
                                        data={barChartData}
                                        width={480}
                                        height={250}
                                      >
                                        <CartesianGrid
                                          strokeDasharray="3 3"
                                          style={{ marginTop: '1rem' }}
                                        />
                                        <XAxis
                                          dataKey="name"
                                          label={{
                                            value:
                                              'Practice Attempts (Most Recent 4 Attempts)',
                                            position: 'insideBottom',
                                            offset: 0,
                                            dy: 5,
                                          }}
                                        />
                                        <YAxis
                                          label={{
                                            value: 'Scores',
                                            angle: -90,
                                            position: 'insideLeft',
                                            dy: -10,
                                          }}
                                        />
                                        <Bar
                                          dataKey="weak"
                                          fill="#FB5E9A"
                                          barSize={57}
                                        />
                                        <Bar
                                          dataKey="moderate"
                                          fill="#7586E0"
                                          barSize={57}
                                        />
                                        <Bar
                                          dataKey="excellent"
                                          fill="#8FE2C9"
                                          barSize={57}
                                        />
                                      </BarChart>
                                    </ResponsiveContainer>
                                  </div>
                                </div>
                              </Box>
                            </div>
                          </div>
                        </div>
                      </Box>
                    </Grid>
                    <Table className="table-style">
                      <table>
                        <thead>
                          <tr>
                            <th>Course</th>
                            <th>Score</th>
                            <th>Time </th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {learningStats?.recentPapers?.items.map((recent) => (
                            <tr key={recent.id}>
                              <td>
                                <Text>{recent?.paper.name}</Text>
                              </td>
                              <td>
                                <Text>
                                  {!recent?.result?.score
                                    ? '0'
                                    : `${recent?.result?.score}/${recent?.result?.questionCount}`}
                                </Text>
                              </td>
                              <td>
                                <Text block style={{ marginBottom: '0.5rem' }}>
                                  {moment(recent?.updatedAt).format(
                                    'DD, MMMM  YYYY'
                                  )}
                                </Text>
                                <Text block style={{ marginBottom: '0.5rem' }}>
                                  {recent.timeElapsed} mins
                                </Text>
                              </td>
                              <td>
                                <StatusTag status={recent.status}>
                                  {capitalizeFirstLetter(recent.status)}
                                </StatusTag>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Table>
                    <FlexiPagination
                      pageCounts={pageOptions}
                      total={totalElements}
                      pageSize={limit}
                      onChange={(page: number) => {
                        setPage(page);
                        setOffset(page - 1);
                      }}
                      changePageSize={({ value }: { value: number }) =>
                        setLimit(value)
                      }
                      current={page}
                      style={{ margin: '0' }}
                    />
                  </Box>
                ) : (
                  <EmptyState
                    title="Nothing to see here."
                    info="It seems you're yet to take any practice"
                    style={{ width: '100%' }}
                  />
                )}
              </>
            )}
          </>
        </LearningStatsWrapper>
      </TabPanel>
    </>
  );
};

export default LearningStats;

const PracticeHistoryContainer = styled.div`
  margin-bottom: 100px;
  @media ${devices.tablet} {
    margin-bottom: 0;
  }
`;
const LearningStatsWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 100px;
  @media ${devices.tablet} {
    margin-bottom: 0;
  }

  & .chart-section {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    place-items: center;
    @media ${devices.laptop} {
      grid-template-columns: 1fr 1fr;
      max-width: 1024px;
    }
  }
  & .chat-container {
    width: 100%;
    background-color: white;
    gap: 1.1rem;
    max-width: 350px;
    padding: 1rem;
    height: 335px;
    @media ${devices.mobileL} {
      max-width: 380px;
    }
    @media ${devices.tablet} {
      max-width: 100%;
    }
    @media ${devices.laptop} {
      max-width: -webkit-fill-available;
    }
  }

  & .topics-container {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 10px;
  }
  & .table-style {
    overflow-x: auto;
    width: 100%;
  }

  & .time {
    font-size: 14px;
  }
  & .value {
    font-size: 15px;
    margin-top: 0.5rem;
  }
  & .time-wrapper {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    @media ${devices.laptopL} {
      flex-direction: column;
      width: 60%;
    }
  }

  & .title-text {
    margin-left: 8px;
    @media ${devices.laptop} {
      margin-left: 0;
    }
  }

  & .learning {
    background-color: #26499d1a;
    padding: 0.5rem 0.3rem;
    border-radius: 5px;
    @media ${devices.tablet} {
      padding: 0.5rem 1rem;
    }
  }
  & .pie-wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
    @media ${devices.laptopL} {
      flex-direction: row;
      justify-content: space-between;
    }
  }
  & .date-style {
    padding: 0.6rem;
    input::placeholder {
      color: hsl(0, 0%, 50%) !important;
      font-weight: 400 !important;
    }
    .ant-picker-suffix {
      svg {
        color: #72777a;
        font-size: 16px;
      }
    }
  }
`;

export const TabContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f7fa;
  width: 100%;
  height: 42px;
  border-radius: 8px;

  @media ${devices.tablet} {
    width: 320px;
  }
`;

export const TabButton = styled.div<{ active: boolean }>`
  width: 100%;
  border-radius: 2px;
  background: ${(props) => (props.active ? '#8E8E93' : 'transparent')};
  color: ${(props) => (props.active ? '#fff' : '#8E8E93')};
  cursor: pointer;
  border: 1px solid #0e121b0f;
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  padding: 10px 10px;
  display: flex;
  justify-content: center;
  @media ${devices.tablet} {
    width: 154px;
  }
`;

export const TabPanel = styled.div<{ active: boolean }>`
  display: ${(props) => (props.active ? 'block' : 'none')};
`;

