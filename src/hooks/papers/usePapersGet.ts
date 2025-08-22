import { useCallback, useState } from 'react';
import { useGetPapersQuery } from '../../store/result';
import usePaginationWrapper from '../general/usePaginationWrapper';

interface GetPapersPayload {
  examId?: string;
  subjectId?: string;
  page?: number;
  size?: number;
  examGroupId?: string;
  keyword?: string;
  curriculum?: string;
}

const usePapersGet = ({
  examId,
  subjectId,
  examGroupId,
  curriculum,
}: GetPapersPayload) => {
  const [fetch, setFetch] = useState(0);
  const refetch = () => setFetch((prev) => prev + 1);

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

  // Build query parameters
  // const queryParams = {
  //   ...(examId ? { examId } : {}),
  //   ...(subjectId ? { subjectId } : {}),
  //   ...(examGroupId ? { examGroupId } : {}),
  //   ...(curriculum ? { curriculum } : {}),
  //   ...(debouncedSearchText ? { keyword: debouncedSearchText } : {}),
  //   page: page - 1,
  //   size: limit,
  // };

  // Use RTK Query hook - removed skip condition to match original behavior
  const { data: papers, isLoading: loadingPapers } = useGetPapersQuery({
    page: page - 1,
    size: limit,
    keyword: debouncedSearchText,
    curriculum: curriculum as 'NUC' | 'NBTE' | 'NCCE' | 'OTHERS',
    examGroupId,
    examId,
    subjectId,
  });

  const increaseSize = useCallback(() => {
    if (!papers) return;
    if (page && page >= (papers?.pages ?? 0)) return;
    setPage(page + 1);
  }, [limit, page, papers]);

  return {
    loadingPapers,
    increaseSize,
    papers,
    listOfPapers: papers?.items,
    refetch,
    fetch,
    searchText,
    setSearchText,
    page,
    setPage,
    limit,
    setLimit,
    setOffset,
    pageOptions,
  };
};

export default usePapersGet;
