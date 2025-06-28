import { ReactNode } from 'react';
import styled from 'styled-components';

interface BadgeCardProps {
  icon: ReactNode;
  pointsRange: string;
  isActive?: boolean;
}

const BadgeCard = ({ icon, pointsRange, isActive = false }: BadgeCardProps) => {
  return (
    <CardContainer isActive={isActive}>
      <CardContent>
        <IconContainer>
          <Badge>{icon}</Badge>
        </IconContainer>
        <PointsText>{pointsRange}</PointsText>
      </CardContent>
    </CardContainer>
  );
};

export default BadgeCard;

const CardContainer = styled.div<{ isActive: boolean }>`
  position: relative;
  border-radius: 0.5rem;
  padding: 1rem 0;
  border: ${(props) =>
    props.isActive ? '1px solid #d4af25' : '1px solid #2a366c'};
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  /* width: 180px; */
  img {
    width: 100%;
    height: 135px;
    object-fit: contain;
  }
`;

const Badge = styled.div`
  width: max-content;
`;

const PointsText = styled.div`
  font-size: 0.875rem;
  color: #fff;
  margin-top: -1.5rem;
`;
