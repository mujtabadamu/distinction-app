import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { FaFire } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useEnhancedGetCurrentUserStreakStatusQuery } from 'store/enhancedApi';

interface IProps {
  bgColor?: string;
  color?: string;
}
function StreakComponent({ bgColor, color }: IProps) {
  // const { streakStats, isLoadingStreakStats } = useStreak();
  const {
    data: streakStats,
    isLoading: isLoadingStreakStats,
    error: streakError,
    // refetch: getStreakStats,
  } = useEnhancedGetCurrentUserStreakStatusQuery();

  const navigate = useNavigate();

  if (streakError) {
    console.error('Streak API Error:', streakError);
    // You might want to show an error message or handle the error differently
  }

  return (
    <>
      {isLoadingStreakStats ? (
        <Skeleton height={30} width={100} />
      ) : streakError ? (
        <div style={{ color: 'red', fontSize: '12px' }}>
          Error loading streak data
        </div>
      ) : (
        <button onClick={() => navigate('/points')}>
          <StreakBadge bgColor={bgColor} color={color}>
            <FireIconContainer>
              <AnimatedFireIcon />
              <FireParticle delay="0s" />
              <FireParticle delay="0.4s" />
              <FireParticle delay="0.8s" />
              <FireParticle delay="1.2s" />
              <FireParticle delay="1.6s" />
              <FireParticle delay="2.0s" />
            </FireIconContainer>
            <span>
              <b>{streakStats?.currentStreak ?? 0}</b>/7 Days Streak
            </span>
          </StreakBadge>
        </button>
      )}
    </>
  );
}

export default StreakComponent;

// Keyframe animations
const fireFlicker = keyframes`
  0%, 100% {
    transform: scale(1) rotate(-1deg);
    color: #ff8c1a;
  }
  25% {
    transform: scale(1.1) rotate(1deg);
    color: #ff6b00;
  }
  50% {
    transform: scale(1.05) rotate(-0.5deg);
    color: #ff4500;
  }
  75% {
    transform: scale(1.08) rotate(0.5deg);
    color: #ff7700;
  }
`;

const fireParticleFloat = keyframes`
  0% {
    transform: translateY(0px) scale(0.8);
    opacity: 0.8;
  }
  50% {
    transform: translateY(-10px) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateY(-20px) scale(0.6);
    opacity: 0;
  }
`;

const StreakBadge = styled.span<{
  bgColor?: string;
  color?: string;
}>`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #1d4ed81c;
  background: ${(props) => props.bgColor || '#1d4ed81c'};
  color: ${(props) => props.color || '#2e4898'};
  padding: 8px 16px;
  border-radius: 50px;
  width: fit-content;
`;

const FireIconContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
`;

const AnimatedFireIcon = styled(FaFire)`
  color: #ff8c1a;
  font-size: 16px;
  animation: ${fireFlicker} 2s ease-in-out infinite;
  z-index: 2;
`;

const FireParticle = styled.div<{ delay: string }>`
  position: absolute;
  width: 2px;
  height: 2px;
  background: radial-gradient(circle, #ff8c1a 0%, #ff4500 100%);
  border-radius: 50%;
  animation: ${fireParticleFloat} 2s ease-out infinite;
  animation-delay: ${(props) => props.delay};
  top: 50%;
  left: 50%;
  transform-origin: center;

  &:nth-child(2) {
    left: 35%;
    top: 45%;
    animation-duration: 1.6s;
    width: 1.5px;
    height: 1.5px;
  }

  &:nth-child(3) {
    left: 65%;
    top: 55%;
    animation-duration: 2.2s;
    width: 2.5px;
    height: 2.5px;
  }

  &:nth-child(4) {
    left: 55%;
    top: 40%;
    animation-duration: 2.1s;
    width: 2px;
    height: 2px;
  }

  &:nth-child(5) {
    left: 45%;
    top: 60%;
    animation-duration: 1.8s;
    width: 2.2px;
    height: 2.2px;
  }

  &:nth-child(6) {
    left: 58%;
    top: 48%;
    animation-duration: 1.9s;
    width: 1.8px;
    height: 1.8px;
  }

  &:nth-child(7) {
    left: 42%;
    top: 52%;
    animation-duration: 2s;
    width: 2px;
    height: 2px;
  }
`;
