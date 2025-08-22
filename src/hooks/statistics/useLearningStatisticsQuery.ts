import { useEnhancedGetUserStatisticsQuery } from '../../store/enhancedApi';
import usePaginationWrapper from '../general/usePaginationWrapper';

interface IUseLearningStatisticsQuery {
  date?: string | undefined;
  paperId?: string | undefined;
}

const useLearningStatisticsQuery = ({
  date,
  paperId,
}: IUseLearningStatisticsQuery) => {
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

  // Use enhanced RTK Query hook with error handling
  const {
    data: learningStatistics,
    isLoading: loadingLearningStats,
    error,
  } = useEnhancedGetUserStatisticsQuery(
    {
      paperId,
      date,
      page: page - 1,
      size: limit,
    },
    {
      skip: !paperId && !date,
    }
  );

  // Return default values if there's an error (like 404)
  if (error) {
    return {
      loadingLearningStats: false,
      learningStats: {
        recentPapers: {
          count: 0,
          pages: 0,
          items: [],
        },
      },
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
  }

  // Update pagination when data changes
  if (learningStatistics?.recentPapers) {
    setPageable({
      total_elements: learningStatistics.recentPapers.count,
      total_pages: learningStatistics.recentPapers.pages,
      number_of_elements: learningStatistics.recentPapers.items?.length,
    });
  }

  return {
    loadingLearningStats,
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
