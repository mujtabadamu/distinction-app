import React, { useState, useEffect } from 'react';
import { Spacer, Box, Grid, Text, Button } from '@flexisaf/flexibull2';
import bannerImage from 'assets/images/flashcard-banner.svg';
import { useTimer } from 'react-timer-hook';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useProfile from 'pages/profile/hooks/useProfile';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from 'redux/auth/selectors';
import useQuizathon from '../hooks/useQuizathon';
import { DistinctionFeatureProperty } from 'utils/constants';
import useSubscriptionBilling from 'pages/profile/hooks/useSubscriptionBilling';
import PlanLimitBlock from 'pages/profile/subscription/PlanLimitBlock';
import SubscriptionPlansModal from 'pages/profile/subscription/SubscriptionPlansModal';
import useDisclosure from 'hooks/general/useDisclosure';
import { Quizathon } from 'generated/index';

interface CountDownI {
  eventStartTime: Date;
  eventEndTime: Date;
  isRegistered?: boolean;
  title: string | undefined;
  showButton?: boolean;
  showDescription?: boolean;
  singleQuizathon: Quizathon | null;
  refetch: () => void;
}

// interface PopUpProps {
//   showPopUp: boolean;
//   closePopUp: () => void;
// }

const TIME_UNITS = [
  { label: 'Days', key: 'days' },
  { label: 'Hours', key: 'hours' },
  { label: 'Minutes', key: 'minutes' },
  { label: 'Seconds', key: 'seconds' },
] as const;

const padNumber = (num: number) => String(num).padStart(2, '0');

const TimeBox: React.FC<{ value: number; label: string }> = ({
  value,
  label,
}) => (
  <TimeUnit>
    {padNumber(value)}
    <Label>{label}</Label>
  </TimeUnit>
);

const CountDown = ({
  eventStartTime,
  eventEndTime,
  isRegistered,
  title,
  singleQuizathon,
  showButton = true,
  showDescription = true,
  refetch,
}: CountDownI) => {
  const [flipView, setFlipView] = useState(true);
  const { isSubmittingInfo, submitStudentInfo } = useQuizathon();
  const navigate = useNavigate();
  const currentTimeStamp = new Date();
  const hasStarted = eventStartTime.getTime() <= currentTimeStamp.getTime();
  const hasEnded = eventEndTime.getTime() <= currentTimeStamp.getTime();

  const planLimitHandler = useDisclosure();
  const subscriptionPlanHandler = useDisclosure();
  const { getProfileData, profileData } = useProfile();
  const { seconds, minutes, hours, days, restart } = useTimer({
    autoStart: true,
    expiryTimestamp: eventStartTime,
    onExpire: () => {
      setFlipView(false);
    },
  });

  const { getFeatureLimit } = useSubscriptionBilling();

  const timerValues = { days, hours, minutes, seconds };

  const user = useSelector(selectCurrentUser);
  const studentId = user?.id as string;

  const handleSubmit = () => {
    const payload = {
      schoolId: profileData?.schoolInformationView?.school?.id || '',
      department: profileData?.schoolInformationView?.department?.name || '',
      quizathonId: singleQuizathon?.id ?? '',
    };

    submitStudentInfo(payload, () => {
      refetch();
    });
  };

  const CheckPlanLimit = async () => {
    if (singleQuizathon?.isOpenForAllUsers) {
      handleSubmit();
      return;
    }

    const payload = {
      property: DistinctionFeatureProperty.MONTHLY_QUIZATON,
    };
    const result = await getFeatureLimit(payload);

    if (result.success && Number(result.balance) === 0) {
      planLimitHandler.onOpen();
    } else {
      handleSubmit();
    }
  };

  useEffect(() => {
    getProfileData(studentId);
  }, []);

  useEffect(() => {
    if (!flipView) {
      restart(eventEndTime);
    }
  }, [flipView]);

  return (
    <BannerWrapper>
      <Spacer space={80} />
      <CountdownBox>
        {TIME_UNITS.map((unit, index) => (
          <React.Fragment key={unit.key}>
            <TimeBox value={timerValues[unit.key]} label={unit.label} />
            {index < TIME_UNITS.length - 1 && <Separator />}
          </React.Fragment>
        ))}
      </CountdownBox>
      <Spacer space={14} />
      <Box align="center" style={{ color: '#fff' }}>
        <Text size="1.5rem" bold>
          {title}
        </Text>
        <Box>
          {showDescription && (
            <CountDownPrimaryText>{`Quiz ${
              !flipView ? 'ends ' : 'begins '
            } after countdown`}</CountDownPrimaryText>
          )}
        </Box>
        <Spacer space={8} />
        <Grid
          default="auto auto"
          sm="auto auto"
          gap="1rem"
          style={{ justifyContent: 'center' }}
        >
          <StartQuizButton
            disabled={isRegistered || hasEnded}
            onClick={CheckPlanLimit}
            progress={isSubmittingInfo}
          >
            Register for Quizathon
          </StartQuizButton>
          {showButton && (
            <StartQuizButton
              disabled={!isRegistered || !hasStarted || hasEnded}
              onClick={() => navigate('/new-practice')}
            >
              Start Quiz
            </StartQuizButton>
          )}
        </Grid>
      </Box>

      <PlanLimitBlock
        isOpen={planLimitHandler.isOpen}
        closeModal={planLimitHandler.onClose}
        feature={DistinctionFeatureProperty.MONTHLY_QUIZATON}
        togglePlansModal={() => {
          planLimitHandler.onClose();
          subscriptionPlanHandler.onOpen();
        }}
      />
      <SubscriptionPlansModal
        onClose={subscriptionPlanHandler.onClose}
        openModal={subscriptionPlanHandler.isOpen}
      />
    </BannerWrapper>
  );
};

export default CountDown;

export const BannerWrapper = styled.div`
  padding: 1rem;
  background-image: url(${bannerImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 16px;
`;

const CountdownBox = styled.div`
  background: #fff;
  border-radius: 20px;
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 700px;
  margin: 0 auto;
`;

const TimeUnit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 70px;
  font-weight: bold;

  @media (min-width: 768px) {
    min-width: 100px;
    font-size: 2.5rem;
  }
`;

const Label = styled.div`
  font-size: 14px;
  margin-top: 0.5rem;
  font-weight: normal;
`;

const Separator = styled.div`
  &::before {
    content: '';
    display: block;
    width: 2px;
    height: 50px;
    background: #929292;
    border-radius: 2px;
    margin: 0;
  }

  @media (min-width: 768px) {
    &::before {
      height: 80px;
      margin: 0 1rem;
    }
  }
`;

const CountDownPrimaryText = styled.span`
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
`;

const StartQuizButton = styled(Button)<{
  disabled: boolean;
  progress?: boolean;
}>`
  padding: 0.6rem 0.8rem;
  border-radius: 4px;
  font-size: 14px;
  background: ${(props) => (props.disabled ? '#9ca3af' : '#1d4ed8')};
  color: ${(props) => (props.disabled ? '#6b7280' : '#fff')};
  border: none;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  &:hover {
    background-color: ${(props) =>
      props.disabled ? '#9ca3af' : '#1e40af'} !important;
  }
`;
