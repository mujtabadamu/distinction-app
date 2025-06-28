import { useState, useEffect } from 'react';
import { FlashcardsService, FlashcardView } from 'generated/index';
import { apiWrapper } from 'utils/http-client';
import { handleError } from 'utils/errorHandlers';

interface UseFlashcardDetailsProps {
  flashcardIds: string[];
}

interface FlashcardDetailsMap {
  [key: string]: FlashcardView;
}

export const useFlashcardDetails = ({ flashcardIds }: UseFlashcardDetailsProps) => {
  const [flashcardDetails, setFlashcardDetails] = useState<FlashcardDetailsMap>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!flashcardIds.length) return;
    setLoading(true);
    apiWrapper(async () => {
      try {
        const details = await Promise.all(
          flashcardIds.map(async (id) => {
            const detail = await FlashcardsService.get11({ id });
            return [id, detail] as [string, FlashcardView];
          })
        );
        setFlashcardDetails(Object.fromEntries(details));
      } catch (err) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    });
  }, [flashcardIds]);

  return { flashcardDetails, loading };
}; 