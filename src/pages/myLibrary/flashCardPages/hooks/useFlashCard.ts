import { useState } from 'react';
import { apiWrapper } from 'utils/http-client';
import { FlashcardsService, FlashcardView } from 'generated/index';
import { handleError } from 'utils/errorHandlers';
import { Notify } from '@flexisaf/flexibull2';

interface CreateFlashCardTypes {
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  curriculum?: 'NUC' | 'NBTE' | 'NCCE' | 'OTHERS';
  paperId?: string;
  formData?: {
    file?: Blob;
  };
}

const useFlashCard = () => {
  const [flashcard, setFlashcard] = useState<FlashcardView | undefined>(
    undefined
  );
  const [isCreatingFlashCard, setIsCreatingFlashCard] =
    useState<boolean>(false);
  const [isDeletingFlashCard, setIsDeletingFlashCard] =
    useState<boolean>(false);
  const [isRenamingFlashCard, setIsRenamingFlashCard] =
    useState<boolean>(false);
  const [isLoadingSingleFlashCard, setIsLoadingSingleFlashCard] =
    useState<boolean>(false);

  const createFlashcard = async (
    payload: CreateFlashCardTypes,
    cb: () => void
  ) => {
    setIsCreatingFlashCard(true);
    try {
      await apiWrapper(() => FlashcardsService.generateFlashcardsV3(payload));
      Notify('FlashCard Created successfully', { status: 'success' });

      cb();
      setIsCreatingFlashCard(false);
    } catch (error) {
      setIsCreatingFlashCard(false);
      handleError(error);
    }
  };
  const getFlashcard = async (id: string) => {
    setIsLoadingSingleFlashCard(true);
    try {
      const data = await apiWrapper(() => FlashcardsService.get11({ id }));
      setFlashcard(data);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoadingSingleFlashCard(false);
    }
  };

  const deleteFlashcard = async (id: string, callback?: () => void) => {
    if (!id) return;
    setIsDeletingFlashCard(true);
    try {
      await apiWrapper(() => FlashcardsService.delete12({ id }));
      callback?.();
    } catch (error) {
      handleError(error);
    } finally {
      setIsDeletingFlashCard(false);
    }
  };

  const renameFlashcard = async ({
    newName,
    id,
    callback,
  }: {
    id: string;
    newName: string;
    callback?: () => void;
  }) => {
    if (!id) return;
    setIsRenamingFlashCard(true);
    try {
      await apiWrapper(() =>
        FlashcardsService.update12({
          id,
          requestBody: {
            newName,
          },
        })
      );

      Notify('Flashcard renamed successfully', { status: 'success' });
      callback?.();
    } catch (error) {
      handleError(error);
    } finally {
      setIsRenamingFlashCard(false);
    }
  };

  return {
    createFlashcard,
    getFlashcard,
    isCreatiingFlashCard: isCreatingFlashCard,
    flashcard,
    isLoadingSingleFlashCard,
    deleteFlashcard,
    isDeletingFlashCard,
    isRenamingFlashCard,
    renameFlashcard,
  };
};

export default useFlashCard;
