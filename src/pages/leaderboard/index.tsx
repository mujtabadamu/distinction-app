import { useEffect, useState } from 'react';
import {
  Spacer,
  Text,
  Box,
  Table,
  Grid,
  FlexiPagination,
  Button,
} from '@flexisaf/flexibull2';
import devices from 'utils/devices';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import EmptyState from 'components/emptyState/emptyState';
import FolderIcon from 'assets/images/folder.svg';
import moment from 'moment';

import useQuizathon from 'pages/quizathon/hooks/useQuizathon';
import {
  amountToWords,
  capitalizeFirstLetterOFEachWord,
  formatDateTime,
  formatTimeToHour,
  thousandFormatter,
} from 'utils/helpers';
import usePaginationWrapper from 'hooks/general/usePaginationWrapper';
import { PaginationWrapper } from 'pages/learnerDashboard/tabs/availableCourses';
import { DesktopTableWrapper } from 'styles/dashboard/dashboard.styles';
import StatusIndicator from 'components/statusTag/statusPill';
import SectionLoader from 'components/custom/sectionLoader';

const LeaderBoard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const {
    limit,
    page,
    setPage,
    // debouncedSearchText,
    setLimit,
    pageOptions,
    setOffset,
  } = usePaginationWrapper({ defaultLimit: 10 });
  const { quizathonHistory } = useQuizathon();

  // Function to determine quizathon status based on start date
  const getQuizathonStatus = (startAt: string) => {
    if (!startAt) return 'Pending';

    const startDate = moment(startAt);
    const now = moment();

    // If start date is in the past, it's completed
    if (startDate.isBefore(now, 'day')) {
      return 'Completed';
    }

    // If start date is today, it's ongoing
    if (startDate.isSame(now, 'day')) {
      return 'Ongoing';
    }

    // If start date is in the future, it's upcoming
    return 'Upcoming';
  };

  const renderDesktopTable = () => {
    return (
      <div className="desktop-style">
        <DesktopTableWrapper style={{ overflowX: 'auto' }}>
          <Table style={{ border: 'none' }}>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Participants</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Price (₦)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {quizathonHistory?.items?.map((historyItem, index) => (
                  <tr key={index}>
                    <td>
                      {capitalizeFirstLetterOFEachWord(
                        historyItem?.title ?? ''
                      )}
                    </td>
                    <td>
                      {thousandFormatter(historyItem?.totalParticipants ?? 0)}
                    </td>
                    <td>{formatDateTime(historyItem.startAt ?? '', false)}</td>
                    <td>
                      <StatusIndicator
                        status={getQuizathonStatus(historyItem?.startAt ?? '')}
                      />
                    </td>
                    <td>{amountToWords(historyItem?.price ?? 0)}</td>

                    <td>
                      {getQuizathonStatus(historyItem?.startAt ?? '') ===
                        'Completed' ||
                      getQuizathonStatus(historyItem?.startAt ?? '') ===
                        'Ongoing' ? (
                        <Button
                          pale
                          pad="10px 20px"
                          style={{ width: '120px' }}
                          onClick={() =>
                            navigate(`/leaderboard/${historyItem?.id}`)
                          }
                        >
                          View Details
                        </Button>
                      ) : (
                        <Button
                          pad="10px 20px"
                          style={{ width: '120px' }}
                          onClick={() =>
                            navigate(`/quizathon-profile/${historyItem?.id}`)
                          }
                        >
                          Register
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Table>
        </DesktopTableWrapper>
      </div>
    );
  };

  const renderMobileCards = () => {
    return (
      <div className="mobile-style">
        <Grid default="repeat(2, auto)" md="1fr">
          {quizathonHistory?.items?.map((historyItem, index) => (
            <QuizathonCard key={index} className="quizathon-history-item">
              <Text className="title !text-[15px]">
                {capitalizeFirstLetterOFEachWord(historyItem?.title ?? '')}
                <div className="flex justify-center p-3">
                  <StatusIndicator
                    status={getQuizathonStatus(historyItem?.startAt ?? '')}
                  />
                </div>
              </Text>
              <Box className="body">
                <div className="flex flex-wrap justify-between items-center p-3">
                  <Box className="details-item">
                    <Box className="iconWrapper">
                      <i className="saf-calendar-1 text-[16px]" />
                    </Box>
                    <Text block>
                      {formatDateTime(historyItem.startAt ?? '', false)}
                    </Text>
                  </Box>
                  <Box className="details-item justify-end">
                    <Box className="iconWrapper">
                      <i className="saf-clock text-[16px]" />
                    </Box>
                    <Text block>
                      {formatTimeToHour(historyItem?.startAt ?? '')} -{' '}
                      {formatTimeToHour(historyItem?.stopAt ?? '')}
                    </Text>
                  </Box>
                </div>
                <div className="flex flex-wrap justify-between p-3">
                  <Box className="details-item">
                    <Box className="iconWrapper">
                      <i className="saf-empty-wallet text-[16px]" />
                    </Box>
                    <Text block>
                      {amountToWords(historyItem?.price ?? 0)} Naira
                    </Text>
                  </Box>
                  <Box className="details-item justify-end">
                    <Box className="iconWrapper">
                      <i className="saf-people text-[16px]" />
                    </Box>
                    <Text block>
                      {thousandFormatter(historyItem?.totalParticipants ?? 0)}{' '}
                      Participants
                    </Text>
                  </Box>
                </div>
              </Box>

              {getQuizathonStatus(historyItem?.startAt ?? '') === 'Completed' ||
              getQuizathonStatus(historyItem?.startAt ?? '') === 'Ongoing' ? (
                <Button
                  pad="20px"
                  style={{ width: '95%', margin: '10px' }}
                  width="100%"
                  onClick={() => navigate(`/leaderboard/${historyItem?.id}`)}
                  pale
                >
                  View Details
                </Button>
              ) : (
                <Button
                  pad="10px 20px"
                  style={{ width: '95%', margin: '10px' }}
                  onClick={() =>
                    navigate(`/quizathon-profile/${historyItem?.id}`)
                  }
                >
                  Register
                </Button>
              )}
            </QuizathonCard>
          ))}
        </Grid>
      </div>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <>
          <SectionLoader />
        </>
      );
    }

    if (!quizathonHistory?.items?.length) {
      return (
        <EmptyState
          image={<img src={FolderIcon} alt="folder_icon" />}
          title="No Quizathon"
          description="There are no quizathon available at the moment."
        />
      );
    }

    return (
      <>
        {renderDesktopTable()}
        {renderMobileCards()}
        <PaginationWrapper>
          <FlexiPagination
            pageCounts={pageOptions}
            total={quizathonHistory?.count}
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
      </>
    );
  };

  const renderHeader = () => {
    return (
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContents: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <img
          src="/Batches.svg"
          alt="image_banner"
          className="w-full max-w-[300px] h-auto"
        />
        <Box className="leader-board">
          <Text className="font-[700] !text-3xl md:!text-5xl">
            Distinction Campus <br /> Quizathon
            <Text color="#1D4ED8"> Leaderboard</Text>
          </Text>
        </Box>
        <Text block className="leader-board-text !text-md md:!text-base">
          View all positions of participants of ongoing and completed
          quizathon(s) based on score, accuracy and university{' '}
        </Text>
      </Box>
    );
  };
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
        {renderHeader()}
        <Spacer space="20px" />

        {renderContent()}

        <Spacer space="20px" />
      </Container>
    </>
  );
};

const QuizathonCard = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #e9f0f4;
  margin: 5px 0px;
  background: #fff;
  width: 100%;
  border-radius: 8px;
  cursor: pointer;

  .title {
    background: #e4e4e747;
    width: 100%;
    font-weight: 500;
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 3px 10px;
    color: #000;
    border-radius: 8px 8px 0px 0px;
  }
  .body {
    width: 100%;
    padding: 10px;
    font-weight: 400;
    font-size: 16px;
    color: #000;
    border-radius: 0px 0px 8px 8px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  & .details-item {
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    gap: 2px;
    font-size: 13px;
    color: #000;
    font-weight: 500;
    margin-right: 10px;
    width: 45%;
    & .iconWrapper {
      background: #f3f4f6;
      border-radius: 5px;
      height: 22px;
      width: 22px;
      display: flex;
      align-items: center;
    }
    svg {
      background: #f1efef;
    }
  }
`;

const Container = styled(Box)`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 5px 30px;
  flex-direction: column;

  & .input-box {
    width: 100%;

    @media ${devices.tablet} {
      margin-left: auto;
    }
  }

  @media ${devices.tablet} {
    margin: 0 auto;
  }

  & .desktop-style {
    display: none;
    @media ${devices.tablet} {
      display: block;
    }
  }

  & .mobile-style {
    display: block;
    table td {
      padding: 10px 5px;
    }
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
