import {
  Text,
  Spacer,
  Grid,
  Box,
  Input,
  EmptyState,
} from '@flexisaf/flexibull2';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import usePracticeHistory from '../hooks';
import { useEffect, ChangeEvent } from 'react';
import moment from 'moment';
import SectionLoader from 'components/custom/sectionLoader';

const PracticeHistory = () => {
  const navigate = useNavigate();
  const {
    getPracticeCourse,
    loadingGroupedCourse,
    coursePractice,
    searchText,
    setSearchText,
    debouncedSearchText,
  } = usePracticeHistory();

  useEffect(() => {
    getPracticeCourse();
  }, [debouncedSearchText]);
  return (
    <>
      <Spacer space={30} />
      <Box maxWidth="400px">
        <Input
          type="text"
          iconRight="saf-search-normal"
          placeholder="Search"
          block
          value={searchText}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchText(e.target.value)
          }
          data-tour="practice-history-search"
        />
      </Box>

      <Spacer space={20} />
      {loadingGroupedCourse ? (
        <SectionLoader />
      ) : (coursePractice?.length || 0) > 0 ? (
        <Grid
          default="1fr 1fr"
          sm="1fr"
          md="1fr 1fr"
          gap="1.1rem"
          data-tour="practice-history-list"
        >
          {coursePractice?.map((courses) => {
            const practiceAttempts = courses.practiceCount;
            const practiceAccuracy =
              courses?.totalScore &&
              courses?.totalQuestion &&
              ((courses.totalScore / courses.totalQuestion) * 100).toFixed(2);
            return (
              <Card
                key={courses.paperId}
                onClick={() =>
                  navigate(`/course-practice-history/${courses.paperId}`, {
                    state: { practiceAccuracy, practiceAttempts },
                  })
                }
                data-tour="practice-history-card"
              >
                <Text size="1.3rem" style={{ fontWeight: '500' }}>
                  {courses.paperName}
                </Text>
                <CardDate>
                  Last update: {moment(courses.updatedAt).format('YYYY-MM-DD')}
                </CardDate>
                <CardContent>
                  <Text size="0.8rem">{practiceAttempts} Attempts</Text>
                  <Box className="dot" />
                  <Text size="0.8rem" color="#1D4ED8">
                    Accuracy: {practiceAccuracy}%
                  </Text>
                </CardContent>
              </Card>
            );
          })}
        </Grid>
      ) : (
        <Box align="center">
          <EmptyState title="No Courses Found" style={{ width: '100%' }} />
        </Box>
      )}
    </>
  );
};

export default PracticeHistory;

const Card = styled.div`
  width: 100%;
  border-radius: 5px;
  cursor: pointer;
  padding: 20px 15px;
  background-color: white;
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
`;
const CardDate = styled.h3`
  font-size: 0.9rem;
  font-weight: 400;
  margin-top: 10px;
`;
const CardContent = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  & .dot {
    width: 5px;
    height: 5px;
    background-color: black;
    border-radius: 50%;
  }
`;
