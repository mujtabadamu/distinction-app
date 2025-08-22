import { useCallback } from 'react';
// import { useSelector } from 'react-redux';
// import { selectCurrentUser } from 'redux/auth/selectors';
import {
  FlashcardUsageControllerService,
  FlashcardUsageRequest,
  FlashcardUsageView,
  Card,
} from 'generated/index';
import { apiWrapper } from 'utils/http-client';
import { handleError } from 'utils/errorHandlers';
import { useAuthSlice } from 'pages/auth/authSlice';
import {
  useEnhancedRecordUsageMutation,
  useEnhancedGetUsageByStudentQuery,
  useEnhancedCountActionsByStudentQuery,
} from 'store/enhancedApi';

export function useFlashcardUsageTracking() {
  // const user = useSelector(selectCurrentUser);
  const { user: loginResponse } = useAuthSlice();
  const user = loginResponse?.user;

  // RTK Query hooks
  const [recordUsage] = useEnhancedRecordUsageMutation();
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

        await recordUsage({ flashcardUsageRequest: usageData }).unwrap();
      } catch (error) {
        console.error('Failed to track flashcard usage:', error);
        handleError(error);
        // Don't throw error to avoid breaking the UI flow
      }
    },
    [user?.id, recordUsage]
  );

  const getUsageByStudent = useCallback(async (): Promise<
    FlashcardUsageView[]
  > => {
    if (!user?.id) return [];

    try {
      await refetchUsage();
      return usageData || [];
    } catch (error) {
      console.error('Failed to fetch usage data:', error);
      handleError(error);
      return [];
    }
  }, [user?.id, usageData, refetchUsage]);

  const countActionsByStudent = useCallback(
    async (
      actionType: 'TAP_TO_FLIP' | 'SKIP' | 'COMPLETE'
    ): Promise<number> => {
      if (!user?.id) return 0;

      try {
        await refetchActionCount();
        return actionCount || 0;
      } catch (error) {
        console.error('Failed to count actions:', error);
        handleError(error);
        return 0;
      }
    },
    [user?.id, actionCount, refetchActionCount]
  );

  return {
    trackUsage,
    getUsageByStudent,
    countActionsByStudent,
    usageData,
    actionCount,
  };
}
