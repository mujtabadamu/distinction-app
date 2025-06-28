import { useEffect, useState } from 'react';
import {
  Spacer,
  Text,
  Input,
  Box,
  Table,
  Grid,
  FlexiPagination,
} from '@flexisaf/flexibull2';
import devices from 'utils/devices';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import FolderIcon from 'assets/images/folder.svg';
import EmptyState from 'components/emptyState/emptyState';
import useQuizathon from 'pages/quizathon/hooks/useQuizathon';
import {
  capitalizeFirstLetterOFEachWord,
  thousandFormatter,
} from 'utils/helpers';
import usePaginationWrapper from 'hooks/general/usePaginationWrapper';
import { PaginationWrapper } from 'pages/learnerDashboard/tabs/availableCourses';
import Skeleton from 'react-loading-skeleton';
import {
  TabButton,
  TabContainer,
  TabPanel,
} from 'pages/learnerDashboard/dashboardTab';
import Position from 'components/statusTag/position';
import {
  LeaderBoardContent,
  ScoreContainer,
  ViewType,
} from 'pages/quizathon/components/QuizathonStatsPanel';
import LeaderboardCard from 'components/cards/leaderboard-card';
import { DesktopTableWrapper } from 'styles/dashboard/dashboard.styles';

const LeaderBoard = () => {
  const [activeView, setActiveView] = useState<ViewType>('accuracy');
  const navigate = useNavigate();

  const {
    getLeaderboard,
    leaderBoardData,
    isLoadingLeaderBoard,
    getAccuracyLeaderboard,
    rankingData,
    isLoadingRanking,
    getSchoolLeaderboard,
    schoolLeaderboard,
    isLoadingSchoolLeaderboard,
  } = useQuizathon();

  const {
    limit,
    page,
    setPage,
    debouncedSearchText,
    setLimit,
    setSearchText,
    pageOptions,
    setOffset,
  } = usePaginationWrapper({ defaultLimit: 10 });

  const toggleView = (value: ViewType) => {
    setActiveView(value);
    setPage(1);
  };

  // Effect for leaderboard data and history
  useEffect(() => {
    // Fetch different leaderboards based on active view
    const payload = { page: page - 1 };

    if (activeView === 'score') {
      getLeaderboard(payload);
    } else if (activeView === 'university') {
      getSchoolLeaderboard({
        ...payload,
        ...(debouncedSearchText && { keyword: debouncedSearchText }),
      });
    } else {
      getAccuracyLeaderboard(payload);
    }
  }, [debouncedSearchText, page, limit, activeView]);

  // Score leaderboard content
  const ScoreLeaderboardContent = () => (
    <>
      {leaderBoardData?.items?.length ? (
        <ScoreContainer>
          <DesktopTableWrapper style={{ overflowX: 'auto' }}>
            <Table style={{ border: 'none' }}>
              <table>
                <thead>
                  <tr>
                    <th>Position</th>
                    <th>Name</th>
                    <th>Institution</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderBoardData.items?.map((user, index) => (
                    <tr key={index}>
                      <td>
                        <Position position={Number(user.position)} />
                      </td>
                      <td>{user.participantName}</td>
                      <td>{user.schoolName}</td>
                      <td>{thousandFormatter(user.totalScore ?? 0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Table>
          </DesktopTableWrapper>
          {leaderBoardData.items?.map((user, index) => (
            <Box className="leader-board-cards" key={index}>
              <LeaderboardCard
                name={user.participantName ?? ''}
                pointLabel="Score"
                point={thousandFormatter(user.totalScore ?? 0)}
                position={Number(user.position)}
                // institution={user.schoolName}
              />
            </Box>
          ))}
          <PaginationWrapper>
            <FlexiPagination
              pageCounts={pageOptions}
              total={leaderBoardData?.count}
              pageSize={limit}
              onChange={(page: number) => {
                setPage(page);
                setOffset(page - 1);
              }}
              changePageSize={({ value }: { value: number }) => {
                setLimit(value);
              }}
              current={page}
              style={{ margin: '0' }}
            />
          </PaginationWrapper>
        </ScoreContainer>
      ) : (
        <EmptyState
          image={<img src={FolderIcon} alt="folder_icon" />}
          title="No Leaderboard Available"
          description={`There are no ongoing quizathons or you haven't registered for any. Check your history for previous quizathons.`}
        />
      )}
    </>
  );

  // Accuracy leaderboard content
  const AccuracyLeaderboardContent = () => (
    <>
      {rankingData?.items?.length ? (
        <ScoreContainer>
          <DesktopTableWrapper style={{ overflowX: 'auto' }}>
            <Table style={{ border: 'none' }}>
              <table>
                <thead>
                  <tr>
                    <th>Position</th>
                    <th>Name</th>
                    <th>Institution</th>
                    <th>Accuracy</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {rankingData.items?.map((user, index) => (
                    <tr key={index}>
                      <td>
                        <Position position={Number(user.position)} />
                      </td>
                      <td>{user.participantName}</td>
                      <td>{user.schoolName}</td>
                      <td>{user.accuracy}%</td>
                      <td>{thousandFormatter(user.totalScore ?? 0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Table>
          </DesktopTableWrapper>
          {rankingData.items?.map((user, index) => (
            <Box className="leader-board-cards" key={index}>
              <LeaderboardCard
                name={capitalizeFirstLetterOFEachWord(
                  user.participantName ?? ''
                )}
                pointLabel="Accuray"
                point={`${user?.accuracy}%`}
                position={Number(user.position)}
              />
            </Box>
          ))}
          <PaginationWrapper>
            <FlexiPagination
              pageCounts={pageOptions}
              total={rankingData?.count}
              pageSize={limit}
              onChange={(page: number) => {
                setPage(page);
                setOffset(page - 1);
              }}
              changePageSize={({ value }: { value: number }) => {
                setLimit(value);
              }}
              current={page}
              style={{ margin: '0' }}
            />
          </PaginationWrapper>
        </ScoreContainer>
      ) : (
        <EmptyState
          image={<img src={FolderIcon} alt="folder_icon" />}
          title="No Leaderboard Available"
          description="There are no ongoing quizathons or you haven't registered for any. Check your history for previous quizathons."
        />
      )}
    </>
  );

  // University leaderboard content
  const UniversityLeaderboardContent = () => (
    <>
      {schoolLeaderboard?.items?.length ? (
        <ScoreContainer>
          <DesktopTableWrapper style={{ overflowX: 'auto' }}>
            <Table style={{ border: 'none' }}>
              <table>
                <thead>
                  <tr>
                    <th>Position</th>
                    <th>Name</th>
                    <th>Participants</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {schoolLeaderboard?.items?.map((school, index) => (
                    <tr key={index}>
                      <td>
                        <Position position={index + 1} />
                      </td>
                      <td>
                        {capitalizeFirstLetterOFEachWord(school?.name ?? '')}
                      </td>
                      <td>
                        {thousandFormatter(school.totalParticipants ?? 0)}
                      </td>
                      <td>{thousandFormatter(school.totalScore ?? 0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Table>
          </DesktopTableWrapper>
          {schoolLeaderboard?.items?.map((school, index) => (
            <Box className="leader-board-cards" key={index}>
              <LeaderboardCard
                name={school?.name ?? ''}
                pointLabel="Score"
                point={thousandFormatter(school.totalScore ?? 0)}
                position={index + 1}
              />
            </Box>
          ))}
          <PaginationWrapper>
            <FlexiPagination
              pageCounts={pageOptions}
              total={schoolLeaderboard?.count}
              pageSize={limit}
              onChange={(page: number) => {
                setPage(page);
                setOffset(page - 1);
              }}
              changePageSize={({ value }: { value: number }) => {
                setLimit(value);
              }}
              current={page}
              style={{ margin: '0' }}
            />
          </PaginationWrapper>
        </ScoreContainer>
      ) : (
        <EmptyState
          image={<img src={FolderIcon} alt="folder_icon" />}
          title="No University Ranking Available"
          description="There are no ranking available at the moment. Check back when quizathon is ongoing."
        />
      )}
    </>
  );

  return (
    <>
      <Nav>
        <div
          onClick={() => navigate(-1)}
          style={{ cursor: 'pointer', flex: 'flex-start' }}
        >
          <i className="saf-arrow-left-2" />
          <Text>Back</Text>
        </div>
      </Nav>
      <Spacer space="40px" />
      <Container>
        <Box className="leader-board">
          <Text className="leader-board-text">Quizathon Leaderboard </Text>
        </Box>

        <Spacer space="20px" />

        {activeView === 'university' && (
          <Grid default="repeat(3, auto)" md="1fr">
            <Input
              type="text"
              iconLeft="saf-search-normal"
              placeholder="Search by school name"
              block
              onChange={({
                target: { value },
              }: {
                target: { value: string };
              }) => setSearchText(value)}
            />
            <Box />
            <Box />
          </Grid>
        )}

        <Spacer space="20px" />

        <LeaderBoardContent>
          {isLoadingLeaderBoard ||
          isLoadingRanking ||
          isLoadingSchoolLeaderboard ? (
            <Skeleton height={400} />
          ) : (
            <>
              <TabContainer>
                <TabButton
                  active={activeView === 'score'}
                  onClick={() => toggleView('score')}
                >
                  Score
                </TabButton>
                <TabButton
                  active={activeView === 'accuracy'}
                  onClick={() => toggleView('accuracy')}
                >
                  Accuracy
                </TabButton>
                <TabButton
                  active={activeView === 'university'}
                  onClick={() => toggleView('university')}
                >
                  University
                </TabButton>
              </TabContainer>
              <Spacer space="5px" />

              <TabPanel active={activeView === 'score'}>
                <Box label="Score">
                  <ScoreLeaderboardContent />
                </Box>
              </TabPanel>

              <TabPanel active={activeView === 'accuracy'}>
                <Box label="Accuracy">
                  <AccuracyLeaderboardContent />
                </Box>
              </TabPanel>

              <TabPanel active={activeView === 'university'}>
                <Box label="University">
                  <UniversityLeaderboardContent />
                </Box>
              </TabPanel>
            </>
          )}
        </LeaderBoardContent>
      </Container>
    </>
  );
};

const Container = styled(Box)`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 5px 30px;
  flex-direction: column;

  & .leader-board {
    background: #1d4ed8;
    border-radius: 8px;
    padding: 20px 15px;
    width: 100%;

    @media ${devices.tablet} {
      padding: 40px 50px;
    }
  }

  & .leader-board-text {
    color: #ffff;
    font-size: 18px;
    font-weight: 600;

    @media ${devices.tablet} {
      font-size: 32px;
    }
  }

  & .input-box {
    width: 100%;

    @media ${devices.tablet} {
      width: 30%;
      margin-left: auto;
    }
  }

  @media ${devices.tablet} {
    width: 70%;
    margin: 0 auto;
  }

  & .desktop-style {
    display: none;
    @media ${devices.tablet} {
      display: block;
      max-height: 530px;
      overflow-y: scroll;
    }
  }

  & .mobile-style {
    display: block;
    table td {
      padding: 10px 5px;
    }
    max-height: 700px;
    overflow-y: scroll;
    @media ${devices.tablet} {
      display: none;
    }
  }

  & .text-elipse {
    white-space: wrap;
    text-overflow: ellipsis;
  }
`;
const Nav = styled(Box)`
  padding: 20px 30px;
  box-shadow: 0 4px 2px -2px #e0e0e0;
`;

export default LeaderBoard;
