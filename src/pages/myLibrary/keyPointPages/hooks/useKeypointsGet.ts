import { KeypointView } from 'generated/index';
import useLoading from 'hooks/general/useLoading';
import usePaginationWrapper from 'hooks/general/usePaginationWrapper';
import { useEffect, useState } from 'react';
import { handleError } from 'utils/errorHandlers';
import { useEnhancedListKeypointsQuery } from 'store/enhancedApi';

interface Props {
  studentId?: string;
  paperId?: string;
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
}

interface Payload {
  studentId: string;
  keyword?: string;
  paperId?: string;
  page?: number;
  size?: number;
}

const useKeypointsGet = ({ studentId, paperId }: Props) => {
  const loader = useLoading();
  const [keypoints, setKeypoints] = useState<Array<KeypointView>>([]);
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
  } = useEnhancedListKeypointsQuery(
    {
      studentId: studentId || '',
      keyword: debouncedSearchText,
      paperId,
      page: page - 1, // API is 0-indexed
      size: limit,
    },
    { skip: !studentId }
  );

  useEffect(() => {
    if (data) {
      setKeypoints(data.items || []);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [error]);

  return {
    keypoints,
    searchText,
    page,
    setPage,
    setSearchText,
    loading: loading || loader.loading,
    refetch: refetchQuery,
    setKeypoints,
  };
};

export default useKeypointsGet;
