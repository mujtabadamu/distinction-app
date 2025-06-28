import { KeyPointsService, KeypointView } from 'generated/index';
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

  const getFlashCards = async ({
    studentId,
    paperId,
    page,
    size,
    keyword,
  }: Payload) => {
    loader.startLoading();
    try {
      const data = await apiWrapper(() =>
        KeyPointsService.list17({
          studentId,
          keyword,
          page,
          paperId,
          size,
        })
      );
      setKeypoints(data.items || []);
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
      });
    }
  }, [limit, page, debouncedSearchText, studentId, paperId, fetch]);

  return {
    keypoints,
    searchText,
    page,
    setPage,
    setSearchText,
    loading: loader.loading,
    refetch,
    setKeypoints,
  };
};

export default useKeypointsGet;
