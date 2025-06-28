import { useEffect, useState } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import styled from 'styled-components';

interface TourProgress {
  lastCompletedStep: number;
  totalSteps: number;
  completedSteps: number[];
  tourVersion: string;
}

interface FeatureTourProps {
  tourKey: string;
  tourVersion: string;
  steps: Step[];
  run: boolean;
  onComplete: () => void;
  onSkip?: () => void;
}

const FeatureTour = ({
  tourKey,
  tourVersion,
  steps,
  run,
  onComplete,
  onSkip,
}: FeatureTourProps) => {
  const [currentRun, setCurrentRun] = useState(false);

  // Get tour progress from localStorage
  const getTourProgress = (): TourProgress | null => {
    const stored = sessionStorage.getItem(`${tourKey}_onboarding`);
    return stored ? JSON.parse(stored) : null;
  };

  // Save tour progress to localStorage
  const saveTourProgress = (progress: TourProgress) => {
    sessionStorage.setItem(`${tourKey}_onboarding`, JSON.stringify(progress));
  };

  // Check if tour should be resumed
  const shouldResumeTour = (totalSteps: number): boolean => {
    const progress = getTourProgress();
    if (!progress) return false;

    // Check if tour version has changed (new steps added)
    if (progress.tourVersion !== tourVersion) {
      // New version detected, check if there are new steps
      return totalSteps > progress.totalSteps;
    }

    // Same version, check if user hasn't completed all steps
    return progress.lastCompletedStep < totalSteps - 1;
  };

  useEffect(() => {
    const checkAndSetupTour = () => {
      // Check if profile modal is open
      const profileModal = document.querySelector(
        '[data-testid="profile-complete-modal"]'
      );
      if (profileModal) {
        setCurrentRun(false);
        return;
      }

      if (run && steps.length > 0) {
        // Check if we should resume the tour
        if (shouldResumeTour(steps.length)) {
          setCurrentRun(true);
        } else {
          // Check if user has already seen this specific tour completely
          const progress = getTourProgress();
          const currentVersion = tourVersion;

          if (
            !progress ||
            progress.tourVersion !== currentVersion ||
            progress.lastCompletedStep < steps.length - 1
          ) {
            setCurrentRun(true);
          }
        }
      } else {
        setCurrentRun(false);
      }
    };

    checkAndSetupTour();
    // Check periodically for modal presence
    const intervalId = setInterval(checkAndSetupTour, 500);

    return () => clearInterval(intervalId);
  }, [run, steps.length, tourVersion]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, index, type } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    const progress = getTourProgress() || {
      lastCompletedStep: -1,
      totalSteps: steps.length,
      completedSteps: [],
      tourVersion: tourVersion,
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

      // Mark tour as seen
      // sessionStorage.setItem(`${tourKey}Tour`, 'true');
      setCurrentRun(false);

      if (status === STATUS.FINISHED) {
        onComplete();
      } else if (status === STATUS.SKIPPED && onSkip) {
        onSkip();
      }
    }

    // Update total steps and version
    progress.totalSteps = steps.length;
    progress.tourVersion = tourVersion;

    // Save updated progress
    saveTourProgress(progress);
  };

  if (!currentRun) return null;

  return (
    <StyledJoyride
      steps={steps}
      run={currentRun}
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

  .react-joyride__button--skip {
    &:hover {
      color: #4b5563;
    }
  }
`;

export default FeatureTour;
