import { useEnhancedGetSubjectsQuery } from '../../store/enhancedApi';

interface GetSubjectsPayload {
  examGroupId?: string;
}

const useSubjectsGet = ({ examGroupId }: GetSubjectsPayload) => {
  // Use enhanced RTK Query hook
  const { data: subjects, isLoading: loadingSubjects } =
    useEnhancedGetSubjectsQuery(
      {
        examGroupId,
      },
      {
        // Skip query if no examGroupId is provided
        skip: !examGroupId,
      }
    );

  return {
    loadingSubjects,
    subjects,
  };
};

export default useSubjectsGet;
