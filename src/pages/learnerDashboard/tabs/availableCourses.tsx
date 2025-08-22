import {
  Box,
  Grid,
  Table,
  Input,
  Select,
  Spacer,
  FlexiPagination,
  EmptyState,
} from '@flexisaf/flexibull2';
import Skeleton from 'react-loading-skeleton';
import { OptionI } from 'components/quizPopUp/popUp';
import useSubjects from 'hooks/general/useSubjects';
import usePapersGet from 'hooks/papers/usePapersGet';
import { useState } from 'react';
import devices from 'utils/devices';
// Type for paper - aligned with distinction-app
interface Paper {
  createdat: string;
  exam: {
    examGroupName: string;
    name: string;
    year: number;
    examGroupId: string;
  };
  subjectId: string;
  id: string;
  instruction: string;
  isActive: boolean;
  name: string;
  averageRating: number;
  subjectName: string;
}
import styled from 'styled-components';
import { capitalizeFirstLetterOFEachWord } from 'utils/helpers';
const AvailableCourses = () => {
  const [department, setDepartment] = useState<OptionI | null>(null);
  const {
    papers,
    loadingPapers,
    setSearchText,
    page,
    setPage,
    limit,
    setLimit,
    setOffset,
    pageOptions,
  } = usePapersGet({ subjectId: department?.value });

  const { isLoadingSubjects, subjectList } = useSubjects();

  return (
    <CourseWrapper>
      <Grid default="1fr 1fr 1fr" sm="1fr">
        <Input
          spaceTop
          type="text"
          iconLeft="saf-search-normal"
          placeholder="Search by course title"
          block
          onChange={({ target: { value } }: { target: { value: string } }) =>
            setSearchText(value)
          }
        />
        <Select
          block
          spaceTop
          placeholder="Filter by department"
          isLoading={isLoadingSubjects}
          value={department}
          onChange={(value: OptionI) => setDepartment(value)}
          options={subjectList?.map((subject) => {
            return {
              label: capitalizeFirstLetterOFEachWord(subject.name || ''),
              value: subject.id,
            };
          })}
        />
        <Box />
      </Grid>
      <Box>
        {loadingPapers ? (
          <>
            <Spacer space={14} />
            <Skeleton
              count={1}
              baseColor="#d0d5d933"
              highlightColor="#c2cad133"
              width="100%"
              height="30rem"
            />
          </>
        ) : papers?.items.length ? (
          <Box>
            <Table>
              <table>
                <thead>
                  <tr>
                    <th>S/No</th>
                    <th>Course</th>
                    <th>Level</th>
                  </tr>
                </thead>
                <tbody>
                  {papers.items.map((paper: Paper, index) => (
                    <tr key={paper.id}>
                      <td>{index + 1}</td>
                      <td>{paper.name}</td>
                      <td>{paper.exam.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Table>
            <PaginationWrapper>
              <FlexiPagination
                pageCounts={pageOptions}
                total={papers?.count}
                pageSize={limit}
                onChange={(page: number) => {
                  setPage(page);
                  setOffset(page - 1);
                }}
                changePageSize={({ value }: { value: number }) =>
                  setLimit(value)
                }
                current={page}
                style={{ margin: '0' }}
              />
            </PaginationWrapper>
          </Box>
        ) : (
          <Box align="center">
            <EmptyState
              title="No course found"
              info="We are working on adding more courses, bear with us"
              style={{ width: '100%' }}
            />
          </Box>
        )}
      </Box>
    </CourseWrapper>
  );
};

export default AvailableCourses;

export const CourseWrapper = styled(Box)`
  margin-bottom: 5rem;
  @media ${devices.tablet} {
    margin-bottom: 0;
  }
`;
export const PaginationWrapper = styled.div`
  margin-top: -10px;
  overflow-x: auto;
`;
