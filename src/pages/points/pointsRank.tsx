import { useEffect, useState } from 'react';
import {
  Grid,
  Box,
  Spacer,
  Text,
  Table,
  FlexiPagination,
  PageTitle,
} from '@flexisaf/flexibull2';
import FolderIcon from 'assets/images/folder.svg';
import UsersIcon from 'assets/images/UsersFour.svg';
import RankingBanner from './components/RankingBanner';
import RankingCard from 'pages/quizathon/components/RankingCard';
import BreadCrumbs from 'components/breadcrumb';
import {
  LeaderBoardContent,
  ScoreContainer,
} from 'pages/quizathon/components/QuizathonStatsPanel';
import {
  TabButton,
  TabContainer,
  TabPanel,
} from 'pages/learnerDashboard/dashboardTab';
import EmptyState from 'components/emptyState/emptyState';
import { PaginationWrapper } from 'pages/learnerDashboard/tabs/availableCourses';
import Position from 'components/statusTag/position';
import usePaginationWrapper from 'hooks/general/usePaginationWrapper';
import {
  capitalizeFirstLetterOFEachWord,
  thousandFormatter,
} from 'utils/helpers';
import useProfile from 'pages/profile/hooks/useProfile';
import Skeleton from 'react-loading-skeleton';
import LeaderboardCard from 'components/cards/leaderboard-card';
import { DesktopTableWrapper } from 'styles/dashboard/dashboard.styles';
import {
  useEnhancedGetSchoolRankingQuery,
  useEnhancedGetGlobalRankingQuery,
} from 'store/enhancedApi';

type ViewType = 'institution' | 'global';

const PointsRank = () => {
  const [activeView, setActiveView] = useState<ViewType>('institution');

  const { limit, page, setPage, setLimit, pageOptions, setOffset } =
    usePaginationWrapper({ defaultLimit: 10 });

  const toggleView = (value: ViewType) => {
    setActiveView(value);
    setPage(1);
  };

  const { profileData } = useProfile();

  // Institution ranking
  const schoolId = profileData?.schoolInformationView?.school?.id as string;
  const userId = profileData?.studentId;

  // School ranking
  const {
    data: schoolRanking,
    isLoading: isLoadingSchoolRanking,
    refetch: refetchSchoolRanking,
  } = useEnhancedGetSchoolRankingQuery(
    { schoolId, page, limit },
    { skip: activeView !== 'institution' || !schoolId }
  );

  // Global ranking
  const {
    data: globalRanking,
    isLoading: isLoadingGlobalRanking,
    refetch: refetchGlobalRanking,
  } = useEnhancedGetGlobalRankingQuery(
    { page, limit },
    { skip: activeView !== 'global' }
  );

  // Top institution students (top 3)
  const { data: topInstitutionRanking, isLoading: isLoadingTopStudents } =
    useEnhancedGetSchoolRankingQuery(
      { schoolId, limit: 3 },
      { skip: activeView !== 'institution' || !schoolId }
    );

  // Top distinction students (top 3)
  const {
    data: topDistinctionRanking,
    isLoading: isLoadingDistinctionTopStudents,
  } = useEnhancedGetGlobalRankingQuery(
    { limit: 3 },
    { skip: activeView !== 'global' }
  );

  // Individual stat (school/global)
  const {
    data: individualSchoolStat,
    isLoading: isLoadingIndividualSchoolStat,
  } = useEnhancedGetSchoolRankingQuery(
    { schoolId, userId, limit: 1 },
    { skip: activeView !== 'institution' || !schoolId || !userId }
  );
  const {
    data: individualGlobalStat,
    isLoading: isLoadingIndividualGlobalStat,
  } = useEnhancedGetGlobalRankingQuery(
    { userId },
    { skip: activeView !== 'global' || !userId }
  );

  const userRankingInfo = {
    schoolName: schoolRanking?.schoolName ?? '',
    participantName: individualSchoolStat?.ranking?.[0]?.username,
    totalScore: individualSchoolStat?.ranking?.[0]?.points,
    position: individualSchoolStat?.ranking?.[0]?.rank,
  };

  return (
    <Box pad="1.5rem">
      <PageTitle>Points Ranking</PageTitle>
      <BreadCrumbs
        links={[
          { path: `/dashboard`, text: 'Dashboard' },
          { path: `/points`, text: 'Points' },
        ]}
        last={'Rank'}
      />
      <TabContainer>
        <TabButton
          active={activeView === 'institution'}
          onClick={() => toggleView('institution')}
        >
          Institution Ranking
        </TabButton>
        <TabButton
          active={activeView === 'global'}
          onClick={() => toggleView('global')}
        >
          Global Ranking
        </TabButton>
      </TabContainer>
      <Spacer space={12} />
      <TabPanel active={activeView === 'institution'}>
        <Box label="Institution">
          <>
            {isLoadingTopStudents || isLoadingSchoolRanking ? (
              <Skeleton height={200} />
            ) : (
              <RankingBanner
                title={schoolRanking?.schoolName ?? 'School Name'}
                subtitle="Top three(3) leaders in your institution as at today."
                students={topInstitutionRanking?.ranking ?? []}
              />
            )}
            <Spacer space={24} />
            <Grid
              default="1fr 2fr"
              md="1fr"
              gap="24px"
              style={{ alignItems: 'flex-start' }}
            >
              {isLoadingIndividualSchoolStat ? (
                <Skeleton height={400} />
              ) : (
                <RankingCard
                  participantInfo={
                    individualSchoolStat?.ranking?.[0]
                      ? userRankingInfo
                      : undefined
                  }
                  enableCertificateDownload={false}
                  scoreLabel="Points"
                  positionLabel="Rank"
                  shareContent={{
                    title: 'Points Ranking',
                    text: `Check out my distinction school ranking, I am ranked ${schoolRanking?.userRanking?.rank}. Think you can beat my rank? Join the challenge and prove it!`,
                    url: window.location.href,
                  }}
                  emptyStateDescription="Your ranking will be available when you've earned points."
                />
              )}

              {isLoadingSchoolRanking ? (
                <Skeleton height={400} />
              ) : (
                <LeaderBoardContent>
                  <Box
                    display="flex"
                    style={{ alignItems: 'center', gap: '10px' }}
                  >
                    <img src={UsersIcon} alt="users_icon" />
                    <Text size="1rem">
                      <b>
                        {thousandFormatter(
                          schoolRanking?.pagination?.count ?? 0
                        )}
                      </b>{' '}
                      Student(s)
                    </Text>
                  </Box>
                  {(schoolRanking?.ranking?.length ?? 0) > 0 ? (
                    <ScoreContainer>
                      <DesktopTableWrapper style={{ overflowX: 'auto' }}>
                        <Table>
                          <table>
                            <thead>
                              <tr>
                                <th>Position</th>
                                <th>Name</th>

                                <th>Points</th>
                              </tr>
                            </thead>
                            <tbody>
                              {schoolRanking?.ranking?.map((user, index) => (
                                <tr key={index}>
                                  <td>
                                    <Position position={Number(user.rank)} />
                                  </td>
                                  <td>
                                    {capitalizeFirstLetterOFEachWord(
                                      user.username ?? ''
                                    )}
                                  </td>

                                  <td>{thousandFormatter(user.points ?? 0)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </Table>
                      </DesktopTableWrapper>
                      {schoolRanking?.ranking?.map((user, index) => (
                        <Box className="leader-board-cards">
                          <LeaderboardCard
                            name={user?.username ?? ''}
                            pointLabel="Points"
                            point={`
                                            ${thousandFormatter(
                                              user.points ?? 0
                                            )}
                                         `}
                            position={Number(user.rank)}
                            key={index}
                          />
                        </Box>
                      ))}

                      <PaginationWrapper>
                        <FlexiPagination
                          pageCounts={pageOptions}
                          total={schoolRanking?.pagination?.count}
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
                      description="There are no points rankings available for your school yet. Start earning points to appear on the leaderboard"
                    />
                  )}
                </LeaderBoardContent>
              )}
            </Grid>
          </>
        </Box>
      </TabPanel>
      <TabPanel active={activeView === 'global'}>
        <Box label="Global">
          <>
            {isLoadingDistinctionTopStudents || isLoadingGlobalRanking ? (
              <Skeleton height={200} />
            ) : (
              <RankingBanner
                bannerHeadingText="GLOBAL RANKING"
                title="Current Global Leaders"
                subtitle="Top three(3) leaders on distinction platform as at today."
                students={topDistinctionRanking?.ranking ?? []}
              />
            )}
            <Spacer space={24} />
            <Grid
              default="1fr 2fr"
              md="1fr"
              gap="24px"
              style={{ alignItems: 'flex-start' }}
            >
              {isLoadingIndividualGlobalStat ? (
                <Skeleton height={400} />
              ) : (
                <RankingCard
                  participantInfo={
                    individualGlobalStat?.ranking?.[0]
                      ? userRankingInfo
                      : undefined
                  }
                  enableCertificateDownload={false}
                  scoreLabel="Points"
                  positionLabel="Rank"
                  shareContent={{
                    title: 'Points Ranking',
                    text: `Check out my distinction school ranking, I am ranked ${globalRanking?.userRanking?.rank}. Think you can beat my rank? Join the challenge and prove it!`,
                    url: window.location.href,
                  }}
                />
              )}

              {isLoadingGlobalRanking ? (
                <Skeleton height={400} />
              ) : (
                <LeaderBoardContent>
                  <Box
                    display="flex"
                    style={{ alignItems: 'center', gap: '10px' }}
                  >
                    <img src={UsersIcon} alt="users_icon" />
                    <Text size="1rem">
                      <b>
                        {thousandFormatter(
                          globalRanking?.pagination?.count ?? 0
                        )}
                      </b>{' '}
                      Student(s)
                    </Text>
                  </Box>
                  {(globalRanking?.ranking?.length ?? 0) > 0 ? (
                    <ScoreContainer>
                      <DesktopTableWrapper style={{ overflowX: 'auto' }}>
                        <Table>
                          <table>
                            <thead>
                              <tr>
                                <th>Position</th>
                                <th>Name</th>

                                <th>Points</th>
                              </tr>
                            </thead>
                            <tbody>
                              {globalRanking?.ranking?.map((user, index) => (
                                <tr key={index}>
                                  <td>
                                    <Position position={Number(user.rank)} />
                                  </td>
                                  <td>
                                    {capitalizeFirstLetterOFEachWord(
                                      user.username ?? ''
                                    )}
                                  </td>

                                  <td>{thousandFormatter(user.points ?? 0)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </Table>
                      </DesktopTableWrapper>
                      {globalRanking?.ranking?.map((user, index) => (
                        <Box className="leader-board-cards">
                          <LeaderboardCard
                            name={capitalizeFirstLetterOFEachWord(
                              user?.username ?? ''
                            )}
                            pointLabel="Points"
                            point={`${thousandFormatter(user.points ?? 0)}`}
                            position={Number(user.rank)}
                            key={index}
                          />
                        </Box>
                      ))}
                      <PaginationWrapper>
                        <FlexiPagination
                          pageCounts={pageOptions}
                          total={globalRanking?.pagination?.count}
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
                      description="There are no points rankings available for you yet. Start earning points to appear on the leaderboard"
                    />
                  )}
                </LeaderBoardContent>
              )}
            </Grid>
          </>
        </Box>
      </TabPanel>
    </Box>
  );
};

export default PointsRank;
