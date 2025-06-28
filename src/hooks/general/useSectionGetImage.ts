import { useCallback, useEffect, useState } from 'react';
import { getLocalAccessToken } from '../../utils/helpers';
import API_BASE_URL from '../../utils/config';

interface IdProps {
  id: string | number | undefined;
}

const useGetSectionImage = ({ id }: IdProps) => {
  const [imageSrc, setImageSrc] = useState('');
  const [imageLoad, setImageLoad] = useState(false);
  const [errorImage, setErrorImage] = useState('');
  const getSectionImage = useCallback(async () => {
    if (!id) return;
    const authToken = getLocalAccessToken();

    try {
      setImageLoad(true);
      fetch(`${API_BASE_URL.API_BASE_URL}/images/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then((response) => response.blob())
        .then((data) => {
          setImageLoad(false);
          const url = URL.createObjectURL(data);
          setImageSrc(url);
        })
        .catch((error) => {
          setImageLoad(false);
          setErrorImage(error.message);
        });
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    getSectionImage();
    return () => {
      setImageSrc('');
    };
  }, [getSectionImage]);

  return {
    imageSrc,
    imageLoad,
    errorImage,
  };
};

export default useGetSectionImage;
