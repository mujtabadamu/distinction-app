import { useEnhancedGetStudentPapersQuery } from '../../store/enhancedApi';

interface IUseStudentPapersQuery {
  id?: string;
  run?: boolean;
  options?: {
    examGroupId?: string;
    page?: number;
    size?: number;
  };
}

/**
 * Get either the student papers history or a particular student paper.
 * If ID is passed, it will return a single practice, else the history
 */

const useStudentPapersQuery = ({
  id,
  run = true,
  options,
}: IUseStudentPapersQuery) => {
  // Use enhanced RTK Query hook
  const { data: studentPapersHistory, isLoading: loadingStudentPapersHistory } =
    useEnhancedGetStudentPapersQuery(
      {
        examGroupId: options?.examGroupId,
        page: options?.page,
        size: options?.size,
      },
      {
        skip: !run,
      }
    );

  // For now, we'll return the same interface but with enhanced data
  // TODO: Add single paper query when needed
  return {
    loadingSinglePaper: false, // TODO: Implement when single paper endpoint is available
    loadingStudentPapersHistory,
    singlePaper: id ? null : null, // TODO: Implement when single paper endpoint is available
    studentPapersHistory: !id ? studentPapersHistory : null,
    run,
    completedPapers:
      studentPapersHistory?.items?.filter(
        (paper) => paper.status === 'COMPLETED'
      ) || [],
    inProgress:
      studentPapersHistory?.items?.filter(
        (paper) => paper.status === 'IN_PROGRESS'
      ) || [],
  };
};

export default useStudentPapersQuery;
