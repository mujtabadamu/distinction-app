import usePracticeHistory from './hooks';
import { useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import SectionLoader from 'components/custom/sectionLoader';
import BreadCrumbs from 'components/breadcrumb';
import {
  FlexiPie,
  Spacer,
  EmptyState,
  Layout,
  Box,
} from '@flexisaf/flexibull2';
import type { TabsProps } from 'antd';
import { Tag, Statistic, Typography, Tabs, Space } from 'antd';
import {
  MainWrapper,
  SubWrapper,
  BottomWrapper,
  ResultWrapper,
  ChartWrapper,
  Chart,
  ChartCenter,
  Legend,
  LegendWrapper,
} from '../../styles/result/result.styles';
import Theme from '../../utils/theme';
import PerformanceOverview from './components/PerformanceReview';
import QuestionsReview from './components/questionsReview';
import {
  PrimaryButton,
  SecondaryButton,
} from '../../styles/common/buttons.styles';
import { Mobile, Laptop } from '../../components/custom/wrapper';
import { Liner } from '../../styles/common/liner.styles';
import useStudentPaperPost from 'hooks/studentPapers/useCreateStudentPaper';
import { StudentPaperSimpleView } from 'generated/index';
import { isPracticeEligible } from './CoursePracticeHistory';
import useQuizathon from 'pages/quizathon/hooks/useQuizathon';
import { setTimer } from 'hooks/practice/useTimerSlice';
import { useDispatch } from 'react-redux';

const PracticeResult = () => {
  const { createStudentPaper, isCreatingStudentPaper } = useStudentPaperPost();
  const { getActiveQuizathon, isQuizathonInProgress } = useQuizathon();
  const dispatch = useDispatch();

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { practiceData } = (location.state || {}) as {
    practiceData: StudentPaperSimpleView;
  };

  const canRetakeInRealMode =
    practiceData.mode === 'REAL_MODE' &&
    isPracticeEligible(practiceData.createdAt as string);

  const {
    getPracticeSolution,
    practiceSolution,
    getPracticedResult,
    practicedResult,
    loadingPracticedResult,
  } = usePracticeHistory();
  useEffect(() => {
    getActiveQuizathon();
  }, []);

  const studentPaperId = id as string;

  const handleRetakeQuiz = () => {
    if (practiceData.mode === 'REAL_MODE') {
      createStudentPaper({
        paperId: practiceData.paper?.id || '',
        size: practiceData.result?.questionCount as number,
        mode: practiceData.mode as string,
        retakeStudentPaperId: practiceData.id,
        callback: () => {
          dispatch(
            setTimer({
              time: Number(practiceData?.paper?.duration) * 60 || 0,
            })
          );
          navigate('/practice', {
            state: {
              mode: 'real',
              questionNumber: practiceData.result?.questionCount as number,
              // Set default value when startTime is null
              paperDetails: {
                timeLeftInMins: practiceData.trackTimer?.startTime
                  ? String(practiceData.trackTimer.startTime)
                  : '5',
              },
            },
          });
        },
      });
    } else {
      createStudentPaper({
        paperId: practiceData.paper?.id || '',
        size: practiceData.result?.questionCount as number,
        mode: practiceData.mode as string,
        callback: () => {
          navigate('/practice', {
            state: {
              mode: 'learning',
              questionNumber: practiceData.result?.questionCount as number,
            },
          });
        },
      });
    }
  };

  useEffect(() => {
    getPracticeSolution(studentPaperId);
    getPracticedResult(studentPaperId);
  }, [studentPaperId]);

  useEffect(() => {
    getActiveQuizathon();
  }, []);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Performance Overview`,
      children: (
        <PerformanceOverview scoreBreakDown={practicedResult?.scoreBreakdown} />
      ),
    },
    {
      key: '2',
      label: `Questions Review`,
      children: <QuestionsReview studentPaperQuestion={practiceSolution} />,
    },
  ];

  if (loadingPracticedResult) return <SectionLoader />;
  return (
    <Layout theme={Theme}>
      <MainWrapper>
        {!practicedResult ? (
          <EmptyState
            // type="documents"
            title="Apologies, we couldn't load result"
            info="You might be trying to access this page without completing an exam, or something might have gone wrong."
            action={
              <Box gap="10px">
                <PrimaryButton
                  onClick={() => {
                    navigate('/dashboard');
                  }}
                >
                  Back to home
                </PrimaryButton>
                <SecondaryButton
                  style={{ marginLeft: '20px' }}
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  Reload Page
                </SecondaryButton>
              </Box>
            }
          />
        ) : (
          <>
            <Space size={40} direction="vertical" style={{ width: '100%' }}>
              <SubWrapper>
                <Spacer space="10px" />
                <BreadCrumbs
                  links={[
                    {
                      path: `/course-practice-history/${practiceData.paper?.id}`,
                      text: 'Practice History',
                    },
                  ]}
                  last={practiceData.paper?.name as string}
                />
                <Typography.Title level={4} style={{ textAlign: 'center' }}>
                  Here's how you did
                </Typography.Title>
                <Spacer space="30px" />
                <ResultWrapper>
                  <div className="summary">
                    <ChartWrapper>
                      <Typography.Title level={5} style={{ color: '#737373' }}>
                        Summary
                      </Typography.Title>{' '}
                      <Chart className="pie-contain">
                        <FlexiPie
                          xData={['Correct', 'Incorrect']}
                          yData={[
                            { score: practiceData?.result?.score || 0 },
                            {
                              score:
                                (practiceData?.result?.questionCount || 0) -
                                (practiceData?.result?.score || 0),
                            },
                          ]}
                          doughnut
                          tooltip
                          colors={[Theme.Correct, Theme.Incorrect]}
                        />
                        <ChartCenter>
                          <span className="score">Score</span>
                          <Statistic
                            valueStyle={{
                              color: `${Theme.PrimaryDark}`,
                              fontSize: '1.2rem',
                            }}
                            value={practiceData?.result?.score}
                            suffix={
                              <Typography.Text
                                style={{ fontSize: '.8rem' }}
                                color={Theme.PrimaryDark}
                              >
                                / {practiceData?.result?.questionCount}
                              </Typography.Text>
                            }
                          />
                          <Spacer space="10px" />
                          <Liner />
                          <Spacer space="10px" />
                          <div className="exam">
                            <span className="exam-name">
                              {practiceData?.paper?.name}
                            </span>
                          </div>
                        </ChartCenter>
                      </Chart>
                      <LegendWrapper>
                        <Legend boxColor={Theme.Correct}>
                          <div className="dot" /> Correct{''}
                          <span style={{ fontWeight: 500 }}>
                            ({practiceData?.result?.score || 0})
                          </span>
                        </Legend>
                        <Legend boxColor={Theme.Incorrect}>
                          <div className="dot" /> Incorrect{' '}
                          <span style={{ fontWeight: 500 }}>
                            (
                            {(practiceData?.result?.questionCount || 0) -
                              (practiceData?.result?.score || 0)}
                            )
                          </span>
                        </Legend>
                      </LegendWrapper>
                      <Tag
                        color="blue"
                        style={{
                          fontSize: '.7rem',
                          textTransform: 'capitalize',
                        }}
                      >
                        {practiceData?.mode === 'LEARNING_MODE'
                          ? 'Learning Mode'
                          : 'Real Mode'}
                      </Tag>
                      <Typography.Text style={{ fontSize: '.7rem' }}>
                        Subject:{' '}
                        <span style={{ fontWeight: 500 }}>
                          {practiceData?.paper?.subject?.name}
                        </span>
                      </Typography.Text>
                      <Typography.Text style={{ fontSize: '.7rem' }}>
                        Paper:{' '}
                        <span style={{ fontWeight: 500 }}>
                          {practiceData?.paper?.name}
                        </span>
                      </Typography.Text>
                      <Box style={{ width: '100%', marginBottom: '1rem' }}>
                        <Liner
                          style={{ width: '100%', marginBottom: '1rem' }}
                        />
                      </Box>
                    </ChartWrapper>

                    <Laptop>
                      <PerformanceOverview
                        scoreBreakDown={practicedResult.scoreBreakdown}
                      />
                    </Laptop>
                  </div>

                  <Laptop>
                    <div className="questions">
                      <Typography.Title style={{ color: '#737373' }} level={5}>
                        Questions
                      </Typography.Title>
                      <Liner />

                      <QuestionsReview
                        studentPaperQuestion={practiceSolution}
                      />
                    </div>
                  </Laptop>
                </ResultWrapper>

                <Mobile>
                  <Spacer space="20px" />
                  <Tabs defaultActiveKey="1" items={items} />
                </Mobile>
              </SubWrapper>
            </Space>

            <BottomWrapper>
              <Box
                display="flex"
                style={{ justifyContent: 'center', gap: '10px' }}
              >
                {(practiceData.mode !== 'REAL_MODE' || canRetakeInRealMode) && (
                  <PrimaryButton
                    onClick={handleRetakeQuiz}
                    loading={isCreatingStudentPaper}
                    disabled={isQuizathonInProgress}
                  >
                    Re-take Quiz
                  </PrimaryButton>
                )}
                <PrimaryButton
                  onClick={() => navigate(-1)}
                  loading={isCreatingStudentPaper}
                  pale
                >
                  Back
                </PrimaryButton>
              </Box>
            </BottomWrapper>
          </>
        )}
      </MainWrapper>
    </Layout>
  );
};

export default PracticeResult;
