import { useEnhancedGetCurrentUserStreakStatusQuery } from 'store/enhancedApi';

const useStreak = () => {
  const {
    data: streakStats,
    isLoading: isLoadingStreakStats,
    refetch: getStreakStats,
  } = useEnhancedGetCurrentUserStreakStatusQuery();

  return {
    streakStats,
    isLoadingStreakStats,
    getStreakStats,
  };
};

export default useStreak;
