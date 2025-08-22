import { useEnhancedGetExamsQuery } from '../../store/enhancedApi';

interface GetExamsPayload {
  name?: string;
  year?: number;
  examGroupId?: string;
  page?: number;
  size?: number;
}

const useExamsGet = ({
  name,
  year,
  examGroupId,
  page,
  size,
}: GetExamsPayload) => {
  // Use enhanced RTK Query hook
  const { data: exams, isLoading: loadingExams } = useEnhancedGetExamsQuery(
    {
      name,
      year,
      examGroupId,
      page,
      size,
    },
    {
      // Skip query if no parameters are provided
      skip: !name && !year && !examGroupId,
    }
  );

  return {
    loadingExams,
    exams,
  };
};

export default useExamsGet;
