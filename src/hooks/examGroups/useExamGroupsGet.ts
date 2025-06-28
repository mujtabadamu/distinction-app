import { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchExamGroupsStart,
  setIsFilteringGroups,
  setActiveExamGroup as setActiveExamGroupReducer,
} from '../../redux/examGroups/reducer';
import {
  selectIsFetchingExamGroups,
  selectIsFilteringExamGroups,
  selectGroups,
  selectActiveExamGroup,
} from '../../redux/examGroups/selectors';
import { ActiveExamGroup } from '../../redux/examGroups/typings';

const useExamGroupsGet = () => {
  const dispatch = useDispatch();
  const isFetching = useSelector(selectIsFetchingExamGroups);
  const isFiltering = useSelector(selectIsFilteringExamGroups);
  const activeExamGroup = useSelector(selectActiveExamGroup);
  const groups = useSelector(selectGroups);
  const [fetch, setFetch] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setPageSize] = useState(3);
  const refetch = () => setFetch((prev) => prev + 1);

  const setActiveExamGroup = (examGroup: ActiveExamGroup | null) => {
    dispatch(setActiveExamGroupReducer(examGroup));
  };

  const fetchExamGroups = useCallback(() => {
    if (groups?.items?.length > 0) {
      dispatch(setIsFilteringGroups(true));
    }
    dispatch(fetchExamGroupsStart({ page: (page - 1) * size, size }));
  }, [dispatch, page, size]);

  useEffect(() => {
    fetchExamGroups();
  }, [fetchExamGroups, fetch, page, size]);

  return {
    loadingExamGroups: isFetching,
    filteringExamGroups: isFiltering,
    examGroups: groups,
    setPage,
    page,
    size,
    setPageSize,
    refetch,
    activeExamGroup,
    setActiveExamGroup,
  };
};

export default useExamGroupsGet;
