import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from 'redux/auth/selectors';
import {
  FlashcardUsageControllerService,
  FlashcardUsageRequest,
  FlashcardUsageView,
  Card,
} from 'generated/index';
import { apiWrapper } from 'utils/http-client';
import { handleError } from 'utils/errorHandlers';

export function useFlashcardUsageTracking() {
  const user = useSelector(selectCurrentUser);

  const trackUsage = useCallback(
    async (
      flashcardId: string,
      actionType: 'TAP_TO_FLIP' | 'SKIP' | 'COMPLETE' | string,
      sessionId?: string,
      timeSpentSeconds?: number
    ) => {
      if (!user?.id) {
        console.warn('Cannot track usage: User not authenticated');
        return;
      }

      try {
        // Create a minimal card object that satisfies the generated type
        const card: Card = {
          id: flashcardId,
          question: '', // Required by generated type
          answer: '', // Required by generated type
          flashcard: { id: flashcardId } as any, // Required by generated type
        };

        const usageData: FlashcardUsageRequest = {
          studentId: user.id,
          card,
          actionType: actionType as 'TAP_TO_FLIP' | 'SKIP' | 'COMPLETE',
          sessionId,
          timeSpentSeconds,
        };

        await apiWrapper(() =>
          FlashcardUsageControllerService.recordUsage({
            requestBody: usageData,
          })
        );
      } catch (error) {
        console.error('Failed to track flashcard usage:', error);
        handleError(error);
        // Don't throw error to avoid breaking the UI flow
      }
    },
    [user?.id]
  );

  const getUsageByStudent = useCallback(async (): Promise<
    FlashcardUsageView[]
  > => {
    if (!user?.id) return [];

    try {
      const usage = await apiWrapper(() =>
        FlashcardUsageControllerService.getUsageByStudent({
          studentId: user.id,
        })
      );
      return usage;
    } catch (error) {
      console.error('Failed to fetch usage data:', error);
      handleError(error);
      return [];
    }
  }, [user?.id]);

  const countActionsByStudent = useCallback(
    async (
      actionType: 'TAP_TO_FLIP' | 'SKIP' | 'COMPLETE'
    ): Promise<number> => {
      if (!user?.id) return 0;

      try {
        const count = await apiWrapper(() =>
          FlashcardUsageControllerService.countActionsByStudent({
            studentId: user.id,
            actionType,
          })
        );
        return count;
      } catch (error) {
        console.error('Failed to count actions:', error);
        handleError(error);
        return 0;
      }
    },
    [user?.id]
  );

  return {
    trackUsage,
    getUsageByStudent,
    countActionsByStudent,
  };
}
