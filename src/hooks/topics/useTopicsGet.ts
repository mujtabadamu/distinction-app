import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectIsFetchingTopics,
  selectTopicsData,
} from '../../redux/topics/selectors';
import {
  fetchTopicsStart,
  clearTopics as clearTopicsStart,
} from '../../redux/topics/reducer';
import { TopicsPayload } from '../../redux/topics/typings';

const useTopicsGet = (data: TopicsPayload) => {
  const { examGroupId, subjectId, years } = data;
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsFetchingTopics);
  const topics = useSelector(selectTopicsData);

  const getTopics = useCallback(() => {
    dispatch(
      fetchTopicsStart({
        examGroupId,
        subjectId,
        years,
      })
    );
  }, [examGroupId, subjectId, years]);

  const clearTopics = () => {
    dispatch(clearTopicsStart());
  };

  useEffect(() => {
    if (!examGroupId || !subjectId) return;
    getTopics();
  }, [examGroupId, subjectId, years]);

  return {
    loadingTopics: isLoading,
    topics,
    clearTopics,
  };
};

export default useTopicsGet;
