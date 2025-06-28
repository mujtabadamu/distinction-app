import BreadCrumbs from 'components/breadcrumb';
import {
  Text,
  Spacer,
  Box,
  Table,
  FlexiPagination,
  EmptyState,
  Grid,
  Notify,
  Button,
  PageTitle,
} from '@flexisaf/flexibull2';
import styled from 'styled-components';
import devices from 'utils/devices';
import { useState } from 'react';
import StatusTag from 'components/statusTag/statusTag';
import Skeleton from 'react-loading-skeleton';
import usePracticeHistory from './hooks';
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { capitalizeFirstLetter } from 'utils/helpers';
import { StudentPaperSimpleView } from 'generated/index';
import useStudentPaperPost from 'hooks/studentPapers/useCreateStudentPaper';
import { useDispatch } from 'react-redux';
import { createStudentPaperSuccess } from 'redux/studentPapers/reducer';
import { StudentPaperFull } from 'redux/studentPapers/typings';
import { isWithinRange } from 'pages/quizathon/quizathonProfile';
import { setTimer } from 'hooks/practice/useTimerSlice';

export const isPracticeEligible = (createdAt: string) => {
  const cutoffDate = new Date('2024-11-15T00:00:00Z');
  const practiceCreatedAt = new Date(createdAt);
  return practiceCreatedAt >= cutoffDate;
};

const CoursePracticeHistory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    getPracticePaper,
    practicePaper,
    loadingPracticePaper,
    page,
    setPage,
    setLimit,
    limit,
    pageOptions,
    setOffset,
  } = usePracticeHistory();

  const dispatch = useDispatch();

  const [expandedCards, setExpandedCards] = useState<string[]>([]);

  useEffect(() => {
    if (practicePaper?.items && practicePaper.items.length > 0) {
      setExpandedCards([practicePaper.items?.[0].id as string]);
    }
  }, [practicePaper]);

  const toggleExpand = (id: string) => {
    setExpandedCards((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  const { resetStudentPaper } = useStudentPaperPost();
  const paperId = id as string;
  const title = practicePaper?.items?.[0]?.paper?.name as string;

  const handleContinuePractice = async (practice: StudentPaperSimpleView) => {
    // Check if the practice is eligible
    if (!isPracticeEligible(practice.createdAt as string)) {
      Notify('This practice is not eligible to continue', { status: 'info' });
      return;
    }

    resetStudentPaper();

    dispatch(createStudentPaperSuccess(practice as StudentPaperFull));

    if (practice.mode === 'REAL_MODE') {
      const continueTimeInMins =
        practice.timeElapsed === 1
          ? practice.trackTimer?.startTime
          : (practice.trackTimer?.startTime ?? 0) -
            (practice.trackTimer?.timeElapsed ?? 0);

      dispatch(
        setTimer({
          time:
            continueTimeInMins === 0
              ? (practice.trackTimer as number) || 0
              : Number(continueTimeInMins) * 60,
        })
      );

      navigate('/practice', {
        state: {
          mode: practice.mode === 'REAL_MODE' ? 'real' : 'learning',
          questionNumber: -1,
          paperId: practice.id,
          paperDetails: {
            ...practice,
            timeLeftInMins: continueTimeInMins,
          },
          type: 'Continue',
        },
      });
    }

    if (practice.mode === 'LEARNING_MODE') {
      navigate('/practice', {
        state: {
          mode: practice.mode === 'LEARNING_MODE' ? 'learning' : 'real',
          questionNumber: -1,
          paperId: practice.id,
          paperDetails: { ...practice },
          type: 'Continue',
        },
      });
    }
  };

  useEffect(() => {
    if (!paperId) return;
    getPracticePaper(paperId);
  }, [paperId, page, limit]);

  if (loadingPracticePaper)
    return (
      <>
        <Grid default="auto">
          {[...Array(9)].map((_, index) => (
            <Skeleton
              key={index}
              count={1}
              baseColor="#d0d5d933"
              highlightColor="#c2cad133"
              width="100%"
              height="20rem"
            />
          ))}
        </Grid>
        <Spacer space={14} />
      </>
    );

  return (
    <PracticeWrapper>
      <PageTitle>Practice History</PageTitle>
      <BreadCrumbs
        links={[{ path: `/dashboard`, text: 'Practice History' }]}
        last={title}
      />

      <CourseBanner>
        <Text className="title" data-tour="practice-history-details">
          {title}
        </Text>
        <BoxContent>
          <Text size="0.9rem" data-tour="practice-history-stats">
            {location.state?.practiceAttempts ?? 0} Attempts
          </Text>
          <Box className="dot" />
          <Text size="0.9rem" data-tour="practice-history-stats">
            Accuracy: {location.state?.practiceAccuracy ?? 0}%
          </Text>
        </BoxContent>
      </CourseBanner>
      <Spacer space={30} />
      <MobileScreen>
        {practicePaper?.items && practicePaper.items.length > 0 ? (
          <>
            {practicePaper.items.map((practice, index) => (
              <MobileCard
                key={practice.id}
                data-tour="practice-history-details"
              >
                <CardHeader
                  onClick={() => toggleExpand(practice?.id as string)}
                >
                  <Text>{`S.NO: ${index + 1}`}</Text>
                  <i
                    className={`saf-arrow-right-3 ${
                      expandedCards.includes(practice?.id as string)
                        ? 'expanded'
                        : ''
                    }`}
                  />
                </CardHeader>
                {expandedCards.includes(practice?.id as string) && (
                  <CardDetails>
                    <DetailRow>
                      <Text>Date</Text>
                      <Text>
                        {moment(practice?.updatedAt).format(
                          'Do MMM, YYYY HH:mm A'
                        )}
                      </Text>
                    </DetailRow>
                    <DetailRow>
                      <Text>Question Attempted</Text>
                      <Text>{practice?.result?.questionCount}</Text>
                    </DetailRow>
                    <DetailRow>
                      <Text>Test Type</Text>
                      <StatusTag status={practice?.mode || 'N/A'}>
                        {practice?.mode === 'LEARNING_MODE'
                          ? 'Learning Mode'
                          : 'Real Mode'}
                      </StatusTag>
                    </DetailRow>
                    <DetailRow>
                      <Text>Duration</Text>
                      <Text>
                        {practice.mode !== 'LEARNING_MODE'
                          ? (practice?.timeElapsed as number) < 1
                            ? 'Nill'
                            : `${practice?.timeElapsed} minutes`
                          : 'Nill'}
                      </Text>
                    </DetailRow>
                    <DetailRow>
                      <Text>Score</Text>
                      <Text>{practice?.result?.score ?? 0}</Text>
                    </DetailRow>
                    <DetailRow>
                      <Text>Status</Text>
                      <Text>
                        {practice?.status !== 'COMPLETED'
                          ? 'Started'
                          : 'Completed'}
                      </Text>
                    </DetailRow>
                    <CardFooter
                      style={{
                        backgroundColor:
                          practice.status !== 'COMPLETED' ? '#E5E5EA66' : '',
                        color:
                          practice.status === 'COMPLETED' ? '#1D4ED8' : '#000',
                        cursor:
                          practice.status !== 'COMPLETED' && isWithinRange
                            ? 'not-allowed'
                            : 'pointer',
                        opacity:
                          practice.status !== 'COMPLETED' && isWithinRange
                            ? 0.5
                            : 1,
                      }}
                      onClick={() => {
                        if (practice.status === 'COMPLETED') {
                          navigate(`/practice-result/${practice.id}`, {
                            state: { practiceData: practice },
                          });
                        } else if (
                          isWithinRange ||
                          (practice?.questionCount !== undefined &&
                            practice.questionCount <= 0)
                        ) {
                          Notify(
                            'Practice continuation is currently unavailable',
                            { status: 'info' }
                          );
                        } else {
                          handleContinuePractice(practice);
                        }
                      }}
                    >
                      {practice.status === 'COMPLETED'
                        ? 'View Results'
                        : 'Continue'}
                    </CardFooter>
                  </CardDetails>
                )}
              </MobileCard>
            ))}
            <FlexiPagination
              pageCounts={pageOptions}
              itemsDisplayed
              total={practicePaper?.count}
              pageSize={limit}
              onChange={(page: number) => {
                setPage(page);
                setOffset(page - 1);
              }}
              changePageSize={({ value }: { value: number }) => setLimit(value)}
              current={page}
            />
            <Box pad="50px" />
          </>
        ) : (
          <Box align="center">
            <EmptyState title="No Practice Found" style={{ width: '100%' }} />
          </Box>
        )}
      </MobileScreen>

      <DesktopScreen>
        {practicePaper?.items && practicePaper.items.length > 0 ? (
          <>
            <Table data-tour="practice-history-table">
              <table>
                <thead>
                  <tr>
                    <th>S/No</th>
                    <th>Date</th>
                    <th>Attempted</th>
                    <th>Test Type</th>
                    <th>Status</th>
                    <th>Duration</th>
                    <th>Score</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {practicePaper.items.map((practice, index) => (
                    <tr key={practice?.id}>
                      <td>
                        <Text>{index + 1}</Text>
                      </td>
                      <td>
                        <Text>
                          {moment(practice?.updatedAt).format(
                            'Do MMM, YYYY HH:mm A'
                          )}
                        </Text>
                      </td>
                      <td>
                        <Text>{practice.questionCount ?? 0}</Text>
                      </td>
                      <td>
                        <StatusTag status={practice?.mode || 'N/A'}>
                          {practice?.mode === 'LEARNING_MODE'
                            ? 'Learning Mode'
                            : 'Real Mode'}
                        </StatusTag>
                      </td>
                      <td>
                        {
                          <StatusTag status={practice.status || 'N/A'}>
                            {capitalizeFirstLetter(
                              practice.status !== 'COMPLETED'
                                ? 'Started'
                                : 'Completed'
                            )}
                          </StatusTag>
                        }
                      </td>
                      <td>
                        <Text>
                          {practice.mode !== 'LEARNING_MODE'
                            ? practice.trackTimer?.timeElapsed
                              ? `${practice.trackTimer?.timeElapsed} minutes`
                              : 'Nill'
                            : 'Nill'}
                        </Text>
                      </td>
                      <td>
                        <Text>{practice?.result?.score ?? 0}</Text>
                      </td>

                      <td>
                        {practice.status === 'COMPLETED' ? (
                          <Button
                            pale
                            onClick={() => {
                              navigate(`/practice-result/${practice.id}`, {
                                state: { practiceData: practice },
                              });
                            }}
                          >
                            View Results
                          </Button>
                        ) : (
                          <Button
                            pale
                            color="#16734C"
                            fontColor="#16734C"
                            onClick={() => handleContinuePractice(practice)}
                            disabled={
                              isWithinRange ||
                              (practice?.questionCount !== undefined
                                ? practice.questionCount <= 0
                                : true)
                            }
                          >
                            Continue
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Table>
            <FlexiPagination
              pageCounts={pageOptions}
              itemsDisplayed
              total={practicePaper?.count}
              pageSize={limit}
              onChange={(page: number) => {
                setPage(page);
                setOffset(page - 1);
              }}
              changePageSize={({ value }: { value: number }) => setLimit(value)}
              current={page}
            />
          </>
        ) : (
          <Box align="center">
            <EmptyState title="No Practice Found" style={{ width: '100%' }} />
          </Box>
        )}
      </DesktopScreen>
    </PracticeWrapper>
  );
};

export default CoursePracticeHistory;

export const PracticeWrapper = styled(Box)`
  padding: 10px 20px;
  height: 100vh;
  overflow-y: auto;
  @media ${devices.tablet} {
    margin-bottom: 0;
  }
`;

const CourseBanner = styled.div`
  padding: 20px;
  border-radius: 8px;
  color: #fff;
  background: linear-gradient(269.06deg, #101a33 13.42%, #304e99 79.75%);
  & .title {
    font-weight: 500;
    font-size: 1.1rem;
    @media ${devices.tablet} {
      font-size: 1.3rem;
    }
  }
`;
const BoxContent = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  & .dot {
    width: 4px;
    height: 4px;
    background-color: #fff;
    border-radius: 50%;
  }
`;
const MobileScreen = styled.div`
  display: block;
  @media ${devices.laptop} {
    display: none;
  }
`;
const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  i {
    transition: transform 0.3s ease;

    &.expanded {
      transform: rotate(90deg);
    }
  }
`;

const CardDetails = styled.div`
  margin-top: 10px;
  border-top: 1px solid #e0e0e0;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 13px;
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }
`;

const MobileCard = styled.div`
  border-radius: 5px;
  border: 1px solid #bdbdbd;
  color: #707070;
  margin-bottom: 15px;
`;

const CardFooter = styled.div`
  background: #2998ec0d;
  padding: 25px;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  & span {
    text-align: center;
    color: #1d4ed8;
  }
`;

const DesktopScreen = styled.div`
  display: none;
  @media ${devices.laptop} {
    display: block;
  }
`;
