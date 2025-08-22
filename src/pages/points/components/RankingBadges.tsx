import React from 'react';
import { Grid } from '@flexisaf/flexibull2';
import { BadgeDto, BadgesDto } from 'generated/index';
import styled, { keyframes } from 'styled-components';
import BadgeCard from './BadgeCard';
import StarterBadge from 'assets/images/starter_badge.svg';
import NavigatorBadge from 'assets/images/navigator_badge.svg';
import PathfinderBadge from 'assets/images/pathfinder_badge.svg';
import MasterBadge from 'assets/images/master_badge.svg';
import LegendBadge from 'assets/images/legend_badge.svg';
import ParagonBadge from 'assets/images/paragon_badge.svg';
import { thousandFormatter } from 'utils/helpers';

const mapBadgeToIcon = (badges: BadgesDto | null, totalPoints: number) => {
  if (!badges || !badges.badges) return [];

  const currentPoints = totalPoints || 0;

  return badges.badges?.map((badge: BadgeDto) => {
    let iconSrc;
    switch (badge.name?.toLowerCase()) {
      case 'starter':
        iconSrc = StarterBadge;
        break;
      case 'navigator':
        iconSrc = NavigatorBadge;
        break;
      case 'pathfinder':
        iconSrc = PathfinderBadge;
        break;
      case 'master':
        iconSrc = MasterBadge;
        break;
      case 'legend':
        iconSrc = LegendBadge;
        break;
      case 'paragon':
        iconSrc = ParagonBadge;
        break;
      default:
        iconSrc = StarterBadge;
    }

    // Check if this is the active badge based on point range
    const isActive =
      currentPoints >= (badge?.minPoints ?? 0) &&
      (badge.maxPoints === null ||
        currentPoints <= (badge?.maxPoints ?? Infinity));

    return {
      ...badge,
      iconSrc,
      isActive,
    };
  });
};

interface RankingBadgeProps {
  badges: BadgesDto | null;
  totalPoints: number;
}
const RankingBadges: React.FC<RankingBadgeProps> = ({
  badges,
  totalPoints,
}) => {
  const updatedBadges = mapBadgeToIcon(badges, totalPoints);
  return (
    <PointBannerContainer>
      <Title>Ranking</Title>

      <Description>
        Badges are earned by accumulating points. As your point total increases,
        you'll unlock higher-level badges.
      </Description>

      <Grid default="repeat(auto-fit, minmax(150px, 1fr))" md="repeat(2, 1fr)">
        {updatedBadges?.map((badge) => (
          <BadgeCard
            isActive={badge.isActive}
            icon={<img src={badge.iconSrc} />}
            pointsRange={`${thousandFormatter(badge.minPoints ?? 0)} - ${
              thousandFormatter(badge.maxPoints ?? 0) ?? Infinity
            } Points`}
          />
        ))}
      </Grid>
    </PointBannerContainer>
  );
};

export default RankingBadges;

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

export const PointBannerContainer = styled.div<{ background?: string }>`
  background: ${(props) => (props.background ? props.background : '#101a33')};
  border-radius: 8px;
  padding: 1rem;
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: 768px) {
    padding: 0.8rem;
  }
`;

const Title = styled.h2`
  display: inline-block;
  font-size: 1rem;
  font-weight: bold;
  color: #fecb66;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: #3a3b3b;
  border-radius: 4px;
  line-height: 12px;
`;

const Description = styled.p`
  color: #fff;
  margin-bottom: 1.2rem;
  font-size: 14px;
`;
