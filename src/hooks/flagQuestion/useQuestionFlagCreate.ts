import { useCallback } from 'react';
import { useEnhancedFlagQuestionMutation } from '../../store/enhancedApi';
import { FlagQuestionRequest } from '../../generated';

interface FlagQuestionPayload {
  data: FlagQuestionRequest;
  onSuccess?: () => void;
  onFailure?: () => void;
}

const useQuestionFlagCreate = () => {
  const [createQuestionFlag, { isLoading: isCreatingFlag }] =
    useEnhancedFlagQuestionMutation();

  const handleCreateQuestionFlag = useCallback(
    (data: FlagQuestionPayload) => {
      const { data: flagData, onSuccess, onFailure } = data;

      createQuestionFlag({
        questionId: flagData.questionId,
        flagData: {
          issueType: flagData.issueType,
          message: flagData.message,
        },
      })
        .unwrap()
        .then(() => {
          if (onSuccess) {
            onSuccess();
          }
        })
        .catch((error) => {
          if (onFailure) {
            onFailure();
          }
        });
    },
    [createQuestionFlag]
  );

  return {
    isCreatingFlag,
    createQuestionFlag: handleCreateQuestionFlag,
  };
};

export default useQuestionFlagCreate;
