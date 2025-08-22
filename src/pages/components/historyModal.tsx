import React, { useState } from 'react';
import styled from 'styled-components';
import { BsTrash3 } from 'react-icons/bs';
import { FiSearch, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { ChatThreadView } from 'generated/index';

const SidebarContainer = styled(motion.div)<{ isOpen: boolean }>`
  position: fixed;
  top: 80px;
  left: 0;
  height: 90vh;
  width: 70%;
  z-index: 50;
  background-color: white;
  border: 1px solid #6689ea;
  border-radius: 6px;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    width: 400px;
    flex-shrink: 0;
    background-color: white;
    border-right: 1px solid #e5e7eb;
    height: 600px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: unset;
  }
`;

const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 40;

  @media (min-width: 768px) {
    display: none;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
`;

const CloseButton = styled.button`
  padding: 8px;
  border: none;
  background: none;
  border-radius: 8px;
  cursor: pointer;
  color: #6b7280;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #f3f4f6;
    color: #374151;
  }
`;

const SearchContainer = styled.div`
  padding: 16px 24px;
  border-bottom: 1px solid #e5e7eb;
`;

const SearchWrapper = styled.div`
  position: relative;
`;

const SearchIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  color: #9ca3af;
  pointer-events: none;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px 12px 44px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  color: #1f2937;
  background-color: white;
  transition: all 0.2s ease;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const Section = styled.div`
  padding: 16px 15px;
`;

const HistoryList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const HistoryItem = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 8px;
  border-radius: 8px;
  border-bottom: 1px solid #ededed;
  cursor: pointer;

  &:hover {
    background-color: #f9fafb;
  }

  &:hover .actions {
    opacity: 1;
  }
`;

const ItemContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const ItemTitle = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #1f2937;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ItemActions = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  transition: opacity 0.2s ease;
`;

const ActionButton = styled.button`
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;
  color: #6b7280;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 32px 16px;
  color: #6b7280;
  font-size: 14px;
`;

interface ChatHistorySidebarProps {
  onClose: () => void;
  isLoading?: boolean;
  isOpen: boolean;
  historyItems?: ChatThreadView[];
  title: string;
  handleDelete: (id: string) => void;
  handleClick: () => void;
}

const ChatHistorySidebar: React.FC<ChatHistorySidebarProps> = ({
  onClose,
  historyItems = [],
  handleClick,
  isLoading,
  handleDelete,
  isOpen,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = historyItems.filter((item) =>
    item.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const navigate = useNavigate();
  const { selectedCurriculum, selectedPaper } = useParams();

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const sidebarVariants = {
    hidden: {
      x: '-100%',
      transition: {
        type: 'tween',
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    visible: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      x: '-100%',
      transition: {
        type: 'tween',
        duration: 0.25,
        ease: 'easeInOut',
      },
    },
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1,
        duration: 0.3,
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
      },
    },
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.02,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.15,
      },
    },
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <Backdrop
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariants}
            onClick={handleClose}
          />

          <SidebarContainer
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sidebarVariants}
            isOpen={isOpen}
          >
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Header>
                <Title>Chat history</Title>
                <CloseButton onClick={handleClose}>
                  <FiX size={20} />
                </CloseButton>
              </Header>

              <SearchContainer>
                <SearchWrapper>
                  <SearchIcon>
                    <FiSearch size={18} />
                  </SearchIcon>
                  <SearchInput
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </SearchWrapper>
              </SearchContainer>
            </motion.div>

            <ContentContainer>
              <Section>
                <HistoryList
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={listVariants}
                >
                  {isLoading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                      <motion.div key={index} variants={itemVariants}>
                        <HistoryItem>
                          <ItemContent>
                            <Skeleton height={14} width="80%" />
                          </ItemContent>
                          <ItemActions className="actions">
                            <Skeleton circle height={20} width={20} />
                          </ItemActions>
                        </HistoryItem>
                      </motion.div>
                    ))
                  ) : filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                      <HistoryItem
                        key={item.id}
                        variants={itemVariants}
                        whileHover={{
                          scale: 1.01,
                          backgroundColor: '#f9fafb',
                        }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => {
                          navigate(
                            `/chatbot/${selectedCurriculum}/${selectedPaper}/${item.id}`
                          );
                          if (handleClick) handleClick();
                        }}
                      >
                        <ItemContent>
                          <ItemTitle>{item.title}</ItemTitle>
                        </ItemContent>
                        <ItemActions className="actions">
                          <ActionButton
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(item.id as string);
                            }}
                          >
                            <BsTrash3 size={14} />
                          </ActionButton>
                        </ItemActions>
                      </HistoryItem>
                    ))
                  ) : (
                    <motion.div variants={itemVariants}>
                      <EmptyState>No recent chats</EmptyState>
                    </motion.div>
                  )}
                </HistoryList>
              </Section>
            </ContentContainer>
          </SidebarContainer>
        </>
      )}
    </AnimatePresence>
  );
};

export default ChatHistorySidebar;
