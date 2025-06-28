import {
  MonthlyPracticeDto,
  PointAccumulationSystemService,
  PortalStatisticsService,
  ScoreTotalStatisticsResponse,
  TimeStatisticsResponse,
} from 'generated/index';
import { useState } from 'react';
import { apiWrapper } from 'utils/http-client';

type MonthlyPracticeProps = { userId: string; year?: number };

const useStatistic = () => {
  const [monthlyPractice, setMonthlyPractice] =
    useState<MonthlyPracticeDto | null>(null);
  const [scoreStats, setScoreStats] =
    useState<ScoreTotalStatisticsResponse | null>(null);
  const [timeStats, setTimeStats] = useState<TimeStatisticsResponse | null>(
    null
  );

  const [isLoadingMonthlyStats, setIsLoadingMonthlyStats] =
    useState<boolean>(false);
  const [isLoadingScoreStats, setIsLoadingScoreStats] =
    useState<boolean>(false);
  const [isLoadingTimeStats, setIsLoadingTimeStats] = useState<boolean>(false);

  const getMonthlyPracticeStats = async (payload: MonthlyPracticeProps) => {
    setIsLoadingMonthlyStats(true);
    try {
      const data = await apiWrapper(() =>
        PointAccumulationSystemService.getMonthlyPractice({ ...payload })
      );
      setMonthlyPractice(data);
      setIsLoadingMonthlyStats(false);
    } catch (error) {
      setIsLoadingMonthlyStats(false);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const getScoreStats = async () => {
    setIsLoadingScoreStats(true);
    try {
      const data = await apiWrapper(() =>
        PortalStatisticsService.scoreTotal({})
      );
      setScoreStats(data);
      setIsLoadingScoreStats(false);
    } catch (error) {
      setIsLoadingScoreStats(false);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const getTimeStats = async () => {
    setIsLoadingTimeStats(true);
    try {
      const data = await apiWrapper(() => PortalStatisticsService.time({}));
      setTimeStats(data);
      setIsLoadingTimeStats(false);
    } catch (error) {
      setIsLoadingTimeStats(false);
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
