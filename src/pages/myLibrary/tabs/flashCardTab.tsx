import { Box, Button, EmptyState, Input } from '@flexisaf/flexibull2';
import SectionLoader from 'components/custom/sectionLoader';
import { FlashcardView } from 'generated/index';
import useDisclosure from 'hooks/general/useDisclosure';
import React, { useState, useEffect, useMemo } from 'react';
import { useAppSelector } from 'redux/hooks/useAppSelector';
import CardMenu from '../components/cardMenu';
import useFlashcardsGet from '../flashCardPages/hooks/useFlashcardsGet';
import CreateFlashcardModal from '../modals/flashcard/CreateFlashcardModal';
import ShareFlashcardModal from '../modals/flashcard/ShareFlashcardModal';
import FeatureTour from 'components/onboarding/FeatureTour';
import { Step } from 'react-joyride';

import useSubscriptionBilling, {
  DistinctionFeature,
} from 'pages/profile/hooks/useSubscriptionBilling';
import PlanLimitBlock from 'pages/profile/subscription/PlanLimitBlock';
import { DistinctionFeatureProperty } from 'utils/constants';
import SubscriptionPlansModal from 'pages/profile/subscription/SubscriptionPlansModal';

const FlashCardTab = () => {
  const handler = useDisclosure();
  const planLimitHandler = useDisclosure();
  const subscriptionPlanHandler = useDisclosure();
  const studentId = useAppSelector((state) => state.auth?.currentUser?.id);
  const [activeCard, setActiveCard] = useState<FlashcardView | undefined>(
    undefined
  );
  const [showTour, setShowTour] = useState(false);

  const { flashcards, loading, searchText, setSearchText, refetch } =
    useFlashcardsGet({
      studentId,
    });
  const { getFeatureLimit, loadingFeatureLimit } = useSubscriptionBilling();

  const shareHandler = useDisclosure();
  const deleteHandler = useDisclosure();

  // Flashcard tour steps
  const flashcardTourSteps: Step[] = useMemo(
    () => [
      {
        target: 'body',
        content:
          'Welcome! This is your hub for creating and studying Flashcards and Keypoints.',
        placement: 'center',
        disableBeacon: true,
      },
      {
        target: '[data-tour="generate-flashcards"]',
        content:
          'Click here to create new flashcards from curriculum or uploads.',
        placement: 'bottom',
      },
      {
        target: '[data-tour="flashcard-search"]',
        content: 'Quickly find and review your saved decks.',
        placement: 'bottom',
      },
    ],
    []
  );

  // Check if tour should be shown
  useEffect(() => {
    const progress = sessionStorage.getItem('flashcard_onboarding');
    if (!progress && !loading) {
      setShowTour(true);
    } else if (progress && !loading) {
      try {
        const parsed = JSON.parse(progress);
        if (
          !parsed ||
          parsed.tourVersion !== '1.0' ||
          parsed.lastCompletedStep < flashcardTourSteps.length - 1
        ) {
          setShowTour(true);
        }
      } catch (e) {
        setShowTour(true);
      }
    }
  }, [loading]);

  const onShare = (card: FlashcardView) => {
    setActiveCard(card);
    shareHandler.onOpen();
  };

  const onDelete = (card: FlashcardView) => {
    setActiveCard(card);
    deleteHandler.onOpen();
  };

  const CheckPlanLimit = async () => {
    const payload = {
      property: DistinctionFeatureProperty.FLASHCARD,
    };
    const result = await getFeatureLimit(payload as DistinctionFeature);

    if (result.success && Number(result.balance) === 0) {
      planLimitHandler.onOpen();
    } else {
      handler.onOpen();
    }
  };

  const handleTourComplete = () => {
    setShowTour(false);
  };

  return (
    <>
      <FeatureTour
        tourKey="flashcard"
        tourVersion="1.0"
        steps={flashcardTourSteps}
        run={showTour}
        onComplete={handleTourComplete}
      />

      <Box className="flex gap-3 flex-wrap items-center justify-between !my-4">
        <Box className="w-[100%] md:w-[250px]">
          <Input
            type="text"
            iconRight="saf-search-normal"
            placeholder="Search"
            block
            value={searchText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchText(e.target.value)
            }
            data-tour="flashcard-search"
          />
        </Box>
        <Button
          onClick={CheckPlanLimit}
          iconLeft={<i className="saf-note"></i>}
          progress={loadingFeatureLimit}
          data-tour="generate-flashcards"
        >
          Generate Flashcards
        </Button>
      </Box>

      <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-4 auto-rows-fr pb-20 md:pb-0">
        {loading ? (
          <SectionLoader height="30vh" />
        ) : flashcards?.length ? (
          flashcards.map((card) => (
            <CardMenu
              key={card.id}
              card={card}
              onDelete={onDelete}
              onShare={onShare}
              data-tour="flashcard-card"
            />
          ))
        ) : (
          <EmptyState
            title="No flashcard created yet"
            info="Please click the Generate Flascards button to start"
            style={{ width: '100%' }}
          />
        )}
      </div>

      <CreateFlashcardModal
        isOpen={handler.isOpen}
        onClose={() => handler.onClose()}
        callback={() => {
          refetch();
          handler.onClose();
        }}
      />
      <ShareFlashcardModal
        card={activeCard}
        isOpen={shareHandler.isOpen}
        onClose={() => {
          setActiveCard(undefined);
          shareHandler.onClose();
        }}
      />
      <PlanLimitBlock
        isOpen={planLimitHandler.isOpen}
        closeModal={planLimitHandler.onClose}
        feature={DistinctionFeatureProperty.FLASHCARD}
        togglePlansModal={() => {
          planLimitHandler.onClose();
          subscriptionPlanHandler.onOpen();
        }}
      />
      <SubscriptionPlansModal
        onClose={subscriptionPlanHandler.onClose}
        openModal={subscriptionPlanHandler.isOpen}
      />
    </>
  );
};

export default FlashCardTab;
