import React from 'react';
import styled from 'styled-components';

interface PositionProps {
  position: number;
}

const PositionWrapper = styled.div<{ $position: number }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 8px;
  font-weight: 500;
  background: ${({ $position }) => {
    switch ($position) {
      case 1:
        return '#FEF9C3';
      case 2:
        return '#DBEAFE';
      case 3:
        return '#FED7AA';
      default:
        return '#F1F5F9';
    }
  }};
  color: ${({ $position }) => {
    switch ($position) {
      case 1:
        return '#CA8A04';
      case 2:
        return '#2563EB';
      case 3:
        return '#9A3412';
      default:
        return '#64748B';
    }
  }};
`;

const getOrdinalSuffix = (position: number): string => {
  const j = position % 10;
  const k = position % 100;

  if (j === 1 && k !== 11) {
    return 'st';
  }
  if (j === 2 && k !== 12) {
    return 'nd';
  }
  if (j === 3 && k !== 13) {
    return 'rd';
  }
  return 'th';
};

const Position: React.FC<PositionProps> = ({ position }) => {
  return (
    <PositionWrapper $position={position}>
      {position}
      {getOrdinalSuffix(position)}
    </PositionWrapper>
  );
};

export default Position;
