import { useEnhancedGetStudentPracticeQuery } from '../../store/enhancedApi';

interface IUseStudentPracticeQuery {
  id?: string;
  run?: boolean;
}

/**
 * Get either the student practice history or a particular student practice.
 * If Id is passed, it will return a single practice, else the history
 */

const useStudentPracticeQuery = ({
  id,
  run = true,
}: IUseStudentPracticeQuery) => {
  // Use enhanced RTK Query hook
  const { data: practiceHistory, isLoading: loadingPracticeHistory } =
    useEnhancedGetStudentPracticeQuery(
      { run },
      {
        skip: !run,
      }
    );

  // For now, we'll return the same interface but with enhanced data
  // TODO: Add single practice query when needed
  return {
    loadingSinglePractice: false, // TODO: Implement when single practice endpoint is available
    practiceHistory: !id ? practiceHistory : null,
    singlePractice: id ? null : null, // TODO: Implement when single practice endpoint is available
    loadingPracticeHistory,
    run,
  };
};

export default useStudentPracticeQuery;
