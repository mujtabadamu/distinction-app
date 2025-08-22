import { useState, useEffect } from 'react';
import { FlashcardsService, FlashcardView } from 'generated/index';
import { apiWrapper } from 'utils/http-client';
import { handleError } from 'utils/errorHandlers';
import { useEnhancedGetFlashcardQuery } from 'store/enhancedApi';

interface UseFlashcardDetailsProps {
  flashcardIds: string[];
}

interface FlashcardDetailsMap {
  [key: string]: FlashcardView;
}

export const useFlashcardDetails = ({
  flashcardIds,
}: UseFlashcardDetailsProps) => {
  const [flashcardDetails, setFlashcardDetails] = useState<FlashcardDetailsMap>(
    {}
  );
  const [loading, setLoading] = useState(false);

  // Use RTK Query for each flashcard ID
  const flashcardQueries = flashcardIds.map((id) =>
    useEnhancedGetFlashcardQuery({ id }, { skip: !id })
  );

  useEffect(() => {
    if (!flashcardIds.length) return;

    setLoading(true);

    // Check if all queries are loaded
    const allLoaded = flashcardQueries.every((query) => !query.isLoading);
    const hasErrors = flashcardQueries.some((query) => query.error);

    if (allLoaded && !hasErrors) {
      const details: FlashcardDetailsMap = {};
      flashcardQueries.forEach((query, index) => {
        if (query.data) {
          details[flashcardIds[index]] = query.data;
        }
      });
      setFlashcardDetails(details);
      setLoading(false);
    } else if (hasErrors) {
      setLoading(false);
      // Handle errors if needed
      flashcardQueries.forEach((query) => {
        if (query.error) {
          handleError(query.error);
        }
      });
    }
  }, [flashcardIds, flashcardQueries]);

  return { flashcardDetails, loading };
};
