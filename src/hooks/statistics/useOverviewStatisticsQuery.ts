import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchOverviewStatisticsStart } from '../../redux/statistics/reducer';
import {
  selectIsFetchingOverviewStatistics,
  selectOverviewStatistics,
} from '../../redux/statistics/selectors';

interface IUserOverviewStatisticsQuery {
  examGroupId?: string | undefined;
  paperId?: string | undefined;
  year?: string | undefined;
}

const useOverviewStatisticsQuery = ({
  examGroupId,
  paperId,
  year
}: IUserOverviewStatisticsQuery) => {
  const dispatch = useDispatch();
  const isFetchingOverviewStatistics = useSelector(
    selectIsFetchingOverviewStatistics
  );
  const overviewStatistics = useSelector(selectOverviewStatistics);

  const getOverviewStatistics = useCallback(() => {
    dispatch(
      fetchOverviewStatisticsStart({
        data: {
          recentPapersData: { paperId },
          scoreData: { paperId   },
          timeSpent: { paperId },
          questionCountByYearData: { year },
        },
      })
    );
  }, [examGroupId , paperId,year]);

  useEffect(() => {
    getOverviewStatistics();
  }, [examGroupId, paperId,year]);

  return {
    loadingOverview: isFetchingOverviewStatistics,
    overview: overviewStatistics,
  };
};

export default useOverviewStatisticsQuery;
