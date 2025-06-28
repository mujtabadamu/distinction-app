import styled from 'styled-components';

interface Props {
  embedId: string;
}
const YoutubeEmbed = ({ embedId }: Props) => {
  return (
    <VideoContainer>
      <iframe
        width="853"
        height="480"
        src={`https://www.youtube.com/embed/${encodeURIComponent(embedId)}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </VideoContainer>
  );
};

const VideoContainer = styled.div`
  overflow: hidden;
  padding-bottom: 56.25%;
  position: relative;
  height: 0;
  iframe {
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    position: absolute;
  }
`;

export default YoutubeEmbed;
