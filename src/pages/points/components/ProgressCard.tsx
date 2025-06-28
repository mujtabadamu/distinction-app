import styled, { keyframes } from 'styled-components';
import { Button } from '@flexisaf/flexibull2';
import { thousandFormatter } from 'utils/helpers';

interface ProgressCardProps {
  currentPoints: number;
  maxPoints: number;
  badge: React.ReactNode;
  onButtonClick?: () => void;
  buttonText?: string;
}

const ProgressCard: React.FC<ProgressCardProps> = ({
  currentPoints,
  maxPoints,
  badge,
  onButtonClick,
  buttonText = 'Leaderboard',
}) => {
  const progressPercentage = (currentPoints / maxPoints) * 100;

  return (
    <CardContainer>
      <CardContent>
        <BadgeContainer>{badge}</BadgeContainer>
      </CardContent>

      <ProgressContent>
        <ProgressBarContainer>
          <ProgressBar width={`${progressPercentage}%`} />
        </ProgressBarContainer>
        <ProgressLabels>
          <span>{thousandFormatter(currentPoints ?? 0)} points</span>
          <span>{thousandFormatter(maxPoints ?? 0)}</span>
        </ProgressLabels>
      </ProgressContent>

      <Button pale block onClick={onButtonClick}>
        {buttonText}
      </Button>
    </CardContainer>
  );
};

export default ProgressCard;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const CardContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #d1d1d6;
  animation: ${fadeIn} 0.5s ease-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
`;

const BadgeContainer = styled.div`
  height: 100px;
  animation: ${pulseAnimation} 2s ease-in-out infinite;
  scale: 1.3;
  /* width: 180px; */

  img {
    width: 100%;
    height: 135px;
    object-fit: contain;
  }
`;

const ProgressContent = styled.div`
  margin-bottom: 1rem;
`;

const ProgressLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #1a2346;
  margin-top: 0.5rem;
`;

const ProgressBarContainer = styled.div`
  height: 0.5rem;
  background-color: #e5e7eb;
  border-radius: 9999px;
  overflow: hidden;
`;

const ProgressBar = styled.div<{ width: string }>`
  height: 100%;
  background-color: #2563eb;
  border-radius: 20px;
  transition: width 1s ease-out;
  width: ${(props) => props.width};
`;
