import { Notify } from '@flexisaf/flexibull2';
import { useState, useEffect } from 'react';
import { handleError } from 'utils/errorHandlers';
import { KeypointView } from 'generated/index';
import {
  useEnhancedGetKeypointQuery,
  useEnhancedUpdateKeypointMutation,
  useEnhancedDeleteKeypointMutation,
  useEnhancedCreateKeypointV3Mutation,
} from 'store/enhancedApi';

interface CreateKeyPointI {
  curriculum?: 'NUC' | 'NBTE' | 'NCCE' | 'OTHERS';
  paperId?: string;
  formData?: {
    file?: Blob;
  };
}

const useKeyPoint = () => {
  const [isCreatingKeyPoint, setIsCreatingKeyPoint] = useState<boolean>(false);
  const [isDeletingKeyPoint, setDeletingKeyPoint] = useState<boolean>(false);
  const [isRenamingKeyPoint, setIsRenamingKeyPoint] = useState<boolean>(false);
  const [currentKeypointId, setCurrentKeypointId] = useState<string | null>(
    null
  );
  const [keypoint, setKeypoint] = useState<KeypointView | undefined>(undefined);

  // RTK Query hooks
  const [createKeypointMutation] = useEnhancedCreateKeypointV3Mutation();
  const [updateKeypointMutation] = useEnhancedUpdateKeypointMutation();
  const [deleteKeypointMutation] = useEnhancedDeleteKeypointMutation();

  // Use RTK Query for getting keypoint details
  const { data: keypointData, isLoading: isLoadingSingleKeyPoint } =
    useEnhancedGetKeypointQuery(
      { id: currentKeypointId || '' },
      { skip: !currentKeypointId }
    );

  // Update keypoint state when data changes
  useEffect(() => {
    if (keypointData) {
      setKeypoint(keypointData);
    }
  }, [keypointData]);

  const getKeypoint = async (id: string) => {
    setCurrentKeypointId(id);
  };

  const createKeypoint = async (payload: CreateKeyPointI, cb: () => void) => {
    setIsCreatingKeyPoint(true);
    try {
      await createKeypointMutation({
        curriculum: payload.curriculum,
        paperId: payload.paperId,
        body: {
          file: payload.formData?.file,
        },
      }).unwrap();
      Notify('Key point created successfully', { status: 'success' });
      cb();
      setIsCreatingKeyPoint(false);
    } catch (error) {
      setIsCreatingKeyPoint(false);
      handleError(error);
    }
  };

  const deleteKeypoint = async (id: string, callback?: () => void) => {
    if (!id) return;
    setDeletingKeyPoint(true);
    try {
      await deleteKeypointMutation({ id }).unwrap();
      callback?.();
    } catch (error) {
      handleError(error);
    } finally {
      setDeletingKeyPoint(false);
    }
  };

  const renameKeypoint = async ({
    newName,
    id,
    callback,
  }: {
    id: string;
    newName: string;
    callback?: () => void;
  }) => {
    if (!id) return;
    setIsRenamingKeyPoint(true);
    try {
      await updateKeypointMutation({
        id,
        updateKeyPointRequest: {
          newName,
        },
      }).unwrap();

      Notify('Key point renamed successfully', { status: 'success' });
      callback?.();
    } catch (error) {
      handleError(error);
    } finally {
      setIsRenamingKeyPoint(false);
    }
  };

  return {
    createKeypoint,
    isCreatingKeyPoint,
    deleteKeypoint,
    isDeletingKeyPoint,
    isRenamingKeyPoint,
    renameKeypoint,
    isLoadingSingleKeyPoint,
    getKeypoint,
    keypoint,
  };
};

export default useKeyPoint;
