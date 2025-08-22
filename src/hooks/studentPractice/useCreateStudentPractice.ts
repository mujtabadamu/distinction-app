import { useCallback } from 'react';
import { useEnhancedStartStudentPracticeMutation } from '../../store/enhancedApi';
import { StudentPracticeRequest } from '../../generated';
import { clientErrorHandler } from '../../utils/errorHandlers';

interface PostStudentPracticePayload {
  data: StudentPracticeRequest;
  callback?: () => void;
}

const useStudentPracticePost = () => {
  const [startStudentPractice, { isLoading: isCreatingStudentPractice }] =
    useEnhancedStartStudentPracticeMutation();

  const createStudentPractice = useCallback(
    async (payload: PostStudentPracticePayload) => {
      if (payload.data.paperId === '') {
        return clientErrorHandler('Please select a paper');
      }

      try {
        const result = await startStudentPractice({
          studentPracticeRequest: payload.data,
        }).unwrap();

        if (payload.callback) {
          payload.callback();
        }

        return result;
      } catch (error) {
        console.error('Error creating student practice:', error);
        throw error;
      }
    },
    [startStudentPractice]
  );

  return {
    createStudentPractice,
    isCreatingStudentPractice,
  };
};

export default useStudentPracticePost;
