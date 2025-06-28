import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from 'redux/auth/selectors';
import {
  FlashcardDashboardControllerService,
  FlashcardSessionControllerService,
  FlashcardUsageControllerService,
  FlashcardSessionView,
  // FlashcardUsageView,
  FlashcardUsageRequest,
  FlashcardSessionRequest,
  // FlashcardDashboardView,
  DailyTrend,
  SessionOutcomes,
  Achievement,
  WeeklySummary,
  StudyStreak,
  // FlashcardUsageStatisticsView,
  OverviewMetrics,
} from 'generated/index';
import { apiWrapper } from 'utils/http-client';
import { handleError } from 'utils/errorHandlers';
import usePaginationWrapper from 'hooks/general/usePaginationWrapper';

// Dashboard Overview
export const useFlashcardDashboardOverview = () => {
  const user = useSelector(selectCurrentUser);
  const [overview, setOverview] = useState<OverviewMetrics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOverview = useCallback(async () => {
    if (!user?.id) return;

    setLoading(true);
    setError(null);

    try {
      const data = await apiWrapper(() =>
        FlashcardDashboardControllerService.getDashboardOverview({
          studentId: user.id,
        })
      );
      setOverview(data.overview || null);
    } catch (err) {
      setError('Failed to fetch dashboard overview');
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchOverview();
  }, [fetchOverview]);

  return { overview, loading, error, refetch: fetchOverview };
};

// Dashboard Trends
export const useFlashcardTrends = () => {
  const user = useSelector(selectCurrentUser);
  const [trends, setTrends] = useState<DailyTrend[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTrends = useCallback(async () => {
    if (!user?.id) return;

    setLoading(true);
    setError(null);

    try {
      const data = await apiWrapper(() =>
        FlashcardDashboardControllerService.getStudyTrends({
          studentId: user.id,
        })
      );
      setTrends(data || []);
    } catch (err) {
      setError('Failed to fetch trends data');
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchTrends();
  }, [fetchTrends]);

  return { trends, loading, error, refetch: fetchTrends };
};

// Session Outcomes
export const useFlashcardSessionOutcomes = () => {
  const user = useSelector(selectCurrentUser);
  const [outcomes, setOutcomes] = useState<SessionOutcomes | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOutcomes = useCallback(async () => {
    if (!user?.id) return;

    setLoading(true);
    setError(null);

    try {
      const data = await apiWrapper(() =>
        FlashcardDashboardControllerService.getSessionOutcomes({
          studentId: user.id,
        })
      );
      setOutcomes(data);
    } catch (err) {
      setError('Failed to fetch session outcomes');
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchOutcomes();
  }, [fetchOutcomes]);

  return { outcomes, loading, error, refetch: fetchOutcomes };
};

// Achievements
export const useFlashcardAchievements = () => {
  const user = useSelector(selectCurrentUser);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAchievements = useCallback(async () => {
    if (!user?.id) return;

    setLoading(true);
    setError(null);

    try {
      const data = await apiWrapper(() =>
        FlashcardDashboardControllerService.getAchievements({
          studentId: user.id,
        })
      );
      setAchievements(data || []);
    } catch (err) {
      setError('Failed to fetch achievements');
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchAchievements();
  }, [fetchAchievements]);

  return { achievements, loading, error, refetch: fetchAchievements };
};

// Weekly Summary
export const useFlashcardWeeklySummary = (weekStart?: string) => {
  const user = useSelector(selectCurrentUser);
  const [weeklySummary, setWeeklySummary] = useState<WeeklySummary | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeeklySummary = useCallback(async () => {
    if (!user?.id) return;

    setLoading(true);
    setError(null);

    try {
      const data = await apiWrapper(() =>
        FlashcardDashboardControllerService.getWeeklySummary({
          studentId: user.id,
          weekStart,
        })
      );
      setWeeklySummary(data);
    } catch (err) {
      setError('Failed to fetch weekly summary');
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, [user?.id, weekStart]);

  useEffect(() => {
    fetchWeeklySummary();
  }, [fetchWeeklySummary]);

  return { weeklySummary, loading, error, refetch: fetchWeeklySummary };
};

// Study Streak
export const useFlashcardStreak = () => {
  const user = useSelector(selectCurrentUser);
  const [streak, setStreak] = useState<StudyStreak | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStreak = useCallback(async () => {
    if (!user?.id) return;

    setLoading(true);
    setError(null);

    try {
      const data = await apiWrapper(() =>
        FlashcardDashboardControllerService.getStudyStreak({
          studentId: user.id,
        })
      );
      setStreak(data);
    } catch (err) {
      setError('Failed to fetch streak data');
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchStreak();
  }, [fetchStreak]);

  return { streak, loading, error, refetch: fetchStreak };
};

// Session History with Pagination
export const useFlashcardSessionHistory = (defaultLimit = 10) => {
  const user = useSelector(selectCurrentUser);
  const [sessions, setSessions] = useState<FlashcardSessionView[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { limit, setLimit, page, setPage, pageOptions, setOffset } =
    usePaginationWrapper({ defaultLimit });

  const fetchSessionHistory = useCallback(async () => {
    if (!user?.id) return;

    setLoading(true);
    setError(null);

    try {
      const data = await apiWrapper(() =>
        FlashcardDashboardControllerService.getSessionHistory({
          studentId: user.id,
          page: page - 1, // API is 0-indexed
          size: limit,
        })
      );

      if (Array.isArray(data)) {
        setSessions(data);
        setTotalCount(data.length);
      } else if (data && typeof data === 'object' && 'content' in data) {
        setSessions((data as any).content);
        setTotalCount((data as any).count || (data as any).content.length);
      } else {
        setSessions([]);
        setTotalCount(0);
      }
    } catch (err) {
      setError('Failed to fetch session history');
      handleError(err);
      setSessions([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, [user?.id, page, limit]);

  useEffect(() => {
    fetchSessionHistory();
  }, [fetchSessionHistory]);

  return {
    sessions,
    totalCount,
    loading,
    error,
    refetch: fetchSessionHistory,
    limit,
    setLimit,
    page,
    setPage,
    pageOptions,
    setOffset,
  };
};

// Session Management
export const useFlashcardSessionManagement = () => {
  const user = useSelector(selectCurrentUser);
  const [currentSession, setCurrentSession] =
    useState<FlashcardSessionView | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startSession = useCallback(
    async (flashcardId?: string) => {
      if (!user?.id) return;

      setLoading(true);
      setError(null);

      try {
        const requestBody: FlashcardSessionRequest = {
          studentId: user.id,
          flashcardId,
        };

        const session = await apiWrapper(() =>
          FlashcardSessionControllerService.startSession({ requestBody })
        );
        setCurrentSession(session);
        return session;
      } catch (err) {
        setError('Failed to start session');
        handleError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [user?.id]
  );

  const endSession = useCallback(
    async (
      sessionId: string,
      status: 'ACTIVE' | 'COMPLETED' | 'PAUSED' | 'ABANDONED'
    ) => {
      if (!sessionId) return;

      setLoading(true);
      setError(null);

      try {
        const session = await apiWrapper(() =>
          FlashcardSessionControllerService.endSession({ sessionId, status })
        );
        setCurrentSession(session);
        return session;
      } catch (err) {
        setError('Failed to end session');
        handleError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const pauseSession = useCallback(async (sessionId: string) => {
    if (!sessionId) return;

    setError(null);

    try {
      const session = await apiWrapper(() =>
        FlashcardSessionControllerService.pauseSession({ sessionId })
      );
      setCurrentSession(session);
      return session;
    } catch (err) {
      setError('Failed to pause session');
      handleError(err);
      throw err;
    }
  }, []);

  const resumeSession = useCallback(async (sessionId: string) => {
    if (!sessionId) return;

    setError(null);

    try {
      const session = await apiWrapper(() =>
        FlashcardSessionControllerService.resumeSession({ sessionId })
      );
      setCurrentSession(session);
      return session;
    } catch (err) {
      setError('Failed to resume session');
      handleError(err);
      throw err;
    }
  }, []);

  const abandonSession = useCallback(async (sessionId: string) => {
    if (!sessionId) return;

    setLoading(true);
    setError(null);

    try {
      const session = await apiWrapper(() =>
        FlashcardSessionControllerService.abandonSession({ sessionId })
      );
      setCurrentSession(session);
      return session;
    } catch (err) {
      setError('Failed to abandon session');
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getActiveSession = useCallback(
    async (flashcardId: string) => {
      if (!user?.id || !flashcardId) return null;

      try {
        const session = await apiWrapper(() =>
          FlashcardSessionControllerService.getActiveSession({
            studentId: user.id,
            flashcardId,
          })
        );
        setCurrentSession(session);
        return session;
      } catch (err) {
        // 404 means no active session, which is not an error
        if ((err as any)?.status === 404) {
          return null;
        }
        setError('Failed to get active session');
        handleError(err);
        throw err;
      }
    },
    [user?.id]
  );

  const updateSessionStats = useCallback(async (sessionId: string) => {
    if (!sessionId) return;

    try {
      const session = await apiWrapper(() =>
        FlashcardSessionControllerService.updateSessionStatistics({ sessionId })
      );
      setCurrentSession(session);
      return session;
    } catch (err) {
      setError('Failed to update session stats');
      handleError(err);
      throw err;
    }
  }, []);

  const getSessionStatistics = useCallback(async () => {
    if (!user?.id) return null;

    try {
      const stats = await apiWrapper(() =>
        FlashcardSessionControllerService.getSessionStatistics({
          studentId: user.id,
        })
      );
      return stats;
    } catch (err) {
      setError('Failed to get session statistics');
      handleError(err);
      throw err;
    }
  }, [user?.id]);

  return {
    currentSession,
    loading,
    error,
    startSession,
    endSession,
    pauseSession,
    resumeSession,
    abandonSession,
    getActiveSession,
    updateSessionStats,
    getSessionStatistics,
  };
};

// Usage Tracking
export const useFlashcardUsageTracking = () => {
  const user = useSelector(selectCurrentUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const recordUsage = useCallback(
    async (usageData: FlashcardUsageRequest) => {
      if (!user?.id) {
        console.warn('Cannot record usage: User not authenticated');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const result = await apiWrapper(() =>
          FlashcardUsageControllerService.recordUsage({
            requestBody: usageData,
          })
        );
        return result;
      } catch (err) {
        setError('Failed to record usage');
        handleError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [user?.id]
  );

  const getUsageByStudent = useCallback(async () => {
    if (!user?.id) return [];

    try {
      const usage = await apiWrapper(() =>
        FlashcardUsageControllerService.getUsageByStudent({
          studentId: user.id,
        })
      );
      return usage;
    } catch (err) {
      setError('Failed to fetch usage data');
      handleError(err);
      throw err;
    }
  }, [user?.id]);

  const countActionsByStudent = useCallback(
    async (actionType: 'TAP_TO_FLIP' | 'SKIP' | 'COMPLETE') => {
      if (!user?.id) return 0;

      try {
        const count = await apiWrapper(() =>
          FlashcardUsageControllerService.countActionsByStudent({
            studentId: user.id,
            actionType,
          })
        );
        return count;
      } catch (err) {
        setError('Failed to count actions');
        handleError(err);
        throw err;
      }
    },
    [user?.id]
  );

  return {
    loading,
    error,
    recordUsage,
    getUsageByStudent,
    countActionsByStudent,
  };
};

// Comprehensive Dashboard Hook
export const useFlashcardDashboard = () => {
  const overview = useFlashcardDashboardOverview();
  const trends = useFlashcardTrends();
  const outcomes = useFlashcardSessionOutcomes();
  const achievements = useFlashcardAchievements();
  const weeklySummary = useFlashcardWeeklySummary();
  const streak = useFlashcardStreak();
  const sessionHistory = useFlashcardSessionHistory();
  const sessionManagement = useFlashcardSessionManagement();
  const usageTracking = useFlashcardUsageTracking();

  const isLoading =
    overview.loading ||
    trends.loading ||
    outcomes.loading ||
    achievements.loading ||
    weeklySummary.loading ||
    streak.loading;

  const hasError =
    overview.error ||
    trends.error ||
    outcomes.error ||
    achievements.error ||
    weeklySummary.error ||
    streak.error;

  return {
    // Data
    overview: overview.overview,
    trends: trends.trends,
    outcomes: outcomes.outcomes,
    achievements: achievements.achievements,
    weeklySummary: weeklySummary.weeklySummary,
    streak: streak.streak,
    sessionHistory: sessionHistory.sessions,
    totalSessionsCount: sessionHistory.totalCount,

    // Loading states
    loading: isLoading,
    sessionHistoryLoading: sessionHistory.loading,
    sessionManagementLoading: sessionManagement.loading,
    usageTrackingLoading: usageTracking.loading,

    // Error states
    error: hasError,
    sessionHistoryError: sessionHistory.error,
    sessionManagementError: sessionManagement.error,
    usageTrackingError: usageTracking.error,

    // Session management
    currentSession: sessionManagement.currentSession,
    startSession: sessionManagement.startSession,
    endSession: sessionManagement.endSession,
    pauseSession: sessionManagement.pauseSession,
    resumeSession: sessionManagement.resumeSession,
    abandonSession: sessionManagement.abandonSession,
    getActiveSession: sessionManagement.getActiveSession,
    updateSessionStats: sessionManagement.updateSessionStats,
    getSessionStatistics: sessionManagement.getSessionStatistics,

    // Usage tracking
    recordUsage: usageTracking.recordUsage,
    getUsageByStudent: usageTracking.getUsageByStudent,
    countActionsByStudent: usageTracking.countActionsByStudent,

    // Pagination
    limit: sessionHistory.limit,
    setLimit: sessionHistory.setLimit,
    page: sessionHistory.page,
    setPage: sessionHistory.setPage,
    pageOptions: sessionHistory.pageOptions,
    setOffset: sessionHistory.setOffset,

    // Refetch functions
    refetchOverview: overview.refetch,
    refetchTrends: trends.refetch,
    refetchOutcomes: outcomes.refetch,
    refetchAchievements: achievements.refetch,
    refetchWeeklySummary: weeklySummary.refetch,
    refetchStreak: streak.refetch,
    refetchSessionHistory: sessionHistory.refetch,
  };
};
