import { Box, Button, EmptyState, Input } from '@flexisaf/flexibull2';
import SectionLoader from 'components/custom/sectionLoader';
import { KeypointView } from 'generated/index';
import useDisclosure from 'hooks/general/useDisclosure';
import React, { useState, useEffect, useMemo } from 'react';
import { useAppSelector } from 'redux/hooks/useAppSelector';
import CardMenu from '../components/cardMenu';
import useKeypointsGet from '../keyPointPages/hooks/useKeypointsGet';
import ShareFlashcardModal from '../modals/flashcard/ShareFlashcardModal';
import CreateKeypointModal from '../modals/keypoints/CreateKeypointModal';
import FeatureTour from 'components/onboarding/FeatureTour';
import { Step } from 'react-joyride';
import useSubscriptionBilling from 'pages/profile/hooks/useSubscriptionBilling';
import PlanLimitBlock from 'pages/profile/subscription/PlanLimitBlock';
import { DistinctionFeatureProperty } from 'utils/constants';
import SubscriptionPlansModal from 'pages/profile/subscription/SubscriptionPlansModal';

const KeyPointsTab = () => {
  const handler = useDisclosure();
  const planLimitHandler = useDisclosure();
  const subscriptionPlanHandler = useDisclosure();
  const [activeCard, setActiveCard] = useState<KeypointView | undefined>(
    undefined
  );
  const [showTour, setShowTour] = useState(false);

  const studentId = useAppSelector((state) => state.auth?.currentUser?.id);
  const { keypoints, loading, searchText, setSearchText, refetch } =
    useKeypointsGet({
      studentId,
    });
  const { getFeatureLimit, loadingFeatureLimit } = useSubscriptionBilling();

  const shareHandler = useDisclosure();
  const deleteHandler = useDisclosure();

  // Keypoints tour steps
  const keypointsTourSteps: Step[] = useMemo(
    () => [
      {
        target: 'body',
        content:
          "Welcome to Key Points! Let's learn how to create and manage key points for effective studying.",
        placement: 'center',
        disableBeacon: true,
      },
      {
        target: '[data-tour="generate-keypoints"]',
        content:
          'Click here to generate new key points. Extract important concepts from your study materials.',
        placement: 'bottom',
      },
      {
        target: '[data-tour="keypoints-search"]',
        content:
          'Use the search bar to find specific key points or filter by topic.',
        placement: 'bottom',
      },
      {
        target: '[data-tour="keypoint-card"]',
        content:
          'Click on any key point to view details and study the important concepts.',
        placement: 'bottom',
      },
    ],
    []
  );

  // Check if tour should be shown
  useEffect(() => {
    const progress = sessionStorage.getItem('keypoints_onboarding');
    if (!progress && !loading) {
      setShowTour(true);
    } else if (progress && !loading) {
      try {
        const parsed = JSON.parse(progress);
        if (
          !parsed ||
          parsed.tourVersion !== '1.0' ||
          parsed.lastCompletedStep < keypointsTourSteps.length - 1
        ) {
          setShowTour(true);
        }
      } catch (e) {
        setShowTour(true);
      }
    }
  }, [loading]);

  const onShare = (card: KeypointView) => {
    setActiveCard(card);
    shareHandler.onOpen();
  };

  const onDelete = (card: KeypointView) => {
    setActiveCard(card);
    deleteHandler.onOpen();
  };

  const CheckPlanLimit = async () => {
    const payload = {
      property: DistinctionFeatureProperty.KEYPOINTS,
    };
    const result = await getFeatureLimit(payload);
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
        tourKey="keypoints"
        tourVersion="1.0"
        steps={keypointsTourSteps}
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
            data-tour="keypoints-search"
          />
        </Box>
        <Button
          onClick={CheckPlanLimit}
          iconLeft={<i className="saf-note"></i>}
          progress={loadingFeatureLimit}
          data-tour="generate-keypoints"
        >
          Generate Key Points
        </Button>
      </Box>

      <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-4 auto-rows-fr pb-20 md:pb-0">
        {loading ? (
          <SectionLoader height="30vh" />
        ) : keypoints?.length ? (
          keypoints.map((card) => (
            <CardMenu
              isKeypoint
              key={card.id}
              card={card}
              onDelete={onDelete}
              onShare={onShare}
              data-tour="keypoint-card"
            />
          ))
        ) : (
          <EmptyState
            title="No key point created yet"
            info="Please click the Generate Key Points button to start"
            style={{ width: '100%' }}
          />
        )}
      </div>

      <CreateKeypointModal
        isOpen={handler.isOpen}
        onClose={() => handler.onClose()}
        callback={() => {
          refetch();
          handler.onClose();
        }}
      />

      <ShareFlashcardModal
        card={activeCard}
        isKeypoint
        isOpen={shareHandler.isOpen}
        onClose={() => {
          setActiveCard(undefined);
          shareHandler.onClose();
        }}
      />
      <PlanLimitBlock
        isOpen={planLimitHandler.isOpen}
        closeModal={planLimitHandler.onClose}
        feature={DistinctionFeatureProperty.KEYPOINTS}
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

export default KeyPointsTab;
