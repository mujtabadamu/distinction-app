import { useEffect, useState, useCallback } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import styled from 'styled-components';
import useProfile from 'pages/profile/hooks/useProfile';

interface TourProgress {
  lastCompletedStep: number;
  totalSteps: number;
  completedSteps: number[];
  tourVersion: string; // To track when new steps are added
}

const TourManager = () => {
  const { profileData } = useProfile();

  const [run, setRun] = useState(false);
  const [steps, setSteps] = useState<Step[]>([]);

  // Tour versions - increment when new steps are added
  const TOUR_VERSION = '1.0';

  // Get tour progress from localStorage
  const getTourProgress = (): TourProgress | null => {
    const stored = sessionStorage.getItem('onboarding_tour');
    return stored ? JSON.parse(stored) : null;
  };

  // Save tour progress to localStorage
  const saveTourProgress = (progress: TourProgress) => {
    sessionStorage.setItem('onboarding_tour', JSON.stringify(progress));
  };

  // Check if tour should be resumed
  const shouldResumeTour = (totalSteps: number): boolean => {
    const progress = getTourProgress();
    if (!progress) return false;

    // Check if tour version has changed (new steps added)
    if (progress.tourVersion !== TOUR_VERSION) {
      // New version detected, check if there are new steps
      return totalSteps > progress.totalSteps;
    }

    // Same version, check if user hasn't completed all steps
    return progress.lastCompletedStep < totalSteps - 1;
  };

  // Determine if onboarding tour should be shown
  const shouldShowOnboardingTour = useCallback((): boolean => {
    const hasSeenOnboardingTour =
      sessionStorage.getItem('onboarding_tour') === 'true';
    // Check if profile modal is open
    const profileModal = document.querySelector(
      '[data-testid="profile-complete-modal"]'
    );
    return !hasSeenOnboardingTour && !profileModal;
  }, []);

  useEffect(() => {
    const checkAndSetupTour = () => {
      if (shouldShowOnboardingTour()) {
        setupTour();
        const totalSteps = steps.length;

        if (totalSteps > 0) {
          // Check if we should resume the tour
          if (shouldResumeTour(totalSteps)) {
            setRun(true);
          } else {
            // Check if user has already seen this specific tour completely
            const progress = getTourProgress();
            const currentVersion = TOUR_VERSION;

            if (
              !progress ||
              progress.tourVersion !== currentVersion ||
              progress.lastCompletedStep < totalSteps - 1
            ) {
              setRun(true);
            }
          }
        }
      } else {
        setRun(false);
      }
    };

    checkAndSetupTour();
    // Check periodically for modal presence
    const intervalId = setInterval(checkAndSetupTour, 500);

    return () => clearInterval(intervalId);
  }, [shouldShowOnboardingTour, steps.length]);

  const setupTour = useCallback(() => {
    if (profileData) {
      const tourSteps: Step[] = [
        {
          target: 'body',
          content: `Welcome to Distinction, ${
            profileData?.firstName || 'friend'
          }! Let's take a quick tour of the key features that will help you excel in your studies.`,
          placement: 'center',
          disableBeacon: true,
          spotlightClicks: true,
          styles: {
            options: {
              zIndex: 10000,
            },
          },
        },
        {
          target: '[data-tour="practice"]',
          content:
            'Start your practice journey here! Choose from real exam mode or learning mode to test your knowledge.',
          placement: 'bottom',
        },
        {
          target: '[data-tour="flashcards"]',
          content:
            'Master key concepts with our interactive flashcards. Perfect for quick revision and memorization!',
          placement: 'bottom',
        },
        {
          target: '[data-tour="studypal"]',
          content:
            'Meet StudyPal, your AI-powered study buddy! Get instant help with difficult concepts and practice questions.',
          placement: 'bottom',
        },

        {
          target: '[data-tour="pas-system"]',
          content:
            'Earn points for your activity, climb the leaderboard, and show off your rank and badges',
          placement: 'bottom',
        },
        {
          target: '[data-tour="earn-more-points"]',
          content:
            'Click here to discover your Points Hub! Build streaks, unlock achievements, and compete with friends. Every practice session, flashcard review, and study session earns you points. The longer your streak, the more bonus points you get.',
          placement: 'bottom',
        },
      ];

      setSteps(tourSteps);
    }
  }, [profileData]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, index, type } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    const progress = getTourProgress() || {
      lastCompletedStep: 0,
      totalSteps: steps.length,
      completedSteps: [],
      tourVersion: TOUR_VERSION,
    };

    // Update progress based on action
    if (type === 'step:after' || type === 'step:before') {
      // User moved to a step, mark previous step as completed
      if (index > 0) {
        progress.lastCompletedStep = index - 1;
        if (!progress.completedSteps.includes(index - 1)) {
          progress.completedSteps.push(index - 1);
        }
      }
    } else if (finishedStatuses.includes(status)) {
      // Tour finished or skipped
      if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
        progress.lastCompletedStep = steps.length - 1;
        progress.completedSteps = Array.from(
          { length: steps.length },
          (_, i) => i
        );
      }
      // Mark tour as seen for backward compatibility
      sessionStorage.setItem('onboarding_tour', 'true');
      setRun(false);
    }

    // Update total steps and version
    progress.totalSteps = steps.length;
    progress.tourVersion = TOUR_VERSION;

    // Save updated progress
    saveTourProgress(progress);
  };

  if (!run) return null;

  return (
    <StyledJoyride
      steps={steps}
      run={run}
      continuous
      showSkipButton
      callback={handleJoyrideCallback}
      locale={{
        last: 'Finish',
        next: 'Next',
        skip: 'Skip',
        back: 'Back',
      }}
      styles={{
        options: {
          primaryColor: '#4F46E5',
          zIndex: 10000,
          arrowColor: '#FFFFFF',
          backgroundColor: '#FFFFFF',
          textColor: '#1F2937',
          overlayColor: 'rgba(0, 0, 0, 0.5)',
        },
        tooltip: {
          borderRadius: '8px',
          padding: '16px',
        },
        tooltipTitle: {
          fontSize: '18px',
          fontWeight: '600',
          marginBottom: '8px',
        },
        tooltipContent: {
          fontSize: '14px',
          lineHeight: '1.5',
        },
        buttonNext: {
          backgroundColor: '#4F46E5',
          fontSize: '14px',
          padding: '8px 16px',
          borderRadius: '6px',
        },
        buttonBack: {
          color: '#4B5563',
          marginRight: '8px',
          fontSize: '14px',
        },
        buttonSkip: {
          color: '#6B7280',
          fontSize: '14px',
        },
      }}
    />
  );
};

const StyledJoyride = styled(Joyride)`
  .react-joyride__tooltip {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .react-joyride__button {
    transition: all 0.2s ease;

    &:hover {
      transform: translateY(-1px);
    }
  }

  .react-joyride__button--primary {
    &:hover {
      background-color: #4338ca;
    }
  }

  .react-joyride__button--secondary {
    &:hover {
      color: #1f2937;
    }
  }
`;

export default TourManager;
