import ReactPlayer, { Config as PlayerConfig } from 'react-player';
import { useEffect, useState } from 'react';
import tvStatic from 'assets/gifs/tv-static.gif';

import { Box } from '@flexisaf/flexibull2/build/layout';
import { GENERIC_VIDEO_PLAYBACK_ERROR_MESSAGE } from 'utils/constants';

export interface VideoComponentProps {
  src: string;
  type: string;
  height?: string;
}

export const VideoPlayer = (props: VideoComponentProps) => {
  const [fileUrl, setFileUrl] = useState<string>(props.src);
  const [hasLoaded, toggleHasLoaded] = useState(false);
  const [mediaError, setError] = useState<Error>();

  useEffect(() => {
    if (props.src) {
      setFileUrl(props.src);
    }
  }, [props.src]);

  const handleOnPlayerReady = () => {
    toggleHasLoaded(true);
  };

  const handleMediaError = (err: Error) => {
    console.error(err);
    setError(err);
  };

  const src = fileUrl;
  const mediaPlayerHeight = props.height ?? 'auto';
  const playerConfig = buildPlayerConfig(props.type);

  return (
    <div>
      {src ? (
        <>
          <ReactPlayer
            url={src}
            width="100%"
            onReady={handleOnPlayerReady}
            height={hasLoaded ? mediaPlayerHeight : '0px'}
            onError={handleMediaError}
            config={playerConfig}
            controls={hasLoaded}
          />
          {!hasLoaded && (
            <Box
              display="flex"
              style={{
                backgroundImage: `url(${tvStatic})`,
                alignItems: 'center',

                justifyContent: 'center',
                height: mediaPlayerHeight,
                width: '100%',
              }}
            >
              <div className=" bg-gray-900 inline-grid place-items-center px-3 py-2">
                {mediaError ? (
                  <span className="text-red-300">
                    {' '}
                    {mediaError.message ?? GENERIC_VIDEO_PLAYBACK_ERROR_MESSAGE}
                  </span>
                ) : (
                  <span className="text-white">Loading {props.type}...</span>
                )}
              </div>
            </Box>
          )}
        </>
      ) : (
        <Box
          display="flex"
          className="text-gray-600 flex rounded-md bg-gray-200 "
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: mediaPlayerHeight,
          }}
        >
          <p className="text-gray-600">No {props.type} source provided.</p>
        </Box>
      )}
    </div>
  );
};

function buildPlayerConfig(type: string): PlayerConfig {
  let playerConfig: PlayerConfig = {};
  if (type === 'audio') {
    playerConfig = { ...playerConfig, file: { forceAudio: true } };
  }
  return playerConfig;
}
