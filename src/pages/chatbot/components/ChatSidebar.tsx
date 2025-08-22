import React from 'react';
import styled from 'styled-components';
import { ChatThreadView } from 'generated/index';
import { Text } from '@flexisaf/flexibull2';

import { HistoryList } from '.';

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  historyItems: ChatThreadView[];
  handleDelete: (id: string) => void;
  handleClick?: () => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  isOpen,
  onClose,
  historyItems,
  handleDelete,
  handleClick,
}) => {
  const onSelect = () => {
    if (handleClick) {
      handleClick();
      onClose();
    }
  };
  return (
    <>
      <SidebarOverlay isOpen={isOpen} onClick={onClose} />
      <SidebarContainer isOpen={isOpen}>
        <SidebarHeader>
          <Text bold size="1rem">
            Chat History
          </Text>
          <CloseButton onClick={onClose}>
            <i className="flexibull-cancel-1" />
          </CloseButton>
        </SidebarHeader>
        <HistoryList
          historyItems={historyItems || []}
          handleDelete={handleDelete}
          handleClick={onSelect}
        />
      </SidebarContainer>
    </>
  );
};

export default ChatSidebar;

const SidebarOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};
  transition: opacity 0.3s ease;
  z-index: 1000;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const SidebarContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 260px;
  background: #fff;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '100%')});
  transition: transform 0.3s ease;
  z-index: 1000;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const SidebarHeader = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccd5e4;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  & i {
    font-size: 0.9;
  }
`;
