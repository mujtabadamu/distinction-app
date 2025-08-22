import { useState, useEffect, useCallback } from 'react';
import {
  FlashcardSessionView,
  FlashcardUsageRequest,
  FlashcardSessionRequest,
  DailyTrend,
  SessionOutcomes,
  Achievement,
  WeeklySummary,
  StudyStreak,
  OverviewMetrics,
} from 'generated/index';
import { handleError } from 'utils/errorHandlers';
import usePaginationWrapper from 'hooks/general/usePaginationWrapper';
import { useAuthSlice } from 'pages/auth/authSlice';
import {
  useEnhancedGetDashboardOverviewQuery,
  useEnhancedGetStudyTrendsQuery,
  useEnhancedGetSessionOutcomesQuery,
  useEnhancedGetAchievementsQuery,
  useEnhancedGetWeeklySummaryQuery,
  useEnhancedGetStudyStreakQuery,
  useEnhancedGetSessionHistoryQuery,
  useEnhancedRecordUsageMutation,
  useEnhancedGetUsageByStudentQuery,
  useEnhancedCountActionsByStudentQuery,
  useEnhancedStartSessionMutation,
  useEnhancedEndSessionMutation,
  useEnhancedPauseSessionMutation,
  useEnhancedResumeSessionMutation,
  useEnhancedAbandonSessionMutation,
  useEnhancedGetActiveSessionQuery,
  useEnhancedUpdateSessionStatisticsMutation,
  useEnhancedGetSessionStatisticsQuery,
} from 'store/enhancedApi';

// Dashboard Overview
export const useFlashcardDashboardOverview = () => {
  const { user: loginResponse } = useAuthSlice();
  const user = loginResponse?.user;

  const {
    data,
    isLoading: loading,
    error,
    refetch,
  } = useEnhancedGetDashboardOverviewQuery(
    { studentId: user?.id || '' },
    { skip: !user?.id }
  );

  return {
    overview: data?.overview || null,
    loading,
    error: error ? 'Failed to fetch dashboard overview' : null,
    refetch,
  };
};

// Dashboard Trends
export const useFlashcardTrends = () => {
  const { user: loginResponse } = useAuthSlice();
  const user = loginResponse?.user;

  const {
    data,
    isLoading: loading,
    error,
    refetch,
  } = useEnhancedGetStudyTrendsQuery(
    { studentId: user?.id || '', days: 30 },
    { skip: !user?.id }
  );

  return {
    trends: data || [],
    loading,
    error: error ? 'Failed to fetch trends data' : null,
    refetch,
  };
};

// Session Outcomes
export const useFlashcardSessionOutcomes = () => {
  const { user: loginResponse } = useAuthSlice();
  const user = loginResponse?.user;

  const {
    data,
    isLoading: loading,
    error,
    refetch,
  } = useEnhancedGetSessionOutcomesQuery(
    { studentId: user?.id || '' },
    { skip: !user?.id }
  );

  return {
    outcomes: data,
    loading,
    error: error ? 'Failed to fetch session outcomes' : null,
    refetch,
  };
};

// Achievements
export const useFlashcardAchievements = () => {
  const { user: loginResponse } = useAuthSlice();
  const user = loginResponse?.user;

  const {
    data,
    isLoading: loading,
    error,
    refetch,
  } = useEnhancedGetAchievementsQuery(
    { studentId: user?.id || '' },
    { skip: !user?.id }
  );

  return {
    achievements: data || [],
    loading,
    error: error ? 'Failed to fetch achievements' : null,
    refetch,
  };
};

// Weekly Summary
export const useFlashcardWeeklySummary = (weekStart?: string) => {
  const { user: loginResponse } = useAuthSlice();
  const user = loginResponse?.user;

  const {
    data,
    isLoading: loading,
    error,
    refetch,
  } = useEnhancedGetWeeklySummaryQuery(
    { studentId: user?.id || '', weekStart },
    { skip: !user?.id }
  );

  return {
    weeklySummary: data,
    loading,
    error: error ? 'Failed to fetch weekly summary' : null,
    refetch,
  };
};

// Study Streak
export const useFlashcardStreak = () => {
  const { user: loginResponse } = useAuthSlice();
  const user = loginResponse?.user;

  const {
    data,
    isLoading: loading,
    error,
    refetch,
  } = useEnhancedGetStudyStreakQuery(
    { studentId: user?.id || '' },
    { skip: !user?.id }
  );

  return {
    streak: data,
    loading,
    error: error ? 'Failed to fetch streak data' : null,
    refetch,
  };
};

// Session History with Pagination
export const useFlashcardSessionHistory = (defaultLimit = 10) => {
  const { user: loginResponse } = useAuthSlice();
  const user = loginResponse?.user;
  const [sessions, setSessions] = useState<FlashcardSessionView[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const { limit, setLimit, page, setPage, pageOptions, setOffset } =
    usePaginationWrapper({ defaultLimit });

  const {
    data,
    isLoading: loading,
    error,
    refetch,
  } = useEnhancedGetSessionHistoryQuery(
    {
      studentId: user?.id || '',
      page: page - 1, // API is 0-indexed
      size: limit,
    },
    { skip: !user?.id }
  );

  useEffect(() => {
    if (data) {
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
    }
  }, [data]);

  return {
    sessions,
    totalCount,
    loading,
    error: error ? 'Failed to fetch session history' : null,
    refetch,
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
  const { user: loginResponse } = useAuthSlice();
  const user = loginResponse?.user;
  const [currentSession, setCurrentSession] =
    useState<FlashcardSessionView | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // RTK Query mutations
  const [startSessionMutation] = useEnhancedStartSessionMutation();
  const [endSessionMutation] = useEnhancedEndSessionMutation();
  const [pauseSessionMutation] = useEnhancedPauseSessionMutation();
  const [resumeSessionMutation] = useEnhancedResumeSessionMutation();
  const [abandonSessionMutation] = useEnhancedAbandonSessionMutation();
  const [updateSessionStatsMutation] =
    useEnhancedUpdateSessionStatisticsMutation();

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

        const session = await startSessionMutation({
          flashcardSessionRequest: requestBody,
        }).unwrap();
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
    [user?.id, startSessionMutation]
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
        const session = await endSessionMutation({
          sessionId,
          status,
        }).unwrap();
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
    [endSessionMutation]
  );

  const pauseSession = useCallback(
    async (sessionId: string) => {
      if (!sessionId) return;

      setError(null);

      try {
        const session = await pauseSessionMutation({
          sessionId,
        }).unwrap();
        setCurrentSession(session);
        return session;
      } catch (err) {
        setError('Failed to pause session');
        handleError(err);
        throw err;
      }
    },
    [pauseSessionMutation]
  );

  const resumeSession = useCallback(
    async (sessionId: string) => {
      if (!sessionId) return;

      setError(null);

      try {
        const session = await resumeSessionMutation({
          sessionId,
        }).unwrap();
        setCurrentSession(session);
        return session;
      } catch (err) {
        setError('Failed to resume session');
        handleError(err);
        throw err;
      }
    },
    [resumeSessionMutation]
  );

  const abandonSession = useCallback(
    async (sessionId: string) => {
      if (!sessionId) return;

      setLoading(true);
      setError(null);

      try {
        const session = await abandonSessionMutation({
          sessionId,
        }).unwrap();
        setCurrentSession(session);
        return session;
      } catch (err) {
        setError('Failed to abandon session');
        handleError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [abandonSessionMutation]
  );

  const getActiveSession = useCallback(
    async (flashcardId: string) => {
      if (!user?.id || !flashcardId) return null;

      try {
        // For now, we'll use a direct API call since RTK Query hooks can't be used in callbacks
        // This could be refactored to use a different pattern if needed
        const response = await fetch(
          `/api/flashcard-sessions/active?studentId=${user.id}&flashcardId=${flashcardId}`
        );
        if (response.status === 404) {
          return null;
        }
        const session = await response.json();
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

  const updateSessionStats = useCallback(
    async (sessionId: string) => {
      if (!sessionId) return;

      try {
        const session = await updateSessionStatsMutation({
          sessionId,
        }).unwrap();
        setCurrentSession(session);
        return session;
      } catch (err) {
        setError('Failed to update session stats');
        handleError(err);
        throw err;
      }
    },
    [updateSessionStatsMutation]
  );

  const getSessionStatistics = useCallback(async () => {
    if (!user?.id) return null;

    try {
      // For now, we'll use a direct API call since RTK Query hooks can't be used in callbacks
      const response = await fetch(
        `/api/flashcard-sessions/student/${user.id}/statistics`
      );
      const stats = await response.json();
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
  const { user: loginResponse } = useAuthSlice();
  const user = loginResponse?.user;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // RTK Query hooks
  const [recordUsageMutation] = useEnhancedRecordUsageMutation();
  const { data: usageData, refetch: refetchUsage } =
    useEnhancedGetUsageByStudentQuery(
      { studentId: user?.id || '' },
      { skip: !user?.id }
    );
  const { data: actionCount, refetch: refetchActionCount } =
    useEnhancedCountActionsByStudentQuery(
      { studentId: user?.id || '', actionType: 'TAP_TO_FLIP' },
      { skip: !user?.id }
    );

  const recordUsage = useCallback(
    async (usageData: FlashcardUsageRequest) => {
      if (!user?.id) {
        console.warn('Cannot record usage: User not authenticated');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const result = await recordUsageMutation({
          flashcardUsageRequest: usageData,
        }).unwrap();
        return result;
      } catch (err) {
        setError('Failed to record usage');
        handleError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [user?.id, recordUsageMutation]
  );

  const getUsageByStudent = useCallback(async () => {
    if (!user?.id) return [];

    try {
      await refetchUsage();
      return usageData || [];
    } catch (err) {
      setError('Failed to fetch usage data');
      handleError(err);
      throw err;
    }
  }, [user?.id, usageData, refetchUsage]);

  const countActionsByStudent = useCallback(
    async (actionType: 'TAP_TO_FLIP' | 'SKIP' | 'COMPLETE') => {
      if (!user?.id) return 0;

      try {
        await refetchActionCount();
        return actionCount || 0;
      } catch (err) {
        setError('Failed to count actions');
        handleError(err);
        throw err;
      }
    },
    [user?.id, actionCount, refetchActionCount]
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
    // refetchOverview: overview.refetch,
    // refetchTrends: trends.refetch,
    // refetchOutcomes: outcomes.refetch,
    // refetchAchievements: achievements.refetch,
    // refetchWeeklySummary: weeklySummary.refetch,
    // refetchStreak: streak.refetch,
    // refetchSessionHistory: sessionHistory.refetch,
  };
};
