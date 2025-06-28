import { useEffect, useState, useMemo } from 'react';
import {
  Box,
  Grid,
  Text,
  Table,
  FlexiPagination,
  Spacer,
  Select,
} from '@flexisaf/flexibull2';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import UsersIcon from 'assets/images/UsersFour.svg';
import FolderIcon from 'assets/images/folder.svg';
import RankingCard from './RankingCard';
import Position from 'components/statusTag/position';
import EmptyState from 'components/emptyState/emptyState';
import { PaginationWrapper } from 'pages/learnerDashboard/tabs/availableCourses';
import { OptionI } from 'components/quizPopUp/popUp';
import {
  TabButton,
  TabContainer,
  TabPanel,
} from 'pages/learnerDashboard/dashboardTab';
import {
  capitalizeFirstLetterOFEachWord,
  thousandFormatter,
} from 'utils/helpers';
import useQuizathon from '../hooks/useQuizathon';
import { selectCurrentUser } from 'redux/auth/selectors';
import usePaginationWrapper from 'hooks/general/usePaginationWrapper';
import { generateDailyFilterOptions } from 'utils/helpers';
import InfoBanner from 'components/infoBanner/InfoBanner';
import LeaderboardCard from 'components/cards/leaderboard-card';
import { DesktopTableWrapper } from 'styles/dashboard/dashboard.styles';
import { Quizathon } from 'generated/index';

export type ViewType = 'score' | 'accuracy' | 'university';

interface IProps {
  singleQuizathon: Quizathon | null;
}
const QuizathonStatsPanel = ({ singleQuizathon }: IProps) => {
  const [activeView, setActiveView] = useState<ViewType>('accuracy');
  const user = useSelector(selectCurrentUser);
  const [selectedDayFilter, setSelectedDayFilter] = useState<OptionI | null>(
    null
  );
  const studentId = user?.id as string;
  const {
    isLoadingSingleLeaderBoard,
    singleLeaderBoardData,
    getIndividualLeaderboardStat,
    getParticipantStats,
    isLoadingParticipantStats,
    participantStats,
    getQuizathonHistory,
    quizathonHistory,
    getQuizathonDailyLeaderBoard,
    dailyLeaderBoard,
    isLoadingDailyLeaderBoard,
    getAccuracyLeaderboard,
    rankingData,
    isLoadingRanking,
    getSchoolLeaderboard,
    schoolLeaderboard,
    isLoadingSchoolLeaderboard,
    getLeaderboard,
    leaderBoardData,
    getActiveQuizathon,
    isLoadingLeaderBoard,
  } = useQuizathon();

  const {
    limit,
    page,
    setPage,
    debouncedSearchText,
    setLimit,
    pageOptions,
    setOffset,
  } = usePaginationWrapper({ defaultLimit: 10 });
  const startingIndex = (page - 1) * limit;

  const toggleView = (value: ViewType) => {
    setActiveView(value);
    setPage(1);
  };
  const [selectPastQuizathon, setSelectPastQuizathon] =
    useState<OptionI | null>(null);

  const quizathonId = selectPastQuizathon?.value ?? singleQuizathon?.id;
  const historySelectOption = quizathonHistory?.items?.map((item) => {
    return {
      label: item.title || '',
      value: item.id || '',
    };
  });
  // Effect for individual leaderboard stats (accuracy and score)
  useEffect(() => {
    if (!studentId) return;

    const payload = { studentId, quizathonId };
    const useAccuracyStats = activeView === 'accuracy';
    getIndividualLeaderboardStat(payload, useAccuracyStats);
    getActiveQuizathon();
    getParticipantStats({ studentId });
  }, [activeView, studentId, quizathonId]);

  // Effect for leaderboard data and history
  useEffect(() => {
    if (!studentId) return;

    // Fetch different leaderboards based on active view
    const payload = { page: page - 1, quizathonId };

    if (activeView === 'score') {
      if (selectedDayFilter?.value === null) {
        getLeaderboard({
          page: page - 1,
          quizathonId,
        });
      } else {
        getQuizathonDailyLeaderBoard({
          page: page - 1,
          quizathonId,
          date: selectedDayFilter?.value,
        });
      }
    } else if (activeView === 'university') {
      getSchoolLeaderboard(payload);
    } else {
      getAccuracyLeaderboard(payload);
    }
  }, [
    debouncedSearchText,
    page,
    limit,
    activeView,
    studentId,
    quizathonId,
    selectedDayFilter?.value,
  ]);

  useEffect(() => {
    getQuizathonHistory({
      studentId,
      page: page - 1,
      size: limit,
      ...(debouncedSearchText?.trim() && {
        keyword: debouncedSearchText.trim(),
      }),
    });
  }, []);

  const selectedQuizathonData = quizathonHistory?.items?.find(
    (item) => item.id === quizathonId
  );
  const participantCount = selectedQuizathonData?.totalParticipants || 0;
  const dailyFilterOptions = useMemo(() => {
    const activeQuizathonToUse = selectedQuizathonData || singleQuizathon;
    if (!activeQuizathonToUse) return [];
    return generateDailyFilterOptions(
      activeQuizathonToUse?.startAt as string,
      activeQuizathonToUse.stopAt as string
    );
  }, [selectedQuizathonData, singleQuizathon]);

  useEffect(() => {
    if (dailyFilterOptions) {
      setSelectedDayFilter(dailyFilterOptions[0] as OptionI);
    }
  }, [dailyFilterOptions]);

  const ParticipantCount = () => (
    <Box display="flex" style={{ alignItems: 'center', gap: '10px' }}>
      <img src={UsersIcon} alt="users_icon" />
      <Text size="1rem">
        <b>{thousandFormatter(participantCount)}</b> Participant(s)
      </Text>
    </Box>
  );

  // Score leaderboard content
  const ScoreLeaderboardContent = () => (
    <>
      <Grid
        default="max-content max-content"
        gap="10px"
        style={{ justifyContent: 'space-between' }}
      >
        <ParticipantCount />
      </Grid>
      {selectedDayFilter?.value ? (
        <>
          {dailyLeaderBoard?.items?.length ? (
            <DesktopTableWrapper style={{ overflowX: 'auto' }}>
              <Table style={{ border: 'none' }}>
                <table>
                  <thead>
                    <tr>
                      {/* <th>Position</th> */}
                      <th>Name</th>
                      <th>Institution</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dailyLeaderBoard.items?.map((user, index) => (
                      <tr key={index}>
                        {/* <td>
                      <Position position={Number(index + 1)} />
                    </td> */}
                        <td>{`${user.userInfo?.firstName} ${user.userInfo?.lastName}`}</td>
                        <td>{user.schoolInformation?.school?.name}</td>
                        <td>
                          {thousandFormatter(user.totalScores ?? 0)}/
                          {thousandFormatter(user.totalQuestionsAttempted ?? 0)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Table>
              <PaginationWrapper>
                <FlexiPagination
                  pageCounts={pageOptions}
                  total={dailyLeaderBoard?.count}
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
            </DesktopTableWrapper>
          ) : (
            <EmptyState
              image={<img src={FolderIcon} alt="folder_icon" />}
              title="No Leaderboard Available"
              description={`There are no ongoing quizathon or you haven't registered for any. Check your history for previous quizathons.`}
            />
          )}
        </>
      ) : (
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
                          <td>
                            {capitalizeFirstLetterOFEachWord(
                              user?.participantName ?? ''
                            )}
                          </td>
                          <td>
                            {capitalizeFirstLetterOFEachWord(
                              user?.schoolName ?? ''
                            )}
                          </td>
                          <td>
                            {thousandFormatter(user.totalScore ?? 0)}/
                            {thousandFormatter(
                              user.totalAttemptedQuestions ?? 0
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Table>
              </DesktopTableWrapper>

              {leaderBoardData.items?.map((user, index) => (
                <Box className="leader-board-cards">
                  <LeaderboardCard
                    name={capitalizeFirstLetterOFEachWord(
                      user?.participantName ?? ''
                    )}
                    pointLabel="Points"
                    point={`${thousandFormatter(user.totalScore ?? 0)}
                    /
                    ${thousandFormatter(user.totalAttemptedQuestions ?? 0)}`}
                    position={Number(user.position)}
                    key={index}
                  ></LeaderboardCard>
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
              description={`There are no ongoing activeQuizathons or you haven't registered for any. Check your history for previous activeQuizathons.`}
            />
          )}
        </>
      )}
    </>
  );

  // Accuracy leaderboard content
  const AccuracyLeaderboardContent = () => (
    <>
      <Box
        display="flex"
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <ParticipantCount />
      </Box>
      <Spacer space={'10px'} />

      <InfoBanner
        bgColor="#E7E7FF"
        style={{ padding: '10px', marginBottom: '0px' }}
        infoText={
          <>
            <Text>
              <span className="font-extrabold">Important Notice: </span>
              Leaderboard rankings are not final. The official results will be
              announced based on the stated Quizathon criteria
            </Text>
          </>
        }
        icon="saf-information"
      />

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
                      <td>
                        {capitalizeFirstLetterOFEachWord(
                          user.participantName ?? ''
                        )}
                      </td>
                      <td>
                        {capitalizeFirstLetterOFEachWord(user.schoolName ?? '')}
                      </td>
                      <td>{user.accuracy}%</td>
                      <td>
                        {thousandFormatter(user.totalScore ?? 0)}/
                        <Text size="0.6rem">
                          {thousandFormatter(user.totalAttemptedQuestions ?? 0)}
                        </Text>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Table>
          </DesktopTableWrapper>

          {rankingData.items?.map((user, index) => (
            <Box className="leader-board-cards">
              <LeaderboardCard
                name={capitalizeFirstLetterOFEachWord(
                  user?.participantName ?? ''
                )}
                pointLabel="Accuracy"
                point={`${user.accuracy}%`}
                position={Number(user.position)}
                key={index}
              ></LeaderboardCard>
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
          description="There are no ongoing activeQuizathons or you haven't registered for any. Check your history for previous activeQuizathons."
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
                        <Position position={startingIndex + index + 1} />
                      </td>
                      <td>{school.name}</td>
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
          {schoolLeaderboard.items?.map((school, index) => (
            <Box className="leader-board-cards">
              <LeaderboardCard
                name={school?.name ?? ''}
                pointLabel="Participant"
                point={`${school.totalParticipants}`}
                position={startingIndex + index + 1}
                key={index}
              ></LeaderboardCard>
            </Box>
          ))}
          <PaginationWrapper>
            <FlexiPagination
              pageCounts={pageOptions}
              total={schoolLeaderboard?.count}
              pageSize={limit}
              onChange={(page: number) => {
                setPage(page);
                setOffset((page - 1) * limit);
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
        <>
          <EmptyState
            image={<img src={FolderIcon} alt="folder_icon" />}
            title="No University Ranking Available"
            description="There are no ranking available at the moment. Check back when activeQuizathon is ongoing."
          />
        </>
      )}
    </>
  );

  return (
    <Grid
      default="1fr 2fr"
      md="1fr"
      gap="24px"
      style={{ alignItems: 'flex-start' }}
    >
      {/* Ranking Card */}
      {isLoadingSingleLeaderBoard || isLoadingParticipantStats ? (
        <Skeleton height={400} />
      ) : (
        <RankingCard
          participantInfo={singleLeaderBoardData}
          timeStats={participantStats?.timeElapsed}
          shareContent={{
            title: 'Quizathon Ranking',
            text: `Check out my ranking in the Quizathon! I am ranked ${singleLeaderBoardData?.position}. Think you can beat my rank? Join the challenge and prove it!`,
            url: window.location.href,
          }}
          // activeTab={activeView}
        />
      )}

      {/* Leaderboard content based on active tab */}
      <LeaderBoardContent>
        {isLoadingDailyLeaderBoard ||
        isLoadingRanking ||
        isLoadingLeaderBoard ||
        isLoadingSchoolLeaderboard ? (
          <Skeleton height={400} />
        ) : (
          <>
            <CustomSelect
              value={selectPastQuizathon || null}
              onChange={(value: { label: string; value: string }) => {
                setSelectPastQuizathon({
                  label: value.label,
                  value: value.value,
                });
              }}
              options={historySelectOption}
              placeholder="Select Past Quizathons"
            />
            {activeView === 'score' && (
              <CustomSelect
                value={selectedDayFilter || null}
                onChange={(value: { label: string; value: string }) => {
                  setSelectedDayFilter({
                    label: value.label,
                    value: value.value,
                  });
                }}
                options={dailyFilterOptions}
                placeholder="Filter Daily Quizathon"
              />
            )}
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
    </Grid>
  );
};

export default QuizathonStatsPanel;

export const LeaderBoardContent = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 1rem;
  overflow-x: auto;
`;

const CustomSelect = styled(Select)`
  width: 100%;
  margin-bottom: 10px;
  border-bottom: 1px solid #d9d9d9;
  & .flexi__single-value {
    color: #333333;
    font-weight: 500;
    font-size: 13px;
  }
  & .flexi__control {
    padding: 6px 0;
    background-color: #f7f7f7;
  }
`;

export const ScoreContainer = styled.div`
  margin-bottom: 5rem;

  .leader-board-cards {
    @media (min-width: 769px) {
      display: none;
    }
  }
`;
