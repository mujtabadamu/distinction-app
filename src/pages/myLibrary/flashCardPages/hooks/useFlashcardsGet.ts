import { FlashcardView } from 'generated/index';
import useLoading from 'hooks/general/useLoading';
import usePaginationWrapper from 'hooks/general/usePaginationWrapper';
import { useEffect, useState } from 'react';
import { handleError } from 'utils/errorHandlers';
import { useEnhancedListFlashcardsQuery } from 'store/enhancedApi';

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

  // RTK Query hook
  const {
    data,
    isLoading: loading,
    error,
    refetch: refetchQuery,
  } = useEnhancedListFlashcardsQuery(
    {
      studentId: studentId || '',
      keyword: debouncedSearchText,
      paperId,
      difficulty,
      page: page - 1, // API is 0-indexed
      size: limit,
    },
    { skip: !studentId }
  );

  useEffect(() => {
    if (data) {
      setFlashcards(data.items || []);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [error]);

  return {
    flashcards,
    searchText,
    refetch: refetchQuery,
    page,
    setPage,
    setSearchText,
    loading: loading || loader.loading,
    setFlashcards,
  };
};

export default useFlashcardsGet;
