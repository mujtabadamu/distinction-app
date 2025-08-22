import { useCallback } from 'react';
import { useAppDispatch, useSelector } from 'react-redux';
import {
  useEnhancedCreateStudentPaperMutation,
  useEnhancedSubmitStudentPaperMutation,
  useEnhancedSaveStudentPaperProgressMutation,
} from '../../store/enhancedApi';
import { clientErrorHandler } from '../../utils/errorHandlers';
import { PostStudentPapersPayload } from '../../typings/studentPaper';
import {
  setSelectedPaper,
  setCreating,
  setSubmitting,
  setError,
  setPaperResult,
} from './useStudentPaperSlice';
import { RootState } from '../../store/store';

const useStudentPaperPost = () => {
  const dispatch = useAppDispatch();
  const { selectedPaper, isCreating, isSubmitting } = useSelector(
    (state: RootState) => state.studentPaperUI
  );

  // RTK Query mutations
  const [createStudentPaperMutation, { isLoading: isCreatingStudentPaper }] =
    useEnhancedCreateStudentPaperMutation();
  const [submitStudentPaperMutation, { isLoading: isSubmittingStudentPaper }] =
    useEnhancedSubmitStudentPaperMutation();
  const [saveProgressMutation] = useEnhancedSaveStudentPaperProgressMutation();

  const createStudentPaper = useCallback(
    async (data: PostStudentPapersPayload) => {
      if (data.paperId === '')
        return clientErrorHandler('Please select a paper');
      try {
        dispatch(setCreating(true));
        dispatch(setError(null));

        const result = await createStudentPaperMutation({
          paperId: data.paperId,
          size: data.size,
          mode: data.mode,
          ...(data.captcha && { captcha: data.captcha }),
        }).unwrap();

        dispatch(setSelectedPaper(result));

        if (data.callback) {
          data.callback();
        }
        return result;
      } catch (error) {
        console.error('Error creating student paper:', error);
        dispatch(
          setError(
            (error as any)?.data?.message || 'Failed to create student paper'
          )
        );
        throw error;
      } finally {
        dispatch(setCreating(false));
      }
    },
    [createStudentPaperMutation, dispatch]
  );

  const submitStudentPaper = useCallback(
    async (data: {
      id: string;
      timeElapsed: number;
      callback?: () => void;
    }) => {
      try {
        dispatch(setSubmitting(true));
        dispatch(setError(null));

        const result = await submitStudentPaperMutation({
          id: data.id,
          submitPaperRequest: {
            timeElapsed: data.timeElapsed,
          },
        }).unwrap();

        // Set the paper result in local state
        dispatch(setPaperResult(result));

        if (data.callback) {
          data.callback();
        }
        return result;
      } catch (error) {
        console.error('Error submitting student paper:', error);
        dispatch(
          setError(
            (error as any)?.data?.message || 'Failed to submit student paper'
          )
        );
        throw error;
      } finally {
        dispatch(setSubmitting(false));
      }
    },
    [submitStudentPaperMutation, dispatch]
  );

  const saveProgress = useCallback(
    async (data: { id: string; studentAnswerProgressRequest: any }) => {
      try {
        const result = await saveProgressMutation({
          id: data.id,
          studentAnswerProgressRequest: data.studentAnswerProgressRequest,
        }).unwrap();
        return result;
      } catch (error) {
        console.error('Error saving progress:', error);
        throw error;
      }
    },
    [saveProgressMutation]
  );

  const resetStudentPaper = () => {
    dispatch(setSelectedPaper(null));
    dispatch(setError(null));
  };

  return {
    createStudentPaper,
    submitStudentPaper,
    saveProgress,
    isCreatingStudentPaper: isCreating || isCreatingStudentPaper,
    isSubmittingStudentPaper: isSubmitting || isSubmittingStudentPaper,
    studentPaper: selectedPaper,
    resetStudentPaper,
  };
};

export default useStudentPaperPost;
