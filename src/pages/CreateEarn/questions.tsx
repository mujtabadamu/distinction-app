import { ChangeEvent, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Text,
  Spacer,
  Grid,
  Select,
  Input,
  PageTitle,
  Table,
  DropDown,
  FlexiPagination,
  EmptyState,
} from '@flexisaf/flexibull2';
import Theme from '../../utils/theme';
import { OverviewWrapper } from '../learnerDashboard/tabs/overview';
import styled from 'styled-components';
import useCreateAndEarn from '../../hooks/createAndEarn/useCreateAndEarn';
import usePaginationWrapper from '../../hooks/general/usePaginationWrapper';
import { useNavigate } from 'react-router-dom';
import StatusTag from '../../components/statusTag/statusTag';
import moment from 'moment';
// import { usSelector } from 'react-redux';
// import { selectCurrentUser } from '../../redux/auth/selectors';
import { TruncateText } from './styles';

type FilterStatusProps = {
  label: string;
  value: string;
};

const Questions = () => {
  const [filterStatus, setFilterStatus] = useState<FilterStatusProps | null>(
    null
  );

  // const user = useSelector(selectCurrentUser);
  // const userId = user?.id;
  const navigate = useNavigate();

  const {
    getQuestionsStats,
    getQuestions,
    questionsList,
    // loadingQuestionStats,
    questionStats,
    questions,
  } = useCreateAndEarn();

  // useEffect(() => {
  //   getQuestionsStats({ userId });
  // }, []);

  const {
    limit,
    setOffset,
    setLimit,
    totalElements,
    setPageable,
    page,
    pageOptions,
    searchText,
    debouncedSearchText,
    setSearchText,
  } = usePaginationWrapper({ defaultLimit: 10 });

  useEffect(() => {
    if (questions) {
      setPageable({
        total_elements: questions?.count,
        total_pages: questions?.pages,
        number_of_elements: questions?.items?.length,
      });
    }
  }, [questions, setPageable]);

  useEffect(() => {
    const data = {
      size: limit,
      keyword: debouncedSearchText,
      status: filterStatus?.value,
      // userId,
    };
    // getQuestions(data);
  }, [limit, debouncedSearchText, filterStatus]);

  return (
    <Box pad="10px 40px">
      <PageTitle>
        <Text size="16px" title="My questions" color={Theme.PrimaryColor}>
          Content created
        </Text>
      </PageTitle>
      <Box display="flex" style={{ justifyContent: 'space-between' }}>
        <Button
          plain
          onClick={() => navigate('/home')}
          iconLeft={<i className="saf-arrow-left" />}
        >
          Back
        </Button>
        <Button onClick={() => navigate('/create-question')}>
          Create questions
        </Button>
      </Box>
      <Spacer space="10px" />

      <Text bold size="1.5rem">
        My Questions
      </Text>
      <Spacer space="20px" />

      <OverviewWrapper>
        <div className="stats-box">
          <StatsCard>
            <div className="content">
              <Text bold size="2rem">
                {questionStats?.totalQuestions}
              </Text>
              <br />
              <Text size="0.9rem" color={Theme.PrimaryBlue}>
                Questions created
              </Text>
            </div>
          </StatsCard>
          <StatsCard>
            <div className="content">
              <Text bold size="2rem">
                {/* {questionStats?.pendingQuestions} */}
              </Text>
              <br />
              <Text size="0.9rem" color={Theme.PrimaryOrange}>
                Questions pending
              </Text>
            </div>
          </StatsCard>
          <StatsCard>
            <div className="content">
              <Text bold size="2rem">
                {/* {questionStats?.approvedQuestions} */}
              </Text>
              <br />
              <Text size="0.9rem" color={Theme.PrimaryGreen}>
                Questions approved
              </Text>
            </div>
          </StatsCard>
          <StatsCard>
            <div className="content">
              <Text bold size="2rem">
                {/* {questionStats?.declinedQuestions} */}
              </Text>
              <br />
              <Text size="0.9rem" color={Theme.PrimaryRed}>
                Questions declined
              </Text>
            </div>
          </StatsCard>
        </div>
      </OverviewWrapper>

      <Spacer space="50px" />
      <Grid default="auto max-content auto auto" sm="1fr">
        <Select
          placeholder="Pending questions"
          label="Filter"
          isClearable
          options={[
            { label: 'Approved', value: 'APPROVED' },
            { label: 'Pending', value: 'PENDING' },
            { label: 'Declined', value: 'DECLINED' },
          ]}
          block
          value={filterStatus}
          onChange={(value: FilterStatusProps) => setFilterStatus(value)}
        />
        <Box />
        <Box />
        <Input
          placeholder="Search"
          value={searchText}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchText(e.target.value)
          }
          block
        />
      </Grid>
      <Spacer space="30px" />
      <Box
        pad="10px 0"
        style={{ borderBottom: `1px solid ${Theme.PrimaryBorderColor}` }}
      >
        <Text>Questions</Text>
      </Box>
      {questionsList && questionsList?.length > 0 ? (
        <>
          <Table>
            <table>
              <thead>
                <th>Content</th>
                <th>Date created</th>
                <th>Status</th>
                {/* <th>Ratings</th> */}
                <th>Actions</th>
              </thead>
              <tbody>
                {questionsList?.map((question) => {
                  return (
                    <tr key={question.id}>
                      <td>
                        <TruncateText maxLength={300}>
                          {question.paperName}
                        </TruncateText>
                        <br />
                        <TruncateText maxLength={200}>
                          {question.text}
                        </TruncateText>
                        <br />
                        <TruncateText maxLength={100}>
                          {question.topic}
                        </TruncateText>
                      </td>

                      <td>{moment(question.createdAt).format('DD-MM-YYYY')}</td>
                      <td>
                        <StatusTag status={question.status}>
                          {question.status}
                        </StatusTag>
                      </td>
                      {/* column for rating */}
                      {/* <td></td> */}
                      <td>
                        <DropDown
                          label={
                            <Button
                              color={Theme.PrimaryFade}
                              fontColor={Theme.PrimaryGrey}
                              pad="0 10px"
                              icon={<i className="saf-more" />}
                            />
                          }
                          menuAlign="bottom right"
                          // menuList={handleMenu(exam)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Table>
          <FlexiPagination
            pageCounts={pageOptions}
            itemsDisplayed
            total={totalElements}
            pageSize={limit}
            onChange={(page: number) => setOffset(page - 1)}
            changePageSize={({ value }: { value: number }) => setLimit(value)}
            current={page}
          />
        </>
      ) : (
        <EmptyState
          type="customers"
          title="Question will appear here, after you create them"
        />
      )}
    </Box>
  );
};

export default Questions;

const StatsCard = styled.div`
  min-height: 8rem;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  & .content {
    margin: 0 auto;
  }
`;
