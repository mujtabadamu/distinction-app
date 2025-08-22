import { useState, useEffect } from 'react';
import { FlashcardView } from 'generated/index';
import { handleError } from 'utils/errorHandlers';
import { Notify } from '@flexisaf/flexibull2';
import {
  useEnhancedGetFlashcardQuery,
  useEnhancedUpdateFlashcardMutation,
  useEnhancedDeleteFlashcardMutation,
  useEnhancedGenerateFlashcardsV3Mutation,
} from 'store/enhancedApi';

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
  const [currentFlashcardId, setCurrentFlashcardId] = useState<string | null>(
    null
  );

  // RTK Query hooks
  const [createFlashcardMutation] = useEnhancedGenerateFlashcardsV3Mutation();
  const [updateFlashcardMutation] = useEnhancedUpdateFlashcardMutation();
  const [deleteFlashcardMutation] = useEnhancedDeleteFlashcardMutation();

  // Use RTK Query for getting flashcard details
  const { data: flashcardData, isLoading: isLoadingSingleFlashCard } =
    useEnhancedGetFlashcardQuery(
      { id: currentFlashcardId || '' },
      { skip: !currentFlashcardId }
    );

  // Update flashcard state when data changes
  useEffect(() => {
    if (flashcardData) {
      setFlashcard(flashcardData);
    }
  }, [flashcardData]);

  const createFlashcard = async (
    payload: CreateFlashCardTypes,
    cb: () => void
  ) => {
    setIsCreatingFlashCard(true);
    try {
      await createFlashcardMutation({
        difficulty: payload.difficulty,
        curriculum: payload.curriculum,
        paperId: payload.paperId,
        body: {
          file: payload.formData?.file,
        },
      }).unwrap();
      Notify('FlashCard Created successfully', { status: 'success' });

      cb();
      setIsCreatingFlashCard(false);
    } catch (error) {
      setIsCreatingFlashCard(false);
      handleError(error);
    }
  };

  const getFlashcard = async (id: string) => {
    setCurrentFlashcardId(id);
  };

  const deleteFlashcard = async (id: string, callback?: () => void) => {
    if (!id) return;
    setIsDeletingFlashCard(true);
    try {
      await deleteFlashcardMutation({ id }).unwrap();
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
      await updateFlashcardMutation({
        id,
        updateFlashcardRequest: {
          newName,
        },
      }).unwrap();

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
