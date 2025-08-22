import { useCallback } from 'react';
import { useRatePaperMutation } from '../../store/result';
import { PaperRatingRequest } from '../../store/result';

interface CreatePaperRatingPayload {
  data: PaperRatingRequest;
  callback?: () => void;
}

const useCreatePaperRating = () => {
  const [ratePaper, { isLoading: isCreatingRating }] = useRatePaperMutation();

  const createPaperRating = useCallback(
    async (data: CreatePaperRatingPayload) => {
      const { data: ratingData, callback } = data;

      try {
        await ratePaper({
          paperRatingRequest: {
            rating: ratingData.rating,
            paperId: ratingData.paperId,
          },
        }).unwrap();

        if (callback) {
          callback();
        }
      } catch (error) {
        console.error('Error creating paper rating:', error);
        throw error;
      }
    },
    [ratePaper]
  );

  return {
    createPaperRating,
    isCreatingRating,
  };
};

export default useCreatePaperRating;
