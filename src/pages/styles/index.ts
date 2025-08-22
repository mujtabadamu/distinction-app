import styled, { keyframes } from 'styled-components';
import Theme from '../../../utils/theme';

export const BotResponseContainer = styled.div`
  margin-bottom: 20px;
  text-align: justify;
  font-size: 1rem;
  line-height: 1.75;
  color: #202020;

  & .response-text {
    padding: 0 20px;
    padding: 4px 20px 24px;
  }
`;

export const MessageBox = styled.div<{ animate?: boolean }>`
  animation: ${(p) =>
    p.animate ? 'fadeSlide 0.4s ease-out forwards' : 'none'};
  @keyframes fadeSlide {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const ChatBotContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px;
  height: 80dvh;
`;

export const ChatBotAside = styled.div`
  width: 210px;
  padding: 16px 8px;
  height: fit-content;
  display: flex;
  gap: 10px;
`;

export const HistorySection = styled.div`
  margin-top: 2rem;
  & .title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1rem;
  }
`;

export const HistoryListContainer = styled.div`
  list-style-type: none;
  max-width: 100%;
  padding: 0.5rem 0;
  text-align: center;
  max-height: 600px;
  overflow-x: scroll;
  .list-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .list-item {
    padding: 10px;
    transition: background-color 0.3s ease;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    width: 100%;
  }

  .list-item:hover {
    background-color: #2998ec14;
  }
`;
export const ChatInterface = styled.div`
  position: relative;
  flex: 1;

  h1 {
    color: #2998ec;
  }
  @media (min-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  & .response-section {
    min-height: 40dvh;
    max-height: 60dvh;
    min-height: 50dvh;
    max-height: calc(100vh 280px);
    overflow-y: scroll;
    width: 100%;
    max-width: 800px;
    @media (min-width: 390px) {
      max-height: 65dvh;
    }
    @media (min-width: 412px) {
      max-height: 68dvh;
    }
    @media (min-width: 768px) {
      margin: 15px 0 0;
    }
    margin: 0 auto;
    padding: 20px;
    padding-bottom: 80px;
    scrollbar-width: 2px;
    /* scrollbar-color: #7c7c7c; */
    ::-webkit-scrollbar {
      height: 4px;
      width: 5px;
    }
    &::-webkit-scrollbar-track {
      /* background: #f1f1f1; */
      height: 4px;
    }
    &::-webkit-scrollbar-button {
      width: 50px;
      height: 50px;
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background: #d3d3d3;
      opacity: 0.5;
      height: 4px;
      width: 4px;
      border-radius: 3px;
    }
  }

  & .prompt-section {
    position: absolute;
    width: 100%;
    max-width: 800px;
    bottom: 4rem;
    @media (min-width: 768px) {
      bottom: 9rem;
    }
    margin: 1rem auto;

    & .form-content {
      position: absolute;
      top: 1rem;
      width: 100%;
      @media (min-width: 768px) {
        top: 5rem;
      }
    }

    & .prompt-input {
      display: flex;
      flex-direction: column;
      position: relative;

      button {
        all: unset;
        position: absolute;
        right: 10px;

        bottom: 13px;
        cursor: pointer;
        opacity: 0.6;
      }
    }
  }
`;

export const UserPrompt = styled.div`
  margin-bottom: 10px;
  width: 100%;
  & .question-text {
    padding: 20px;
    font-weight: normal;
    font-size: 14px;
    background: #fff;
  }
`;

export const ChatMobileMenu = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
  @media (min-width: 768px) {
    display: none;
  }
`;

export const TopSection = styled.div<{ backgroundColor?: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;

  & span {
    background: ${(props) => props.backgroundColor || '#2998ec'};
    color: #fff;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
  }

  & i {
    color: #2998ec;
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`;

const pulse = keyframes`
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.3;
  }
`;

export const LoadingDotsContainer = styled.div`
  display: inline-block;
`;

export const LoadingDot = styled.div`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${Theme.PrimaryBlue};
  margin: 0 5px;
  animation: ${pulse} 1.5s infinite ease-in-out;

  &:nth-child(2) {
    animation-delay: 0.5s;
  }

  &:nth-child(3) {
    animation-delay: 1s;
  }
`;
