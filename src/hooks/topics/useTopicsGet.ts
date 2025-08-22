import { useEnhancedGetTopicsQuery } from '../../store/enhancedApi';

interface TopicsPayload {
  examGroupId?: string;
  subjectId?: string;
  years?: number[];
}

const useTopicsGet = (data: TopicsPayload) => {
  const { examGroupId, subjectId, years } = data;

  // Use enhanced RTK Query hook
  const { data: topics, isLoading: loadingTopics } = useEnhancedGetTopicsQuery(
    {
      examGroupId,
      subjectId,
      years,
    },
    {
      // Skip query if required parameters are missing
      skip: !examGroupId || !subjectId,
    }
  );

  const clearTopics = () => {
    // RTK Query handles cache invalidation automatically
    // This function is kept for backward compatibility
  };

  return {
    loadingTopics,
    topics,
    clearTopics,
  };
};

export default useTopicsGet;
