import { useEnhancedGetScoreTotalQuery } from '../../store/enhancedApi';

interface IUserOverviewStatisticsQuery {
  examGroupId?: string | undefined;
  paperId?: string | undefined;
  year?: string | undefined;
}

const useOverviewStatisticsQuery = ({
  examGroupId,
  paperId,
  year,
}: IUserOverviewStatisticsQuery) => {
  // Use the available score statistics endpoint instead of the non-existent user endpoint
  const {
    data: scoreStatistics,
    isLoading: loadingOverview,
    error,
  } = useEnhancedGetScoreTotalQuery(
    {
      examGroupId,
      paperId,
      subjectId: undefined, // Add if needed
      date: year ? `${year}-01-01` : undefined,
    },
    {
      skip: !examGroupId && !paperId && !year,
    }
  );

  // Return default values if there's an error or no data
  if (error || !scoreStatistics) {
    return {
      loadingOverview: false,
      overview: {
        score: {
          totalScore: 0,
          totalQuestions: 0,
        },
        activity: {
          totalTime: 0,
        },
      },
    };
  }

  // Transform the available data to match the expected format
  return {
    loadingOverview,
    overview: {
      score: {
        totalScore: scoreStatistics.totalScore || 0,
        totalQuestions: scoreStatistics.totalQuestions || 0,
      },
      activity: {
        totalTime: 0, // This would need to come from a different endpoint
      },
    },
  };
};

export default useOverviewStatisticsQuery;
