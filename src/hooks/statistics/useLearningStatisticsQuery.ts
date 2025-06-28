import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchLearningStatisticsStart } from '../../redux/statistics/reducer';
import {
  selectIsFetchingLearningStatistics,
  selectLearningStatistics,
} from '../../redux/statistics/selectors';
import usePaginationWrapper from 'hooks/general/usePaginationWrapper';

interface IUseLearningStatisticsQuery {
  date?: string | undefined;
  paperId?: string | undefined;
}

const useLearningStatisticsQuery = ({
  date,
  paperId
}: IUseLearningStatisticsQuery) => {
  const dispatch = useDispatch();
  const isFetchingLearningStatistics = useSelector(
    selectIsFetchingLearningStatistics
  );
  const learningStatistics = useSelector(selectLearningStatistics);
  const {
    limit,
    offset,
    setOffset,
    setLimit,
    totalElements,
    totalPages,
    numberOfElements,
    setPageable,
    page,
    setPage,
    pageOptions,
  } = usePaginationWrapper({ defaultLimit: 10 });

  const getLearningStatistics = useCallback(() => {
    dispatch(
      fetchLearningStatisticsStart({
        data: {
          recentPapersData: { paperId, date , size:limit,  page: (page - 1), },
          scoreData: { paperId , date  },
          timeSpent: { paperId , date},
        },
      })
    );
  }, [paperId, date,page,limit]);

  useEffect(() => {
    if (learningStatistics) {
      setPageable({
        total_elements: learningStatistics?.recentPapers?.count,
        total_pages: learningStatistics?.recentPapers?.pages,
        number_of_elements: learningStatistics?.recentPapers?.items?.length,
      });
    }
  }, [learningStatistics, setPageable ]);

  useEffect(() => {
    getLearningStatistics();
  }, [paperId, date , page ]);

  return {
    loadingLearningStats: isFetchingLearningStatistics,
    learningStats: learningStatistics,
    limit,
    offset,
    setOffset,
    setLimit,
    totalElements,
    totalPages,
    numberOfElements,
    setPageable,
    page,
    setPage,
    pageOptions,
  };
};

export default useLearningStatisticsQuery;
