import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectIsFetchingTopics,
  selectTopicsData,
} from '../../redux/topics/selectors';
import {
  clearTopics as clearTopicsStart,
  fetchAutoCompleteTopicsStart,
} from '../../redux/topics/reducer';
import { useDebounce } from 'use-debounce';

interface AutoCompleteProps {
  key: string | undefined;
}

const useAutoCompleteGet = ({ key }: AutoCompleteProps) => {
  const [topic, setTopic] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsFetchingTopics);
  const topicList = useSelector(selectTopicsData);
  const [debouncedSearchText] = useDebounce(topic, 400);

  const clearTopics = () => {
    dispatch(clearTopicsStart());
  };

  useEffect(() => {
    if (topic.length > 2 && topic !== selectedTopic) {
      dispatch(
        fetchAutoCompleteTopicsStart({
          key,
          term: 'topics',
          filter: debouncedSearchText,
        })
      );
    }
  }, [debouncedSearchText]);

  return {
    loadingTopics: isLoading,
    topicList,
    topic,
    setTopic,
    setSelectedTopic,
    clearTopics,
  };
};

export default useAutoCompleteGet;
