import { useEffect, useState } from 'react';
import {
  SideModalWrapper,
  DarkBG,
  PracticeTypeWrapper,
  PracticeQuestionWrapper,
} from '../../../styles/dashboard/dashboard.styles';
import {
  Box,
  Spacer,
  Text,
  Input,
  RadioButton,
  Button,
} from '@flexisaf/flexibull2';
import { Typography, Switch } from 'antd';
import useGetSingleTotalQuestion from 'hooks/statistics/useGetSingleTotalQuestion';
import InfoBanner from 'components/infoBanner/InfoBanner';
import { PrimaryButton, SecondaryButton } from 'styles/common/buttons.styles';
import useSubscriptionBilling from 'pages/profile/hooks/useSubscriptionBilling';
import ReCAPTCHA from 'react-google-recaptcha';
import { recaptchaConfig } from 'utils/constants';
import { formatMinutesToDisplayTime } from 'utils/helpers';
import FeatureTour from 'components/onboarding/FeatureTour';
import { Step } from 'react-joyride';

interface customTime {
  minutes: string;
}

interface Props {
  howToPractice: boolean;
  isCreatingStudentPaper: boolean;
  setHowToPractice: (x: boolean) => void;
  selectedExamGroupId: string;
  useDefault: DefaultNumberOfQuestions | null;
  setUseDefault: (x: DefaultNumberOfQuestions) => void;
  numberOfQuestions: number;
  setNumberOfQuestions: (x: number | ((prev: number) => number)) => void;
  defaultQuestionNumber: number;
  isQuizathonInProgress: boolean;
  openTime: boolean;
  setOpenTime: (x: boolean) => void;
  handleStartPractice: () => void;
  customTime: customTime;
  setCustomTime: (x: customTime) => void;
  practiceLimit: number;
  openSubscriptionPlans: () => void;
  onCaptchaChange: (token: string | null) => void;
}

const HowtoPractice = ({
  useDefault,
  setUseDefault,
  numberOfQuestions,
  setNumberOfQuestions,
  selectedExamGroupId,
  defaultQuestionNumber,
  isQuizathonInProgress,
  openTime,
  setOpenTime,
  customTime,
  setCustomTime,
  practiceLimit,
  howToPractice,
  setHowToPractice,
  isCreatingStudentPaper,
  handleStartPractice,
  onCaptchaChange,
  openSubscriptionPlans,
}: Props) => {
  const { totalSingleQuestion } = useGetSingleTotalQuestion({
    paperId: selectedExamGroupId,
  });
  const { activePlan, getActivePlan } = useSubscriptionBilling();
  const planType = activePlan?.subscriptionPackage?.code;
  const questionLimit = planType === 'BASIC_PLAN' ? 50 : 200;
  const totalQuestions = totalSingleQuestion?.totalQuestions ?? 0;

  const [displayTime, setDisplayTime] = useState<string>(
    formatMinutesToDisplayTime(customTime.minutes)
  );
  const [showTour, setShowTour] = useState(false);

  // HowToPractice tour steps
  const howToPracticeTourSteps: Step[] = [
    {
      target: 'body',
      content:
        "Great! Now let's configure your practice session. Choose your practice type and number of questions.",
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '[data-tour="practice-type"]',
      content:
        'Choose between timed practice (with a countdown timer) or untimed practice (take your time to learn).',
      placement: 'bottom',
    },
    {
      target: '[data-tour="timer-input"]',
      content:
        'Set your custom timer in MM:SS format. This will be your time limit for the practice session.',
      placement: 'bottom',
    },
    {
      target: '[data-tour="question-count"]',
      content:
        'Choose how many questions you want to practice. Use default or set a custom number.',
      placement: 'bottom',
    },
    {
      target: '[data-tour="custom-questions"]',
      content:
        'Set a custom number of questions. Use the +/- buttons to adjust or type directly.',
      placement: 'bottom',
    },
    {
      target: '[data-tour="start-practice"]',
      content:
        'Ready to start! Click "Start Practice" to begin your session with the selected settings.',
      placement: 'top',
    },
  ];

  const parseDisplayTimeToMinutes = (displayTime: string): string => {
    const [minutes, seconds] = displayTime.split(':').map(Number);
    if (isNaN(minutes) || isNaN(seconds) || seconds > 59)
      return customTime.minutes;
    return (minutes + seconds / 60).toFixed(2);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (!value) {
      setCustomTime({ minutes: '0' });
      setDisplayTime('0:00');
      return;
    }
    const [minutes, seconds] = value.split(':').map(Number);
    if (isNaN(minutes) || isNaN(seconds) || seconds > 59) {
      return;
    }
    const minutesDecimal = parseDisplayTimeToMinutes(value);
    if (isQuizathonInProgress && parseFloat(minutesDecimal) < 20) return;
    setCustomTime({ minutes: minutesDecimal });
    setDisplayTime(value);
  };

  const handleNumberOfQuestions = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    const maxAllowedQuestions =
      practiceLimit >= 300
        ? totalQuestions
        : Math.min(practiceLimit, totalQuestions);
    const newValue = Math.min(parseInt(value), maxAllowedQuestions);
    if (newValue <= 0) return;
    setNumberOfQuestions(newValue);
  };

  const handleOpenTime = () => {
    setOpenTime(!openTime);
  };

  const increaseQuestions = () => {
    if (useDefault === 'default') return;
    const maxAllowedQuestions =
      practiceLimit > 300
        ? totalQuestions
        : Math.min(practiceLimit, totalQuestions);
    if (numberOfQuestions >= maxAllowedQuestions) return;
    setNumberOfQuestions((prev: number) => prev + 1);
  };

  const decreaseQuestions = () => {
    if (useDefault === 'default') return;
    if (numberOfQuestions <= 1) return;
    setNumberOfQuestions((prev: number) => prev - 1);
  };

  useEffect(() => {
    if (isQuizathonInProgress) {
      setCustomTime({ minutes: '20' });
      setDisplayTime('20:00');
      setOpenTime(true);
      if (useDefault === 'custom') {
        setNumberOfQuestions(Math.min(defaultQuestionNumber, totalQuestions));
      }
    }
  }, [
    isQuizathonInProgress,
    useDefault,
    setCustomTime,
    setOpenTime,
    setNumberOfQuestions,
    defaultQuestionNumber,
    totalQuestions,
  ]);

  useEffect(() => {
    if (useDefault === 'default') {
      const maxAllowedQuestions =
        practiceLimit > 300
          ? Math.min(defaultQuestionNumber, totalQuestions)
          : Math.min(defaultQuestionNumber, totalQuestions, practiceLimit);
      setNumberOfQuestions(maxAllowedQuestions);
    }
  }, [
    useDefault,
    defaultQuestionNumber,
    totalQuestions,
    practiceLimit,
    setNumberOfQuestions,
  ]);

  useEffect(() => {
    // Sync displayTime when customTime.minutes changes externally
    setDisplayTime(formatMinutesToDisplayTime(customTime.minutes));
  }, [customTime.minutes]);

  useEffect(() => {
    getActivePlan();
  }, []);

  // Check if tour should be shown
  useEffect(() => {
    const hasSeenTour =
      localStorage.getItem('howToPractice_onboarding') === 'true';
    if (!hasSeenTour) {
      setShowTour(true);
    }
  }, []);

  const handleTourComplete = () => {
    setShowTour(false);
  };

  return (
    <DarkBG>
      <FeatureTour
        tourKey="howToPractice"
        tourVersion="1.0"
        steps={howToPracticeTourSteps}
        run={showTour}
        onComplete={handleTourComplete}
      />

      <SideModalWrapper>
        <div className="modal-content">
          <p className="header-text">How do you want to practice?</p>

          {activePlan &&
            activePlan.subscriptionPackage?.code !== 'PREMIUM_PLAN' &&
            !isQuizathonInProgress && (
              <InfoBanner
                infoTitle="Upgrade Plan"
                infoText={
                  <>
                    You can only practice {''}
                    <strong>{questionLimit}</strong>
                    {''} questions per day. Click on the "upgrade plan" button
                    below to practice unlimited questions.
                  </>
                }
                icon="saf-information"
                bgColor="#E7E7FF"
                action={
                  <PrimaryButton pale onClick={openSubscriptionPlans}>
                    Upgrade Plan
                  </PrimaryButton>
                }
              />
            )}
          <Spacer space="5px" />
          <PracticeTypeWrapper isActive={openTime} data-tour="practice-type">
            <Box className="header">
              <Text>Practice Type</Text>
              <span style={{ color: 'red' }}>*</span>
            </Box>

            <Box className="practiceTime">
              <Typography.Text className="openTime">
                Timed Practice
              </Typography.Text>
              <Box className="">
                <Switch
                  value={openTime}
                  disabled={isQuizathonInProgress}
                  onChange={() => handleOpenTime()}
                />
                <Typography.Text
                  style={{ fontWeight: '400', fontSize: '16px', margin: '5px' }}
                >
                  {openTime ? 'Yes' : 'No'}
                </Typography.Text>
              </Box>
            </Box>
            <Box className="">
              {openTime ? (
                <Box className="switch">
                  <label>Set Timer</label>
                  <Input
                    type="text"
                    name="displayTime"
                    value={displayTime}
                    onChange={handleInputChange}
                    disabled={isQuizathonInProgress}
                    placeholder="MM:SS"
                    pattern="\d+:\d{2}"
                    data-tour="timer-input"
                  />
                  <Text size="9px">MIN:SEC</Text>
                </Box>
              ) : (
                ''
              )}
            </Box>
          </PracticeTypeWrapper>

          <Spacer space="30px" />
          <PracticeQuestionWrapper
            width="100%"
            isActive={useDefault === 'default'}
            data-tour="question-count"
          >
            <Box className="header">
              <Text>Number of questions</Text>
              <span style={{ color: 'red' }}>*</span>
            </Box>
            <Box
              className="radioWrapper"
              onClick={() => {
                setUseDefault('default');
                setNumberOfQuestions(
                  Math.min(defaultQuestionNumber, totalQuestions)
                );
              }}
            >
              <Box
                display="flex"
                style={{ flexDirection: 'column', justifyContent: 'end' }}
              >
                <RadioButton
                  label="Use Default"
                  size="16px"
                  name="default"
                  disabled={isQuizathonInProgress}
                  checked={useDefault === 'default'}
                  style={{ fontWeight: '500', fontSize: '18px' }}
                />

                <Box className="!ml-10 label">
                  The default number of questions per practice is{'  '}
                  <Text bold>{defaultQuestionNumber}</Text>
                </Box>
              </Box>
            </Box>
            <Box
              className="questionWrapper"
              onClick={() => setUseDefault('custom')}
            >
              <Box display="flex">
                <RadioButton
                  label={null}
                  disabled={isQuizathonInProgress}
                  size="16px"
                  style={{ fontWeight: '500', fontSize: '18px' }}
                  name="custom"
                  onChange={() => setUseDefault('custom')}
                  checked={useDefault === 'custom'}
                />
                <Input
                  placeholder="Number of questions"
                  type="number"
                  style={{ marginBottom: '0.3rem', minWidth: '120px' }}
                  value={numberOfQuestions}
                  onChange={handleNumberOfQuestions}
                  disabled={isQuizathonInProgress || useDefault === 'default'}
                  min={1}
                  max={
                    practiceLimit > 300
                      ? totalQuestions
                      : Math.min(practiceLimit, totalQuestions)
                  }
                  data-tour="custom-questions"
                />
                <Box
                  display="flex"
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '5px',
                    maxHeight: '42px',
                    width: '100%',
                    maxWidth: 'fit-content',
                    marginTop: 'inherit',
                    marginLeft: '4px',
                  }}
                >
                  <Button plain onClick={increaseQuestions}>
                    +
                  </Button>
                  <Button plain onClick={decreaseQuestions}>
                    -
                  </Button>
                </Box>
              </Box>
              <Box className="default">
                Total Available Question:
                <strong> {totalQuestions} </strong>
              </Box>
            </Box>
          </PracticeQuestionWrapper>

          {isQuizathonInProgress && (
            <>
              <Spacer space="20px" />
              <ReCAPTCHA
                sitekey={recaptchaConfig.RECAPTCHA_SITE_KEY as string}
                onChange={onCaptchaChange}
              />
            </>
          )}
          <Spacer space="20px" />
          {howToPractice && (
            <Box className="practice-button">
              <SecondaryButton
                style={{ textAlign: 'center' }}
                onClick={() => setHowToPractice(false)}
              >
                Back
              </SecondaryButton>
              <PrimaryButton
                progress={isCreatingStudentPaper}
                onClick={handleStartPractice}
                disabled={practiceLimit === 0}
                data-tour="start-practice"
              >
                Start Practice
              </PrimaryButton>
            </Box>
          )}
        </div>
      </SideModalWrapper>
    </DarkBG>
  );
};

export default HowtoPractice;
