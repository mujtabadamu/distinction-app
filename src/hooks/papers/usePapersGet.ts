import { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPapersStart } from '../../redux/papers/reducer';
import { GetPapersPayload } from '../../redux/papers/typings';
import usePaginationWrapper from '../general/usePaginationWrapper';
import {
  selectIsFetchingPapers,
  selectPapersList,
} from '../../redux/papers/selectors';
const usePapersGet = ({
  examId,
  subjectId,
  examGroupId,
  curriculum,
}: GetPapersPayload) => {
  const dispatch = useDispatch();
  const isFetching = useSelector(selectIsFetchingPapers);
  const papers = useSelector(selectPapersList);
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
  const fetchPapers = useCallback(() => {
    dispatch(
      fetchPapersStart({
        ...(examId ? { examId } : {}),
        ...(subjectId ? { subjectId } : {}),
        ...(examGroupId ? { examGroupId } : {}),
        ...(curriculum ? { curriculum } : {}),
        ...(searchText ? { keyword: debouncedSearchText } : {}),
        page: page - 1,
        size: limit,
      })
    );
  }, [
    examId,
    page,
    limit,
    subjectId,
    examGroupId,
    debouncedSearchText,
    curriculum,
  ]);
  const increaseSize = useCallback(() => {
    if (!papers) return;
    if (page && page >= papers?.pages) return;
    setPage(page + 1);
  }, [limit, page, papers]);

  useEffect(() => {
    fetchPapers();
  }, [
    dispatch,
    examId,
    page,
    limit,
    subjectId,
    examGroupId,
    debouncedSearchText,
    fetch,
    curriculum,
  ]);
  return {
    loadingPapers: isFetching,
    increaseSize,
    papers,
    listOfPapers: papers?.items,
    refetch,
    fetch,
    searchText,
    setSearchText,
    fetchPapers,
    page,
    setPage,
    limit,
    setLimit,
    setOffset,
    pageOptions,
  };
};
export default usePapersGet;
