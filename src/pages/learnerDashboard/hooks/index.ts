import { useState } from 'react';
import { apiWrapper } from 'utils/http-client';
import {
  PortalStudentPapersService,
  PracticeHistoryGroupView,
  PaginatedStudentPaperSimpleView,
  PaginatedStudentPaperSolutionWithAnswersView,
  StudentResultView,
} from 'generated/index';
import usePaginationWrapper from 'hooks/general/usePaginationWrapper';

const usePracticeHistory = () => {
  const {
    limit,
    searchText,
    page,
    setPage,
    debouncedSearchText,
    setLimit,
    setSearchText,
    pageOptions,
    setOffset,
  } = usePaginationWrapper({ defaultLimit: 10 });
  const [loadingGroupedCourse, setLoadingGroupedCourse] =
    useState<boolean>(false);
  const [loadingPracticePaper, setLoadingPracticePaper] =
    useState<boolean>(false);
  const [loadingPracticeSolution, setLoadingPracticeSolution] =
    useState<boolean>(false);
  const [loadingPracticedResult, setLoadingPracticedResult] =
    useState<boolean>(false);

  const [practicePaper, setPracticePaper] =
    useState<PaginatedStudentPaperSimpleView | null>(null);
  const [coursePractice, setCoursePractice] = useState<
    PracticeHistoryGroupView[] | null
  >(null);
  const [practiceSolution, setPracticeSolution] =
    useState<PaginatedStudentPaperSolutionWithAnswersView | null>(null);
  const [practicedResult, setPracticedResult] =
    useState<StudentResultView | null>(null);

  const getPracticeCourse = async (paperId?: string) => {
    setLoadingGroupedCourse(true);
    try {
      const data = await apiWrapper(() =>
        PortalStudentPapersService.groupPracticesByCourse({
          keyword: debouncedSearchText,
          paperId: paperId,
        })
      );
      setCoursePractice(data);
      setLoadingGroupedCourse(false);
    } catch (error) {
      setLoadingGroupedCourse(false);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const getPracticePaper = async (paperId: string) => {
    setLoadingPracticePaper(true);
    true;
    try {
      const data = await apiWrapper(() =>
        PortalStudentPapersService.listPracticesByPaperId({
          page: page - 1,
          size: limit,
          paperId: paperId,
        })
      );
      setPracticePaper(data);
      setLoadingPracticePaper(false);
    } catch (error) {
      setLoadingPracticePaper(false);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const getPracticeSolution = async (studentPaperId: string) => {
    setLoadingPracticeSolution(true);
    try {
      const data = await apiWrapper(() =>
        PortalStudentPapersService.getStudentAnswerSolutions({
          page: page - 1,
          size: -1,
          studentPaperId,
        })
      );
      setPracticeSolution(data);
      setLoadingPracticeSolution(false);
    } catch (error) {
      setLoadingGroupedCourse(false);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const getPracticedResult = async (studentPaperId: string) => {
    setLoadingPracticedResult(true);
    try {
      const data = await apiWrapper(() =>
        PortalStudentPapersService.retrieveResult({
          id: studentPaperId,
        })
      );
      setPracticedResult(data);
      setLoadingPracticedResult(false);
    } catch (error) {
      setLoadingGroupedCourse(false);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  return {
    loadingGroupedCourse,
    coursePractice,
    getPracticeCourse,
    limit,
    searchText,
    page,
    setPage,
    debouncedSearchText,
    setLimit,
    setSearchText,
    pageOptions,
    setOffset,
    getPracticePaper,
    practicePaper,
    loadingPracticePaper,
    getPracticeSolution,
    loadingPracticeSolution,
    practiceSolution,
    practicedResult,
    getPracticedResult,
    loadingPracticedResult,
  };
};
export default usePracticeHistory;
