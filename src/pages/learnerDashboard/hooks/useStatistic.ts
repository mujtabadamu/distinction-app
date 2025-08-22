import { useState } from 'react';
import {
  useEnhancedGetMonthlyPracticeQuery,
  useEnhancedGetScoreTotalQuery,
  useEnhancedGetTimeStatsQuery,
} from '../../../store/enhancedApi';

type MonthlyPracticeProps = { userId: string; year?: number };

interface UseStatisticProps {
  date?: string;
  examGroupId?: string;
  paperId?: string;
  subjectId?: string;
}

const useStatistic = (props: UseStatisticProps = {}) => {
  const { date, examGroupId, paperId, subjectId } = props;
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const [currentYear, setCurrentYear] = useState<number | undefined>(undefined);

  // RTK Query hooks for statistics
  const {
    data: monthlyPractice,
    isLoading: isLoadingMonthlyStats,
    // refetch: refetchMonthlyStats,
  } = useEnhancedGetMonthlyPracticeQuery(
    {
      userId: currentUserId,
      ...(currentYear && { year: currentYear }),
    },
    {
      skip: !currentUserId, // Skip if no userId
    }
  );

  const {
    data: scoreStats,
    isLoading: isLoadingScoreStats,
    refetch: refetchScoreStats,
  } = useEnhancedGetScoreTotalQuery({});

  const {
    data: timeStats,
    isLoading: isLoadingTimeStats,
    refetch: refetchTimeStats,
  } = useEnhancedGetTimeStatsQuery({
    date,
    examGroupId,
    paperId,
    subjectId,
  });

  const getMonthlyPracticeStats = async (payload: MonthlyPracticeProps) => {
    setCurrentUserId(payload.userId);
    if (payload.year) {
      setCurrentYear(payload.year);
    }
    // The query will automatically run when currentUserId or currentYear changes
  };

  const getScoreStats = async () => {
    try {
      await refetchScoreStats();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const getTimeStats = async () => {
    try {
      await refetchTimeStats();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  return {
    getMonthlyPracticeStats,
    isLoadingMonthlyStats,
    monthlyPractice,
    getScoreStats,
    isLoadingScoreStats,
    scoreStats,
    timeStats,
    isLoadingTimeStats,
    getTimeStats,
  };
};

export default useStatistic;
