import { Notify } from '@flexisaf/flexibull2';
import { apiWrapper } from 'utils/http-client';
import { useState } from 'react';
import { handleError } from 'utils/errorHandlers';
import { KeyPointsService, KeypointView } from 'generated/index';

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
  const [isLoadingSingleKeyPoint, setIsLoadingSingleKeyPoint] =
    useState<boolean>(false);

  const [keypoint, setKeypoint] = useState<KeypointView | undefined>(undefined);

  const getKeypoint = async (id: string) => {
    setIsLoadingSingleKeyPoint(true);
    try {
      const data = await apiWrapper(() => KeyPointsService.get8({ id }));
      setKeypoint(data);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoadingSingleKeyPoint(false);
    }
  };

  const createKeypoint = async (payload: CreateKeyPointI, cb: () => void) => {
    setIsCreatingKeyPoint(true);
    try {
      await apiWrapper(() => KeyPointsService.createKeypointV3(payload));
      Notify('FlashCard Created successfully', { status: 'success' });
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
      await apiWrapper(() => KeyPointsService.delete10({ id }));
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
      await apiWrapper(() =>
        KeyPointsService.update10({
          id,
          requestBody: {
            newName,
          },
        })
      );

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
