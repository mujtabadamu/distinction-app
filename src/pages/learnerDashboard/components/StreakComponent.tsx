import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { FaFire } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useStreak from 'pages/points/hooks/useStreak';

interface IProps {
  bgColor?: string;
  color?: string;
}
function StreakComponent({ bgColor, color }: IProps) {
  const { streakStats, isLoadingStreakStats } = useStreak();
  const navigate = useNavigate();

  return (
    <>
      {isLoadingStreakStats ? (
        <Skeleton height={30} width={100} />
      ) : (
        <button onClick={() => navigate('/points')}>
          <StreakBadge bgColor={bgColor} color={color}>
            <FaFire color="#ff8c1a" />
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
