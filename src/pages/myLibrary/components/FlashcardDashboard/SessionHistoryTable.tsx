import React from 'react';
import { Table, EmptyState, Box, Text } from '@flexisaf/flexibull2';
import FlashcardSessionStatusTag from 'components/statusTag/flashcardSessionStatusTag';
import styled from 'styled-components';
import { formatDateTime } from 'utils/helpers';
import { FlashcardSessionView } from 'generated/index';

interface SessionHistoryTableProps {
  sessions: FlashcardSessionView[];
  loading?: boolean;
}

const getStatus = (status: string) => {
  if (!status) return 'N/A';
  if (status === 'COMPLETED') return 'COMPLETED';
  if (status === 'ABANDONED') return 'ABANDONED';
  return 'STARTED';
};

const MobileScreen = styled.div`
  display: block;
  @media (min-width: 1024px) {
    display: none;
  }
`;

const DesktopScreen = styled.div`
  display: none;
  @media (min-width: 1024px) {
    display: block;
  }
`;

const MobileCard = styled.div`
  border-radius: 5px;
  border: 1px solid #bdbdbd;
  color: #707070;
  margin-bottom: 15px;
  background: #fff;
  box-shadow: 0 2px 8px 0 #101a3312;
  padding: 16px;
`;

const CardRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
  &:last-child {
    border-bottom: none;
  }
`;

const CardTitle = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
`;

const SessionHistoryTable: React.FC<SessionHistoryTableProps> = ({
  sessions,
  loading = false,
}) => {
  if (loading) {
    return (
      <Box align="center" padding="40px">
        <Text>Loading session history...</Text>
      </Box>
    );
  }

  if (!sessions || sessions.length === 0) {
    return (
      <Box align="center">
        <EmptyState
          title="No Session History"
          info="You have not completed any flashcard sessions yet."
          style={{ width: '100%' }}
        />
      </Box>
    );
  }

  return (
    <>
      <MobileScreen>
        {sessions.map((session, idx) => (
          <MobileCard key={session.id}>
            <CardTitle>{session.flashcardTitle || 'Unknown'}</CardTitle>
            <CardRow>
              <Text size="12px">S/No</Text>
              <Text size="12px">{idx + 1}</Text>
            </CardRow>
            <CardRow>
              <Text size="12px">Difficulty</Text>
              <Text size="12px">
                {session.flashcardDifficulty || 'Unknown'}
              </Text>
            </CardRow>
            <CardRow>
              <Text size="12px">Start Time</Text>
              <Text size="12px">
                {session.sessionStart
                  ? formatDateTime(session.sessionStart)
                  : '--'}
              </Text>
            </CardRow>
            <CardRow>
              <Text size="12px">End Time</Text>
              <Text size="12px">
                {session.sessionEnd ? formatDateTime(session.sessionEnd) : '--'}
              </Text>
            </CardRow>
            <CardRow>
              <Text size="12px">Cards Studied</Text>
              <Text size="12px">{session.totalCardsStudied || 0}</Text>
            </CardRow>
            <CardRow>
              <Text size="12px">Cards Skipped</Text>
              <Text size="12px">{session.cardsSkipped || 0}</Text>
            </CardRow>
            <CardRow>
              <Text size="12px">Time Spent</Text>
              <Text size="12px">
                {Math.round(session.totalTimeSpentSeconds || 0)}s
              </Text>
            </CardRow>
            <CardRow>
              <Text size="12px">Avg Time/Card</Text>
              <Text size="12px">
                {typeof session.averageTimePerCardSeconds === 'number'
                  ? session.averageTimePerCardSeconds.toFixed(2) + 's'
                  : '--'}
              </Text>
            </CardRow>
            <CardRow>
              <Text size="12px">Completion %</Text>
              <Text size="12px">
                {typeof session.completionPercentage === 'number'
                  ? session.completionPercentage.toFixed(1) + '%'
                  : '--'}
              </Text>
            </CardRow>
            <CardRow>
              <Text size="12px">Status</Text>
              <FlashcardSessionStatusTag
                status={getStatus(session.sessionStatus || '')}
              >
                {session.sessionStatus
                  ? session.sessionStatus.charAt(0) +
                    session.sessionStatus.slice(1).toLowerCase()
                  : 'Unknown'}
              </FlashcardSessionStatusTag>
            </CardRow>
          </MobileCard>
        ))}
      </MobileScreen>
      <DesktopScreen>
        <StyledTableWrapper>
          <Table>
            <table>
              <thead>
                <tr>
                  <th>S/No</th>
                  <th>Title</th>
                  <th>Difficulty</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Cards Studied</th>
                  <th>Cards Skipped</th>
                  <th>Time Spent</th>
                  <th>Avg Time/Card</th>
                  <th>Completion %</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((session, idx) => (
                  <StyledRow key={session.id}>
                    <td>{idx + 1}</td>
                    <td>{session.flashcardTitle || 'Unknown'}</td>
                    <td>{session.flashcardDifficulty || 'Unknown'}</td>
                    <td>
                      {session.sessionStart
                        ? formatDateTime(session.sessionStart)
                        : '--'}
                    </td>
                    <td>
                      {session.sessionEnd
                        ? formatDateTime(session.sessionEnd)
                        : '--'}
                    </td>
                    <td>{session.totalCardsStudied || 0}</td>
                    <td>{session.cardsSkipped || 0}</td>
                    <td>{Math.round(session.totalTimeSpentSeconds || 0)}s</td>
                    <td>
                      {typeof session.averageTimePerCardSeconds === 'number'
                        ? session.averageTimePerCardSeconds.toFixed(2) + 's'
                        : '--'}
                    </td>
                    <td>
                      {typeof session.completionPercentage === 'number'
                        ? session.completionPercentage.toFixed(1) + '%'
                        : '--'}
                    </td>
                    <td>
                      <FlashcardSessionStatusTag
                        status={getStatus(session.sessionStatus || '')}
                      >
                        {session.sessionStatus
                          ? session.sessionStatus.charAt(0) +
                            session.sessionStatus.slice(1).toLowerCase()
                          : 'Unknown'}
                      </FlashcardSessionStatusTag>
                    </td>
                  </StyledRow>
                ))}
              </tbody>
            </table>
          </Table>
        </StyledTableWrapper>
      </DesktopScreen>
    </>
  );
};

const StyledTableWrapper = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px 0 #101a3312;
  padding: 24px;
  margin-bottom: 24px;
  overflow-x: auto;
`;

const StyledRow = styled.tr`
  border-bottom: 1px solid #f0f0f0;
  &:last-child {
    border-bottom: none;
  }
  td {
    padding: 14px 8px;
    vertical-align: middle;
  }
`;

export default SessionHistoryTable;
