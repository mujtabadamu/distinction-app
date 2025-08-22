import { useEffect } from 'react';
import { useEnhancedGetQuestionStatisticsQuery } from '../../store/enhancedApi';

interface IUseLearningStatisticsQuery {
  paperId: string | undefined;
}

const useGetSingleTotalQuestion = ({
  paperId,
}: IUseLearningStatisticsQuery) => {
  const {
    data: totalSingleQuestion,
    isLoading,
    refetch,
  } = useEnhancedGetQuestionStatisticsQuery(
    {
      paperId: paperId || '',
    },
    {
      skip: !paperId, // Skip the query if paperId is not provided
    }
  );

  useEffect(() => {
    if (paperId) {
      refetch();
    }
  }, [paperId, refetch]);

  return {
    totalSingleQuestion: totalSingleQuestion?.totalQuestions || 0,
    isLoading,
  };
};

export default useGetSingleTotalQuestion;
