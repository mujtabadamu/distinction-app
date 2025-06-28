import { useCallback, useEffect, useState } from 'react';
import { getLocalAccessToken } from '../../utils/helpers';
import axios from 'axios';
import urls from '../../utils/config';

const useAudioGet = ({ id }: { id: string | null }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [audio, setAudio] = useState({ audioUrl: '', audioId: id });

  const fetchAudio = useCallback(async () => {
    const authToken = getLocalAccessToken();

    if (!id) return;

    try {
      setIsLoading(true);
      const response = await axios.get(
        `${urls.API_BASE_URL}/multimedia-files/${id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          responseType: 'blob',
        }
      );
      setIsLoading(false);
      const url = URL.createObjectURL(response.data);
      setAudio({ audioUrl: url, audioId: id });
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;
    fetchAudio();
    return () => {
      setAudio({ audioUrl: '', audioId: '' });
    };
  }, [fetchAudio, id]);

  return {
    fetchAudio,
    audio,
    loadingAudio: isLoading,
    setAudio,
  };
};

export default useAudioGet;
