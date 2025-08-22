import styled, { keyframes, css } from 'styled-components';
import { FaFire } from 'react-icons/fa';

// Enhanced Keyframe animations
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
    transform: translateY(-15px) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateY(-30px) scale(0.6);
    opacity: 0;
  }
`;

// Enhanced fill animation with elastic effect (slower)
const fillAnimation = keyframes`
  0% {
    width: 0%;
    transform: scaleY(1);
  }
  70% {
    width: 100%;
    transform: scaleY(1.08);
  }
  85% {
    transform: scaleY(0.98);
  }
  100% {
    width: 100%;
    transform: scaleY(1);
  }
`;

// Shimmer effect that travels across the fill (slower)
const shimmerEffect = keyframes`
  0% {
    transform: translateX(-100%) skewX(-15deg);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(200%) skewX(-15deg);
    opacity: 0;
  }
`;

// Pulsing glow effect (slower)
const pulseGlow = keyframes`
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.02);
  }
`;

// Breathing glow effect with red tones (slower)
const breathingGlow = keyframes`
  0%, 100% {
    box-shadow: 
      0 0 5px rgba(255, 85, 23, 0.4),
      0 0 10px rgba(255, 123, 46, 0.3),
      0 0 15px rgba(255, 161, 46, 0.2),
      inset 0 0 10px rgba(255, 255, 255, 0.1);
  }
  50% {
    box-shadow: 
      0 0 10px rgba(255, 85, 23, 0.7),
      0 0 20px rgba(255, 123, 46, 0.5),
      0 0 30px rgba(255, 161, 46, 0.3),
      inset 0 0 15px rgba(255, 255, 255, 0.2);
  }
`;

// Gradient flow animation (slower)
const gradientFlow = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Styled components
export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
`;

export const FireIconContainer = styled.div`
  position: relative;
  margin-right: 0.8rem;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    margin-right: 0.6rem;
  }
`;

export const AnimatedFireIcon = styled(FaFire)`
  color: #ff8c1a;
  font-size: 2.5rem;
  animation: ${fireFlicker} 2s ease-in-out infinite;
  z-index: 2;
`;

export const FireParticle = styled.div<{ delay: string }>`
  position: absolute;
  width: 4px;
  height: 4px;
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
    width: 5px;
    height: 5px;
  }

  &:nth-child(3) {
    left: 65%;
    top: 55%;
    animation-duration: 2.2s;
    width: 8px;
    height: 8px;
  }

  &:nth-child(4) {
    left: 55%;
    top: 40%;
    animation-duration: 2.5s;
    width: 4.5px;
    height: 4.5px;
  }

  &:nth-child(5) {
    left: 42%;
    top: 60%;
    animation-duration: 1.8s;
    width: 4.5px;
    height: 4.5px;
  }

  &:nth-child(6) {
    left: 58%;
    top: 35%;
    animation-duration: 2.1s;
    width: 3px;
    height: 3px;
  }

  &:nth-child(7) {
    left: 48%;
    top: 65%;
    animation-duration: 1.9s;
    width: 5px;
    height: 5px;
  }

  &:nth-child(8) {
    left: 62%;
    top: 48%;
    animation-duration: 2.3s;
    width: 3.5px;
    height: 3.5px;
  }

  &:nth-child(9) {
    left: 38%;
    top: 52%;
    animation-duration: 2s;
    width: 4px;
    height: 4px;
  }
`;

export const Title = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: #ffd36a;
`;

export const SubTitle = styled.div`
  font-size: 14px;
  color: #bfc8e6;
  margin-top: 0.2rem;
  margin-bottom: 0.8rem;
`;

export const DaysRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  width: 100%;
`;

export const Day = styled.div<{ active?: boolean }>`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ active }) => (active ? '#ffd36a' : '#bfc8e6')};
  opacity: ${({ active }) => (active ? 1 : 0.5)};
  text-align: center;
  transition: all 0.3s ease;
`;

export const BarRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export const StreakBar = styled.div`
  position: relative;
  width: 100%;
  height: 11px;
  background: rgba(82, 82, 83, 1);
  border-radius: 50px;
  overflow: hidden;
`;

// Enhanced StreakFill with multiple animation layers (slower, more red)
export const StreakFill = styled.div<{ active: boolean; delay: number }>`
  position: relative;
  height: 100%;
  border-radius: 8px;
  background: linear-gradient(
    135deg,
    #dc2626 0%,
    #ef4444 15%,
    #f97316 30%,
    #ff5517 45%,
    #ff7a00 60%,
    #ffa12e 75%,
    #ffb84d 90%,
    #ffc966 100%
  );
  background-size: 200% 200%;
  overflow: hidden;

  ${({ active, delay }) =>
    active &&
    css`
      animation:
        ${fillAnimation} 1.2s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s both,
        ${gradientFlow} 6s ease-in-out infinite ${delay + 1.2}s,
        ${breathingGlow} 4s ease-in-out infinite ${delay + 1.5}s;
    `}

  transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.4) 50%,
      transparent 100%
    );
    border-radius: inherit;
  }

  &::after {
    content: '';
    position: absolute;
    top: 1px;
    left: 1px;
    right: 1px;
    height: 40%;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 100%
    );
    border-radius: 6px 6px 3px 3px;
  }
`;

// Shimmer overlay effect (slower)
export const StreakShimmer = styled.div<{ active: boolean; delay: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.6) 20%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(255, 255, 255, 0.6) 80%,
    transparent 100%
  );
  border-radius: inherit;
  opacity: 0;

  ${({ active, delay }) =>
    active &&
    css`
      animation: ${shimmerEffect} 4s ease-in-out infinite ${delay + 2}s;
    `}
`;

// Glow effect overlay (slower, more red)
export const StreakGlow = styled.div<{ active: boolean; delay: number }>`
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: radial-gradient(
    ellipse at center,
    rgba(255, 85, 23, 0.5) 0%,
    rgba(255, 123, 46, 0.3) 30%,
    rgba(239, 68, 68, 0.2) 50%,
    transparent 70%
  );
  border-radius: 50px;
  opacity: 0;
  z-index: -1;

  ${({ active, delay }) =>
    active &&
    css`
      animation: ${pulseGlow} 5s ease-in-out infinite ${delay + 1.2}s;
    `}
`;

export const EarnPointsButton = styled.button`
  all: unset;
  background: linear-gradient(
    335.51deg,
    #da9b1f 4.46%,
    #d4b579 30.11%,
    #ffe0a4 64.45%,
    #ffcb66 87.21%
  );
  border: 2px solid rgba(255, 248, 234, 0.83);
  color: #232b4a;
  border-radius: 10px;
  padding: 0.5rem 1rem;

  font-size: 1rem;
  cursor: pointer;
  text-align: center;

  min-width: 200px;
  font-weight: 500;
  box-shadow: 0px 2px 10.1px 0px #ffcb6685;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.02);
  }

  @media (min-width: 768px) {
    min-height: 64px;
  }
`;

export const StreakText = styled.div`
  font-size: 0.85rem; // to px 13.6px

  color: #fff;
  margin-top: 1rem;
  font-style: italic;

  .highlight {
    color: #fec320;
    font-weight: 400;
  }
  @media (min-width: 768px) {
    font-size: 1.1rem;
  }
`;
