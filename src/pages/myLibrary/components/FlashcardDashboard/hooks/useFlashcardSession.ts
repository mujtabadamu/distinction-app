import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from 'redux/auth/selectors';
import {
  FlashcardSessionControllerService,
  FlashcardSessionView,
  FlashcardSessionRequest,
} from 'generated/index';
import { apiWrapper } from 'utils/http-client';
import { handleError } from 'utils/errorHandlers';

export function useFlashcardSession(flashcardId: string) {
  const user = useSelector(selectCurrentUser);

  const [currentSession, setCurrentSession] =
    useState<FlashcardSessionView | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sessionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<number>(Date.now());
  const isPausedRef = useRef<boolean>(false);

  // Auto-pause timeout (5 minutes of inactivity)
  const AUTO_PAUSE_TIMEOUT = 5 * 60 * 1000;

  // Set up visibility change listener for auto-pause/resume
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && currentSession?.id && !isPausedRef.current) {
        pauseSession();
      } else if (
        !document.hidden &&
        currentSession?.id &&
        isPausedRef.current
      ) {
        resumeSession();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [currentSession?.id]);

  // Activity tracking
  const updateLastActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
  }, []);

  const resetAutoPauseTimer = useCallback(() => {
    if (sessionTimeoutRef.current) {
      clearTimeout(sessionTimeoutRef.current);
    }

    sessionTimeoutRef.current = setTimeout(() => {
      if (currentSession?.id && !isPausedRef.current) {
        pauseSession();
      }
    }, AUTO_PAUSE_TIMEOUT);
  }, [currentSession?.id]);

  // Set up activity listeners
  useEffect(() => {
    const handleActivity = () => {
      updateLastActivity();
      if (currentSession?.id && !isPausedRef.current) {
        resetAutoPauseTimer();
      }
    };

    const events = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
    ];
    events.forEach((event) => {
      document.addEventListener(event, handleActivity, true);
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleActivity, true);
      });
    };
  }, [currentSession?.id, updateLastActivity, resetAutoPauseTimer]);

  const startSession = useCallback(async () => {
    if (!user?.id || !flashcardId) {
      console.warn('Cannot start session: Missing user or flashcard ID');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const requestBody: FlashcardSessionRequest = {
        studentId: user.id,
        flashcardId,
      };

      const session = await apiWrapper(() =>
        FlashcardSessionControllerService.startSession({ requestBody })
      );

      setCurrentSession(session);
      isPausedRef.current = false;
      resetAutoPauseTimer();
    } catch (err) {
      console.error('Failed to start session:', err);
      setError('Failed to start session');
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, flashcardId, resetAutoPauseTimer]);

  const endSession = useCallback(
    async (status: 'COMPLETED' | 'ABANDONED' = 'COMPLETED', sessionId?: string) => {
      const sessionToEnd = sessionId || currentSession?.id;
      if (!sessionToEnd) {
        console.warn('Cannot end session: No active session');
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        if (sessionTimeoutRef.current) {
          clearTimeout(sessionTimeoutRef.current);
        }

        const session = await apiWrapper(() =>
          FlashcardSessionControllerService.endSession({
            sessionId: sessionToEnd as string,
            status,
          })
        );
        setCurrentSession(session);
        isPausedRef.current = false;
      } catch (err) {
        console.error('Failed to end session:', err);
        setError('Failed to end session');
        handleError(err);
      } finally {
        setIsLoading(false);
      }
    },
    [currentSession?.id]
  );

  const pauseSession = useCallback(async () => {
    if (!currentSession?.id || isPausedRef.current) {
      return;
    }

    try {
      setError(null);

      if (sessionTimeoutRef.current) {
        clearTimeout(sessionTimeoutRef.current);
      }

      const session = await apiWrapper(() =>
        FlashcardSessionControllerService.pauseSession({
          sessionId: currentSession.id as string,
        })
      );
      setCurrentSession(session);
      isPausedRef.current = true;
    } catch (err) {
      console.error('Failed to pause session:', err);
      setError('Failed to pause session');
      handleError(err);
    }
  }, [currentSession?.id]);

  const resumeSession = useCallback(async () => {
    if (!currentSession?.id || !isPausedRef.current) {
      return;
    }

    try {
      setError(null);

      const session = await apiWrapper(() =>
        FlashcardSessionControllerService.resumeSession({
          sessionId: currentSession.id as string,
        })
      );
      setCurrentSession(session);
      isPausedRef.current = false;
      resetAutoPauseTimer();
    } catch (err) {
      console.error('Failed to resume session:', err);
      setError('Failed to resume session');
      handleError(err);
    }
  }, [currentSession?.id, resetAutoPauseTimer]);

  const abandonSession = useCallback(async (sessionId?: string) => {
    const sessionToAbandon = sessionId || currentSession?.id;
    if (!sessionToAbandon) {
      console.warn('Cannot abandon session: No active session');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      if (sessionTimeoutRef.current) {
        clearTimeout(sessionTimeoutRef.current);
      }

      const session = await apiWrapper(() =>
        FlashcardSessionControllerService.abandonSession({
          sessionId: sessionToAbandon as string,
        })
      );
      setCurrentSession(session);
      isPausedRef.current = false;
    } catch (err) {
      console.error('Failed to abandon session:', err);
      setError('Failed to abandon session');
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  }, [currentSession?.id]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (sessionTimeoutRef.current) {
        clearTimeout(sessionTimeoutRef.current);
      }
    };
  }, []);

  return {
    currentSession,
    isLoading,
    error,
    startSession,
    endSession,
    pauseSession,
    resumeSession,
    abandonSession,
  };
}
