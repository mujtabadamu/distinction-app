import { Grid, Box, Spacer, PageTitle } from '@flexisaf/flexibull2';
import ProgressCard from './components/ProgressCard';
import BreadCrumbs from 'components/breadcrumb';
import RankingBadges from './components/RankingBadges';
import EarnPoints from './components/EarnPoints';
import usePointAccumulation from 'pages/points/hooks/usePointAccumulation';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from 'redux/auth/selectors';
import StarterBadge from 'assets/images/starter_badge.svg';
import NavigatorBadge from 'assets/images/navigator_badge.svg';
import PathfinderBadge from 'assets/images/pathfinder_badge.svg';
import MasterBadge from 'assets/images/master_badge.svg';
import LegendBadge from 'assets/images/legend_badge.svg';
import ParagonBadge from 'assets/images/paragon_badge.svg';
import { BadgeDto } from 'generated/index';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import StreakTracker from './components/StreakTracker';

const Index = () => {
  const user = useSelector(selectCurrentUser);
  const userId = user?.id as string;
  const navigate = useNavigate();
  const {
    getBadges,
    getTotalPoints,
    badges,
    isLoadingBadges,
    totalPoints,
    isLoadingPoints,
  } = usePointAccumulation();

  const { activeBadge, nextBadgeMaxPoints } = useMemo(() => {
    if (!badges?.badges || !totalPoints) {
      return { activeBadge: null, nextBadgeMaxPoints: 0 };
    }

    const currentPoints = totalPoints.totalPoints || 0;
    const sortedBadges = [...badges.badges].sort(
      (a, b) => (a.minPoints || 0) - (b.minPoints || 0)
    );

    // current active badge
    const active =
      sortedBadges.find((badge) => {
        // If points are less than the first badge's minimum return the first badge
        if (
          sortedBadges[0]?.minPoints &&
          currentPoints < sortedBadges[0].minPoints
        ) {
          return sortedBadges[0];
        }

        return (
          currentPoints >= (badge.minPoints || 0) &&
          (badge.maxPoints === null ||
            currentPoints <= (badge.maxPoints || Infinity))
        );
      }) || sortedBadges[0];

    // Find next badge level
    const currentIndex = active ? sortedBadges.indexOf(active) : -1;
    const nextBadge =
      currentIndex < sortedBadges.length - 1
        ? sortedBadges[currentIndex + 1]
        : null;
    const maxPoints = nextBadge ? nextBadge.minPoints : active?.maxPoints || 0;

    return { activeBadge: active, nextBadgeMaxPoints: maxPoints };
  }, [badges, totalPoints]);

  const getBadgeImage = (badge: BadgeDto | null) => {
    if (!badge) return null;

    switch (badge.name?.toLowerCase()) {
      case 'starter':
        return StarterBadge;
      case 'navigator':
        return NavigatorBadge;
      case 'pathfinder':
        return PathfinderBadge;
      case 'master':
        return MasterBadge;
      case 'legend':
        return LegendBadge;
      case 'paragon':
        return ParagonBadge;
      default:
        return StarterBadge;
    }
  };

  const progressData = useMemo(() => {
    const currentPoints = totalPoints?.totalPoints || 0;
    const badgeImage = getBadgeImage(activeBadge || null);

    return {
      currentPoints,
      maxPoints: nextBadgeMaxPoints || 0,
      badge: badgeImage ? (
        <img src={badgeImage} alt={activeBadge?.name || 'Badge'} />
      ) : null,
      onButtonClick: () => navigate('/points/rank'),
      buttonText: 'View Leaderboard',
    };
  }, [activeBadge, totalPoints, nextBadgeMaxPoints]);

  useEffect(() => {
    getBadges();
    getTotalPoints(userId);
  }, []);

  return (
    <Box pad="1.5rem">
      <PageTitle>Points</PageTitle>
      <BreadCrumbs
        links={[{ path: `/dashboard`, text: 'Dashboard' }]}
        last={'Points'}
      />
      {isLoadingBadges || isLoadingPoints ? (
        <Skeleton height={300} />
      ) : (
        <>
          <CustomGrid
            default="minmax(300px, auto) minmax(200px, 300px)"
            md="1fr"
          >
            <StreakTracker />
            <ProgressCard {...progressData} />
          </CustomGrid>
          <Spacer space={32} />
          <DesktopContent>
            <RankingBadges
              badges={badges}
              totalPoints={totalPoints?.totalPoints ?? 0}
            />
          </DesktopContent>
        </>
      )}

      <Spacer space={32} />
      <EarnPoints />
    </Box>
  );
};

export default Index;

export const CustomGrid = styled(Grid)`
  @media (min-width: 800px) and (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const DesktopContent = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;
