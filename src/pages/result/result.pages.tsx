import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  FlexiPie,
  Spacer,
  EmptyState,
  Layout,
  Box,
} from '@flexisaf/flexibull2';
import type { TabsProps } from 'antd';
import { Tag, Statistic, Typography, Tabs, Space } from 'antd';
import { CustomRate } from '../../styles/practice/practice.styles';
import { Notify } from '@flexisaf/flexibull2';
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
import PerformanceOverview from '../../components/result/performanceOverview';
import QuestionsReview from '../../components/result/questionsReview';
import {
  PrimaryButton,
  SecondaryButton,
} from '../../styles/common/buttons.styles';
import { Mobile, Laptop } from '../../components/custom/wrapper';
import { selectCurrentUser } from '../../redux/auth/selectors';

import useStudentResultState from '../../hooks/result/useStudentResultState';
import useStudentPaperPost from '../../hooks/studentPapers/useCreateStudentPaper';
import { Liner } from '../../styles/common/liner.styles';
import usePracticeScreenState from '../../hooks/practice/usePracticeScreenState';
import styled from 'styled-components';

import useCreatePaperRating from '../../hooks/papers/useCreatePaperRating';
import useQuizathon from 'pages/quizathon/hooks/useQuizathon';
import { StudentPaperSimpleView } from 'generated/index';
import usePracticeHistory from 'pages/learnerDashboard/hooks';
import SectionLoader from 'components/custom/sectionLoader';

interface ResultSummary {
  subject: string;
  year: number;
  examGroup: string;
  paperId?: string;
}

interface PracticeScreenState {
  paperDetails?: StudentPaperSimpleView;
}

const ResultPage = () => {
  const { getPracticeSolution, practiceSolution, loadingPracticeSolution } =
    usePracticeHistory();

  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(selectCurrentUser);
  const { paperDetails } = location?.state as PracticeScreenState;
  const { paperResult } = useStudentResultState();
  const { studentPaper } = useStudentPaperPost();

  const [resultSummary, setResultSummary] = useState<ResultSummary | null>(
    null
  );

  const { reset } = usePracticeScreenState();
  const { createPaperRating } = useCreatePaperRating();

  const handleRatingChange = (value: number) => {
    createPaperRating({
      data: { rating: value, paperId: resultSummary?.paperId || '' },
      callback: () => {
        Notify(
          `Thank you for your feedback! You rated this paper ${value} out of 5.`
        );
      },
    });
  };
  const { getActiveQuizathon, isQuizathonInProgress } = useQuizathon();

  const urlRedirect = isQuizathonInProgress
    ? '/quizathon-profile'
    : '/dashboard';

  useEffect(() => {
    setResultSummary({
      subject:
        studentPaper?.paper?.subject.name ||
        paperDetails?.paper?.subject?.name ||
        '',
      year: studentPaper?.paper?.exam?.year || 0,
      examGroup:
        studentPaper?.paper?.exam?.examGroup?.name ||
        paperDetails?.paper?.name ||
        '',
      paperId: studentPaper?.paper?.id,
    });
    getActiveQuizathon();
  }, []);

  const studentPaperId = studentPaper?.id ?? '';
  useEffect(() => {
    getPracticeSolution(studentPaperId);
  }, [studentPaperId]);

  if (loadingPracticeSolution) {
    return <SectionLoader />;
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Performance Overview`,
      children: <PerformanceOverview />,
    },
    {
      key: '2',
      label: `Questions Review`,
      children: <QuestionsReview studentPaperQuestion={practiceSolution} />,
    },
  ];

  return (
    <Layout theme={Theme}>
      <MainWrapper>
        {!paperResult ? (
          <EmptyState
            // type="documents"
            title="Apologies, we couldn't load result"
            info="You might be trying to access this page without completing an exam, or something might have gone wrong."
            action={
              <Box gap="10px">
                <PrimaryButton
                  onClick={() => {
                    navigate(urlRedirect);
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
            <Space size={20} direction="vertical" style={{ width: '100%' }}>
              <SubWrapper>
                <Typography.Title level={4} style={{ textAlign: 'center' }}>
                  Well done {user?.firstName}, here's how you did
                </Typography.Title>
                <Spacer space="30px" />
                <ResultWrapper>
                  <div className="summary">
                    <ChartWrapper>
                      <Typography.Title level={5} style={{ color: '#737373' }}>
                        Summary
                      </Typography.Title>
                      <Chart className="pie-contain">
                        <FlexiPie
                          xData={['Correct', 'Incorrect']}
                          yData={[
                            { score: paperResult?.score },
                            {
                              score:
                                (paperResult?.questionCount || 0) -
                                (paperResult?.score || 0),
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
                            value={paperResult?.score}
                            suffix={
                              <Typography.Text
                                style={{ fontSize: '.8rem' }}
                                color={Theme.PrimaryDark}
                              >
                                / {paperResult?.questionCount}
                              </Typography.Text>
                            }
                          />
                          <Spacer space="10px" />
                          <Liner />
                          <Spacer space="10px" />
                          <div className="exam">
                            <span className="exam-name">
                              {resultSummary?.examGroup}
                            </span>
                          </div>
                        </ChartCenter>
                      </Chart>
                      <LegendWrapper>
                        <Legend boxColor={Theme.Correct}>
                          <div className="dot" /> Correct{''}
                          <span style={{ fontWeight: 500 }}>
                            ({paperResult?.score})
                          </span>
                        </Legend>
                        <Legend boxColor={Theme.Incorrect}>
                          <div className="dot" /> Incorrect{' '}
                          <span style={{ fontWeight: 500 }}>
                            (
                            {(paperResult?.questionCount || 0) -
                              (paperResult?.score || 0)}
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
                        {studentPaper?.mode === 'REAL_MODE'
                          ? 'Real'
                          : 'Learning'}{' '}
                        mode
                      </Tag>

                      <Typography.Text style={{ fontSize: '.7rem' }}>
                        Subject:{' '}
                        <span style={{ fontWeight: 500 }}>
                          {resultSummary?.subject}
                        </span>
                      </Typography.Text>
                      <Typography.Text style={{ fontSize: '.7rem' }}>
                        Paper:{' '}
                        <span style={{ fontWeight: 500 }}>
                          {resultSummary?.examGroup}
                        </span>
                      </Typography.Text>
                      <Box style={{ width: '100%', marginBottom: '1rem' }}>
                        <Liner
                          style={{ width: '100%', marginBottom: '1rem' }}
                        />
                        <BoxRate>
                          <Typography.Text
                            style={{ fontSize: '13px', color: '#7C7C7C' }}
                          >
                            Rate your experience
                          </Typography.Text>
                          <CustomRate
                            defaultValue={0}
                            onChange={(value: number) =>
                              handleRatingChange(value)
                            }
                          />
                        </BoxRate>
                      </Box>
                    </ChartWrapper>

                    {!isQuizathonInProgress && (
                      <Laptop>
                        <PerformanceOverview />
                      </Laptop>
                    )}
                  </div>

                  {!isQuizathonInProgress && (
                    <Laptop>
                      <div className="questions">
                        <Typography.Title
                          style={{ color: '#737373' }}
                          level={5}
                        >
                          Questions
                        </Typography.Title>
                        <Liner />

                        <QuestionsReview
                          studentPaperQuestion={practiceSolution}
                        />
                      </div>
                    </Laptop>
                  )}
                </ResultWrapper>

                {!isQuizathonInProgress && (
                  <Mobile>
                    <Spacer space="20px" />
                    <Tabs defaultActiveKey="1" items={items} />
                  </Mobile>
                )}
              </SubWrapper>
            </Space>
            <BottomWrapper>
              <Box
                display="flex"
                style={{ justifyContent: 'center', gap: '10px' }}
              >
                <PrimaryButton
                  onClick={() => {
                    navigate(urlRedirect);
                    reset();
                  }}
                >
                  Back to home
                </PrimaryButton>
                <PrimaryButton
                  onClick={() => {
                    navigate('/new-practice');
                    reset();
                  }}
                >
                  Start new quiz
                </PrimaryButton>
              </Box>
            </BottomWrapper>
          </>
        )}
      </MainWrapper>
    </Layout>
  );
};

export default ResultPage;

export const BoxRate = styled(Box)`
  display: flex;
  justify-content: space-between;
`;
