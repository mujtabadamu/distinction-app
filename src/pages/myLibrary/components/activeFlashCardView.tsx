import { Box, Text, Button } from '@flexisaf/flexibull2';
import ContentRenderer from 'components/contentRenderer';
import { CardView, FlashcardView } from 'generated/index';
import useDisclosure from 'hooks/general/useDisclosure';
import { useFlashcardUsageTracking } from 'pages/myLibrary/components/FlashcardDashboard/hooks/useFlashcardUsageTracking';
import { useFlashcardSession } from 'pages/myLibrary/components/FlashcardDashboard/hooks/useFlashcardSession';
import { useEffect, useMemo, useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import CardCompleteModal from '../modals/flashcard/CardCompleteModal';
import { useNavigate, useLocation } from 'react-router-dom';
import StudyPalChatbot from 'components/custom/StudyPalChatbot';
import { useAuthSlice } from 'pages/auth/authSlice';

interface Props {
  flashcard: FlashcardView;
  disableStudyPal?: boolean;
  disableShare?: boolean;
  onComplete?: () => void;
  disableBackToLibrary?: boolean;
}

const common =
  'rounded-lg h-[225px] md:h-[450px] !-mb-[210px] md:!-mb-[435px] bg-[#D9D9D9] border-[3px] border-white';

const ActiveFlashCardView = ({
  flashcard,
  disableStudyPal = false,
  disableShare = false,
  onComplete,
  disableBackToLibrary = false,
}: Props) => {
  const cards = flashcard?.cards || [];
  const [isClicked, setIsClicked] = useState(false);
  const [activeCard, setActiveCard] = useState<CardView | undefined>(cards[0]);
  const activeIndex = useMemo(
    () => cards?.findIndex((card) => card.id === activeCard?.id),
    [cards, activeCard]
  );
  const [displayText, setDisplayText] = useState(activeCard?.question);
  const handler = useDisclosure();
  // const user = useSelector(selectCurrentUser);
  const { user: loginResponse } = useAuthSlice();
  const user = loginResponse?.user;

  const navigate = useNavigate();
  const location = useLocation();

  // Session management
  const {
    currentSession,
    startSession,
    endSession,
    pauseSession,
    resumeSession,
  } = useFlashcardSession(flashcard.id || '');

  const { trackUsage } = useFlashcardUsageTracking();

  // Time tracking
  const [cardStartTime, setCardStartTime] = useState(Date.now());
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

  // Store visited cards by INDEX (not ID) to persist during unmount
  const visitedCardIndicesRef = useRef<Set<number>>(new Set());

  // Store current card index in a ref to persist during unmount
  const currentCardIndexRef = useRef<number | null>(null);

  const sessionStartedRef = useRef(false);

  useEffect(() => {
    if (!sessionStartedRef.current && user?.id && flashcard.id) {
      startSession();
      sessionStartedRef.current = true;
    }
  }, [flashcard.id, user?.id, startSession]);

  // Track visited cards when active card changes
  useEffect(() => {
    const cardIndex = activeIndex;
    if (cardIndex !== -1) {
      currentCardIndexRef.current = cardIndex;
      visitedCardIndicesRef.current.add(cardIndex);
    }
  }, [activeIndex, activeCard?.id]);

  // Track flipped cards when card is clicked
  const handleClick = () => {
    const stat = !isClicked;
    setIsClicked(stat);

    // Track that this card was flipped
    const cardId = activeCard?.id;
    if (cardId) {
      setFlippedCards((prev) => new Set(prev).add(cardId));
    }

    setTimeout(() => {
      setDisplayText((stat ? activeCard?.answer : activeCard?.question) || '');
    }, 250);
    setKey((prev) => (prev += 1));

    // Track usage
    if (activeCard && activeCard.id && currentSession?.id) {
      trackUsage(
        activeCard.id,
        'TAP_TO_FLIP',
        currentSession.id,
        Math.floor((Date.now() - cardStartTime) / 1000)
      );
    }
  };

  const handleNextCard = () => {
    const index = cards.findIndex((card) => card.id === activeCard?.id);
    const isLastPage = cards.length - 1 === index;

    if (activeCard && activeCard.id && currentSession?.id) {
      // Check if this card was ever flipped during the session
      const wasCardFlipped = flippedCards.has(activeCard.id);
      trackUsage(
        activeCard.id,
        wasCardFlipped ? 'COMPLETE' : 'SKIP',
        currentSession.id,
        Math.floor((Date.now() - cardStartTime) / 1000)
      );
    }

    if (isLastPage) {
      handler.onOpen();
    } else if (index !== -1) {
      setActiveCard(cards[index + 1]);
      setIsClicked(false);
      setCardStartTime(Date.now());
    }
  };

  const handlePreviousCard = () => {
    const index = cards.findIndex((card) => card.id === activeCard?.id);
    const isFirstPage = index === 0;

    if (activeCard && activeCard.id && currentSession?.id) {
      // Check if this card was ever flipped during the session
      const wasCardFlipped = flippedCards.has(activeCard.id);
      trackUsage(
        activeCard.id,
        wasCardFlipped ? 'COMPLETE' : 'SKIP',
        currentSession.id,
        Math.floor((Date.now() - cardStartTime) / 1000)
      );
    }

    if (isFirstPage) return;
    setActiveCard(cards[index - 1]);
    setIsClicked(false);
    setCardStartTime(Date.now());
  };

  useEffect(() => {
    if (!activeCard && cards.length) setActiveCard(cards[0]);
  }, [cards, activeCard]);

  useEffect(() => {
    setDisplayText(activeCard?.question);
  }, [activeCard]);

  const [key, setKey] = useState(0);

  const handleRepeat = () => {
    // Track complete action when repeating flashcards
    if (activeCard?.id && currentSession?.id) {
      const timeSpent = getTimeSpentSeconds();
      trackUsage(activeCard.id, 'COMPLETE', currentSession.id, timeSpent);
    }
    setActiveCard(cards?.[0]);
    setIsClicked(false);
    handler.onClose();
  };

  // Smart session ending logic with debugging
  const getSessionEndStatus = () => {
    const totalCards = cards.length;

    // Ensure the current card index is marked as visited before determining status
    const currentCardIndex = currentCardIndexRef.current ?? activeIndex;
    if (
      currentCardIndex !== -1 &&
      !visitedCardIndicesRef.current.has(currentCardIndex)
    ) {
      visitedCardIndicesRef.current.add(currentCardIndex);
    }

    // Use the ref instead of state to get the actual visited cards
    const visitedCount = visitedCardIndicesRef.current.size;

    // Check if the last card has been opened
    const lastCardIndex = totalCards - 1;
    const lastCard = cards[lastCardIndex];
    const isLastCardVisited = lastCard?.id
      ? visitedCardIndicesRef.current.has(lastCardIndex)
      : false;

    // If the last card has been opened, always mark as COMPLETED
    if (isLastCardVisited && totalCards > 0) {
      return 'COMPLETED';
    }

    // Mark as COMPLETED if user has visited all cards
    if (visitedCount === totalCards && totalCards > 0) {
      return 'COMPLETED';
    }

    return 'ABANDONED';
  };

  // Session state management
  const sessionEndedRef = useRef(false);
  const isNavigatingAwayRef = useRef(false);
  const isTabChangingRef = useRef(false);
  const currentPathRef = useRef(location.pathname);
  const sessionEndingPromiseRef = useRef<Promise<void> | null>(null);
  const persistentSessionIdRef = useRef<string | null>(null);

  // Store session ID persistently and track session changes
  useEffect(() => {
    if (currentSession?.id) {
      persistentSessionIdRef.current = currentSession.id;
    }
  }, [currentSession?.id]);

  // Session cleanup function
  const cleanupSession = useRef(async () => {
    // Use persistent session ID if currentSession is lost (due to unmount)
    const sessionId = currentSession?.id || persistentSessionIdRef.current;

    if (sessionEndedRef.current || !sessionId) {
      return;
    }

    // Prevent multiple simultaneous session endings
    if (sessionEndingPromiseRef.current) {
      await sessionEndingPromiseRef.current;
      return;
    }

    try {
      sessionEndedRef.current = true;
      const getStatus = getSessionEndStatus;

      if (sessionId && getStatus) {
        const endStatus = getStatus();
        sessionEndingPromiseRef.current = endSession(endStatus, sessionId);
        await sessionEndingPromiseRef.current;
      }
    } catch (error) {
      console.error('Error ending session:', error);
      // Reset the flag to allow retry if needed
      sessionEndedRef.current = false;
    } finally {
      sessionEndingPromiseRef.current = null;
    }
  });

  // Handle page unload and beforeunload events
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (currentSession?.id && !sessionEndedRef.current) {
        // Pause the session before showing confirmation dialog
        pauseSession();

        // Show confirmation dialog and prevent unload if user cancels
        const message =
          'You have an active flashcard session. Your progress will be lost if you leave now.';
        event.preventDefault();
        event.returnValue = message;

        return message;
      }
    };

    const handlePageHide = (event: PageTransitionEvent) => {
      // Only end session if the page is actually being unloaded (not persisted)
      if (currentSession?.id && !sessionEndedRef.current && !event.persisted) {
        cleanupSession.current();
      }
    };

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('pagehide', handlePageHide);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('pagehide', handlePageHide);
    };
  }, [currentSession, endSession, pauseSession]);

  // Handle pause/resume on visibility change (tab switching)
  useEffect(() => {
    let tabChangeInProgress = false;

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        tabChangeInProgress = true;
        isTabChangingRef.current = true;
        if (currentSession?.id && !sessionEndedRef.current) {
          pauseSession();
        }
      } else if (document.visibilityState === 'visible') {
        if (currentSession?.id && !sessionEndedRef.current) {
          resumeSession();
        }

        // Keep the flag true for a bit longer to handle any delayed unmounts
        setTimeout(() => {
          if (tabChangeInProgress) {
            tabChangeInProgress = false;
            isTabChangingRef.current = false;
          }
        }, 1000);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [pauseSession, resumeSession, currentSession]);

  // Keyboard navigation for laptop users
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle arrow keys if not typing in an input field
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.contentEditable === 'true'
      ) {
        return;
      }

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          // Track action based on whether card was flipped
          if (activeCard?.id && currentSession?.id) {
            const actionType = isClicked ? 'COMPLETE' : 'SKIP';
            const timeSpent = getTimeSpentSeconds();
            trackUsage(activeCard.id, actionType, currentSession.id, timeSpent);
          }
          handlePreviousCard();
          break;
        case 'ArrowRight':
          event.preventDefault();
          // Track action based on whether card was flipped
          if (activeCard?.id && currentSession?.id) {
            const actionType = isClicked ? 'COMPLETE' : 'SKIP';
            const timeSpent = getTimeSpentSeconds();
            trackUsage(activeCard.id, actionType, currentSession.id, timeSpent);
          }
          handleNextCard();
          break;
        case ' ':
        case 'Enter':
          event.preventDefault();
          handleClick();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    activeCard,
    currentSession,
    isClicked,
    handleNextCard,
    handlePreviousCard,
    handleClick,
    trackUsage,
  ]);

  // Route change detection
  useEffect(() => {
    const currentPath = location.pathname;
    const previousPath = currentPathRef.current;

    // Check if we're navigating away from the flashcard view
    if (
      previousPath !== currentPath &&
      previousPath.includes('/flashcard/') &&
      !currentPath.includes('/flashcard/') &&
      currentSession?.id &&
      !sessionEndedRef.current &&
      !isNavigatingAwayRef.current
    ) {
      // Show confirmation dialog before navigating away
      const confirmNavigation = window.confirm(
        'You have an active flashcard session. Your progress will be lost if you leave now. Are you sure you want to leave?'
      );

      if (confirmNavigation) {
        isNavigatingAwayRef.current = true;
        cleanupSession
          .current()
          .then(() => {
            // Navigate to the library
            navigate(`/my-library/flashcard/course/${flashcard?.paper?.id}`);
          })
          .catch((error) => {
            console.error('Failed to end session for navigation:', error);
          });
      } else {
        // Prevent navigation by going back to the previous path
        window.history.pushState(null, '', previousPath);
        return;
      }
    }

    currentPathRef.current = currentPath;
  }, [location.pathname, currentSession]);

  // End session on unmount
  useEffect(() => {
    return () => {
      const sessionId = currentSession?.id || persistentSessionIdRef.current;

      // Check if this is likely a tab change by looking at the visibility state
      const isLikelyTabChange =
        document.visibilityState === 'hidden' ||
        (document.visibilityState === 'visible' && isTabChangingRef.current);

      if (
        sessionId &&
        !sessionEndedRef.current &&
        !isNavigatingAwayRef.current &&
        !isLikelyTabChange
      ) {
        cleanupSession.current();
      } else if (isLikelyTabChange) {
        // Tab change detected, session cleanup skipped
      }
    };
  }, [currentSession]);

  // Start time tracking when card changes
  useEffect(() => {
    setCardStartTime(Date.now());
  }, [activeCard]);

  const getTimeSpentSeconds = () => {
    return Math.floor((Date.now() - cardStartTime) / 1000);
  };

  const [touchEnd, setTouchEnd] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    // Store initial X and Y coordinates
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
    setTouchEnd(0);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const touchMoveX = e.touches[0].clientX;
    const touchMoveY = e.touches[0].clientY;

    // Calculate the absolute difference between start and move positions
    const deltaX = Math.abs(touchMoveX - touchStartX);
    const deltaY = Math.abs(touchMoveY - touchStartY);

    // Prevent default only if vertical movement is more significant
    if (deltaY > deltaX) {
      e.preventDefault();
    }

    setTouchEnd(touchMoveX);
  };

  const onTouchEnd = () => {
    if (!touchStartX || !touchEnd) return;

    const distance = touchStartX - touchEnd;

    // Add a check for minimum movement to trigger a swipe
    const isSignificantSwipe = Math.abs(distance) > minSwipeDistance;

    if (isSignificantSwipe) {
      const isLeftSwipe = distance > minSwipeDistance;
      const isRightSwipe = distance < -minSwipeDistance;

      if (isLeftSwipe) {
        // Track action based on whether card was flipped
        if (activeCard?.id && currentSession?.id) {
          const actionType = isClicked ? 'COMPLETE' : 'SKIP';
          const timeSpent = getTimeSpentSeconds();
          trackUsage(activeCard.id, actionType, currentSession.id, timeSpent);
        }
        handleNextCard();
      }

      if (isRightSwipe) {
        // Track action based on whether card was flipped
        if (activeCard?.id && currentSession?.id) {
          const actionType = isClicked ? 'COMPLETE' : 'SKIP';
          const timeSpent = getTimeSpentSeconds();
          trackUsage(activeCard.id, actionType, currentSession.id, timeSpent);
        }
        handlePreviousCard();
      }
    }
  };

  const handleBackToLibrary = async () => {
    try {
      isNavigatingAwayRef.current = true;
      await cleanupSession.current();
      navigate(`/my-library/flashcard/course/${flashcard?.paper?.id}`);
    } catch (error) {
      // Still navigate even if session ending fails
      navigate(`/my-library/flashcard/course/${flashcard?.paper?.id}`);
    }
  };

  const [showChatbot, setShowChatbot] = useState(false);

  // Track if completion callback has been called
  const completionCalledRef = useRef(false);
  useEffect(() => {
    if (handler.isOpen && !completionCalledRef.current) {
      if (onComplete) onComplete();
      completionCalledRef.current = true;
    }
    if (!handler.isOpen) {
      completionCalledRef.current = false;
    }
  }, [handler.isOpen, onComplete]);

  return (
    <Box width="100%" height="100%">
      <Box width="100%" minWidth={0}>
        <Box className=" bg-[#101A33] !p-4 !md:p-6 !md:px-8 !mb-9">
          <Box className="flex justify-between items-center">
            <Text className="text-white">
              {flashcard?.paper?.name} - ({flashcard?.difficulty})
            </Text>
            {/* <i className="saf-close-square text-white text-xl" /> */}
          </Box>

          <Box className="w-full flex justify-center">
            <Box className="w-[100%] md:w-[70%] max-w-[800px] flex flex-col items-center !my-6">
              <Box className={`w-[88%] opacity-25 ${common}`} />
              <Box className={`w-[92%] opacity-70 z-[2] ${common}`} />
              <Box className={` w-[96%] z-[3] ${common}`} />
              <StyledBox
                isClicked={isClicked}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                onClick={handleClick}
              >
                <StyledText key={key}>
                  <ContentRenderer content={displayText as string} />
                </StyledText>
              </StyledBox>
            </Box>
          </Box>

          <Text block className="text-white text-center my-6">
            Click on card to flip
          </Text>

          <Box className="w-full flex justify-center !mb-12">
            <Box className="w-[80%] md:w-[70%] max-w-[800px] flex items-center justify-between !pt-4 border-t border-white">
              <div className="w-[50px]" />
              <Box className="flex items-center space-x-4">
                <i
                  onClick={handlePreviousCard}
                  className="saf-arrow-square-left text-white text-xl cursor-pointer"
                />
                <Text className="text-white">
                  {activeIndex + 1}/{cards.length}
                </Text>
                {activeIndex === cards.length - 1 ? (
                  <Button
                    onClick={handler.onOpen}
                    style={{
                      minWidth: 40,
                      padding: '2px 8px',
                      fontSize: '0.875rem',
                      height: '28px',
                      lineHeight: '1',
                    }}
                    className="!px-2 !py-1 !text-sm"
                  >
                    Finish
                  </Button>
                ) : (
                  <i
                    onClick={handleNextCard}
                    className="saf-arrow-square-left rotate-180 text-white text-xl cursor-pointer"
                  />
                )}
              </Box>
              {disableShare ? (
                <div className="w-[50px]" />
              ) : (
                <Box className="flex items-center space-x-2">
                  <i className="saf-share text-white text-xl cursor-pointer" />
                  <Text className="text-white">Share</Text>
                </Box>
              )}
            </Box>
          </Box>
        </Box>

        <CardCompleteModal
          onRepeat={handleRepeat}
          isOpen={handler.isOpen}
          onClose={handler.onClose}
          onBackToLibrary={handleBackToLibrary}
          disableBackToLibrary={disableBackToLibrary}
        />
      </Box>
      {/* Floating Chatbot Overlay */}
      {!disableStudyPal && (
        <>
          <div
            style={{
              position: 'fixed',
              bottom: 16,
              right: 16,
              zIndex: 2000,
              width: 380,
              maxWidth: '95vw',
              height: 600,
              maxHeight: '80vh',
              background: '#fff',
              borderRadius: 16,
              boxShadow: '0 8px 32px rgba(16,26,51,0.16)',
              display: showChatbot ? 'flex' : 'none',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <StudyPalChatbot
              user={
                user
                  ? {
                      id: user.id,
                      name: `${user.firstName} ${user.lastName}`,
                    }
                  : undefined
              }
              subject={flashcard?.paper?.name || ''}
              topic={(flashcard?.title || '')
                .replace(/\s*Flashcards\s*$/i, '')
                .trim()}
              onClose={() => setShowChatbot(false)}
            />
          </div>
          {/* Floating Chat Button */}
          {!showChatbot && (
            <button
              onClick={() => setShowChatbot(true)}
              style={{
                position: 'fixed',
                bottom: 16,
                right: 16,
                zIndex: 2000,
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: '#2563eb',
                color: '#fff',
                border: 'none',
                boxShadow: '0 4px 16px rgba(16,26,51,0.16)',
                fontSize: 32,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Open Chatbot"
            >
              <span role="img" aria-label="Chat">
                💬
              </span>
            </button>
          )}
        </>
      )}
    </Box>
  );
};

export default ActiveFlashCardView;

const retractExpand = keyframes`
  0% {
    transform: scaleY(1); /* Original size */
    background-color: #FFCB66;
  }
  50% {
    transform: scaleY(0.1); /* Retract vertically by 15% on top and 15% on bottom */
    background-color: #F5F5F7;
  }
  100% {
    transform: scaleY(1); /* Expand back to original size */
    background-color: #F5F5F7;
  }
`;

const retractExpandBack = keyframes`
  0% {
    transform: scaleY(1); /* Original size */
    background-color: #F5F5F7;
  }
  50% {
    transform: scaleY(0.1); /* Retract vertically by 15% on top and 15% on bottom */
    background-color: #FFCB66;
  }
  100% {
    transform: scaleY(1); /* Expand back to original size */
    background-color: #FFCB66;
  }
`;

const textAnimation = keyframes`
  0% {
    opacity: 1;
  }
  40% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const StyledBox = styled(Box)<{ isClicked: boolean }>`
  border-radius: 0.75rem; /* rounded-lg */
  height: 225px; /* Responsive height */
  @media (min-width: 768px) {
    height: 450px; /* For medium screens */
  }
  width: 100%;
  background-color: ${(props) => (props.isClicked ? '#F5F5F7' : '#FFCB66')};
  z-index: 4;
  display: flex;
  padding: 0.5rem;
  align-items: center;
  justify-content: center;
  overflow: auto;
  animation: ${(props) => (props.isClicked ? retractExpand : retractExpandBack)}
    0.5s forwards;
  transform-origin: center;
  transition: background-color 0.5s ease;
`;

const StyledText = styled(Text)`
  font-size: 1.125rem; /* text-lg */
  text-align: center;
  opacity: 1;
  animation: ${textAnimation} 0.5s forwards;
  transition: opacity 0.5s ease;
  @media (min-width: 768px) {
    font-size: 2rem; /* md:text-[32px] */
  }
`;
