import { FlashcardsService, FlashcardView } from 'generated/index';
import useLoading from 'hooks/general/useLoading';
import usePaginationWrapper from 'hooks/general/usePaginationWrapper';
import { useEffect, useState } from 'react';
import { handleError } from 'utils/errorHandlers';
import { apiWrapper } from 'utils/http-client';

interface Props {
  studentId?: string;
  paperId?: string;
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
}

interface Payload {
  studentId: string;
  keyword?: string;
  paperId?: string;
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
  page?: number;
  size?: number;
}

const useFlashcardsGet = ({ studentId, paperId, difficulty }: Props) => {
  const loader = useLoading();
  const [flashcards, setFlashcards] = useState<Array<FlashcardView>>([]);
  const {
    searchText,
    setSearchText,
    limit,
    debouncedSearchText,
    page,
    setPage,
  } = usePaginationWrapper({ defaultLimit: 10 });
  const [fetch, setFetch] = useState(0);

  const refetch = () => setFetch((prev) => prev + 1);
  const getFlashCards = async ({
    studentId,
    difficulty,
    paperId,
    page,
    size,
    keyword,
  }: Payload) => {
    loader.startLoading();
    try {
      const data = await apiWrapper(() =>
        FlashcardsService.list18({
          studentId,
          difficulty,
          keyword,
          page,
          paperId,
          size,
        })
      );
      setFlashcards(data.items || []);
    } catch (error) {
      handleError(error);
    } finally {
      loader.stopLoading();
    }
  };

  useEffect(() => {
    if (studentId) {
      getFlashCards({
        studentId,
        paperId,
        size: limit,
        keyword: debouncedSearchText,
        difficulty,
      });
    }
  }, [
    limit,
    page,
    debouncedSearchText,
    studentId,
    difficulty,
    paperId,
    fetch,
    difficulty,
  ]);

  return {
    flashcards,
    searchText,
    refetch,
    page,
    setPage,
    setSearchText,
    loading: loader.loading,
    setFlashcards,
  };
};

export default useFlashcardsGet;
