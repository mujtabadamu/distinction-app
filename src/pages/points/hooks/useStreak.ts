import { StreakService } from 'generated/index';
import { useDispatch, useSelector } from 'react-redux';
import { apiWrapper } from 'utils/http-client';
import { setStreakStats, setLoadingStreakStats } from './streakSlice';
import { RootState } from 'redux/store';

const useStreak = () => {
  const dispatch = useDispatch();
  const { streakStats, isLoadingStreakStats } = useSelector(
    (state: RootState) => state.streak
  );

  const getStreakStats = async () => {
    dispatch(setLoadingStreakStats(true));
    try {
      const data = await apiWrapper(() =>
        StreakService.getCurrentUserStreakStatus()
      );
      dispatch(setStreakStats(data));
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    } finally {
      dispatch(setLoadingStreakStats(false));
    }
  };

  return {
    streakStats,
    isLoadingStreakStats,
    getStreakStats,
  };
};

export default useStreak;
