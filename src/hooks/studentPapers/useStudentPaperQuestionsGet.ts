import { useCallback } from 'react';
import { useEnhancedGetStudentPaperQuestionsQuery } from '../../store/enhancedApi';

interface GetStudentPaperQuestionsPayload {
  id: string;
  page: number;
  size: number;
}

const useStudentPaperQuestionsGet = ({
  id,
  page,
  size,
}: GetStudentPaperQuestionsPayload) => {
  const {
    data: studentPaperQuestions,
    isLoading: gettingStudentPaperQuestions,
    refetch,
  } = useEnhancedGetStudentPaperQuestionsQuery(
    { id, page, size },
    { skip: !id }
  );

  return {
    gettingStudentPaperQuestions,
    studentPaperQuestions,
    refetch,
  };
};

export default useStudentPaperQuestionsGet;
