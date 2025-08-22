import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

interface AutoCompleteProps {
  key: string | undefined;
}

const useAutoCompleteGet = ({ key }: AutoCompleteProps) => {
  const [topic, setTopic] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [debouncedSearchText] = useDebounce(topic, 400);

  // TODO: Implement topics API when available
  const topicList: any[] = [];
  const isLoading: boolean = false;

  const clearTopics = () => {
    // TODO: Implement clear topics when API is available
    console.warn('Clear topics not yet implemented');
  };

  useEffect(() => {
    if (topic.length > 2 && topic !== selectedTopic) {
      // TODO: Implement topics API call when available
      console.warn('Topics API not yet implemented');
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
