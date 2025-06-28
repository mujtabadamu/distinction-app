import { Box, Text, Spacer, Button } from '@flexisaf/flexibull2';
import useProfile from './hooks/useProfile';
import { useEffect, useState } from 'react';
import Card from './components/card';
import {
  Container,
  BadgeContainer,
  BadgeIcon,
  ExtendedButton,
  Section,
  Title,
  Footer,
  StatsGrid,
} from './style';
import ProfileHeaderSection from './components/profileHeaderSection';
import useSubscriptionBilling from './hooks/useSubscriptionBilling';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { formatTime, thousandFormatter } from 'utils/helpers';
import SectionLoader from 'components/custom/sectionLoader';
import VectorImg from '../../assets/images/Vector.svg';
import GroupImg from '../../assets/images/Group.svg';
import RankingImg from '../../assets/images/ranking_image.svg';
import AlarmImg from '../../assets/images/noto_alarm-clock.svg';
import BookImg from '../../assets/images/fluent-emoji_books.svg';
import PointImg from '../../assets/images/coins_image.svg';
import StarterBadge from '../../assets/images/starter_badge.svg';
import NavigatorBadge from '../../assets/images/navigator_badge.svg';
import PathfinderBadge from '../../assets/images/pathfinder_badge.svg';
import MasterBadge from '../../assets/images/master_badge.svg';
import LegendBadge from '../../assets/images/legend_badge.svg';
import ParagonBadge from '../../assets/images/paragon_badge.svg';
import { baseUrl } from './hooks/useQRCode';

function PublicProfile() {
  const navigation = useNavigate();
  const { username } = useParams();
  const [searchParams] = useSearchParams();
  const platform = searchParams.get('platform');

  const {
    getPublicProfileData,
    isPublicProfileError,
    isLoadingPublicProfile,
    publicProfile,
    trackPublicProfileView,
  } = useProfile();
  const { getActivePlan, activePlan } = useSubscriptionBilling();

  const [hasTracked, setHasTracked] = useState(false);

  useEffect(() => {
    getPublicProfileData(username ?? '');
    getActivePlan();

    // Track profile view only once per profile-platform combination
    const trackingKey = `profile_view_${username}_${platform}`;
    const localStorageTracked = localStorage.getItem(trackingKey);

    if (!hasTracked && !localStorageTracked && username && platform) {
      trackPublicProfileView({
        sharedPlatform: platform,
        username: username,
      });
      localStorage.setItem(trackingKey, 'true');
      setHasTracked(true);
    }
  }, [hasTracked, username, platform]);

  if (isLoadingPublicProfile) {
    return <SectionLoader />;
  }

  if (isPublicProfileError) {
    return (
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh',
          background: '#fff',
          borderRadius: '12px',
          margin: '20px',
          padding: '20px',
        }}
      >
        <Text bold size="18px" color="#4a5568" style={{ marginBottom: '10px' }}>
          Oops, something went wrong!
        </Text>
        <Text
          size="14px"
          color="#4a5568"
          style={{ textAlign: 'center', maxWidth: '400px' }}
        >
          We couldn't find the user profile or there was an issue loading it.
          Please check the username or try again later.
        </Text>
        <Spacer space="20" />
        <Button onClick={() => navigation('/')}>Back to Home</Button>
      </Box>
    );
  }

  // Determine the badge icon based on currentBadge.name
  let badgeIconSrc;
  switch (publicProfile?.currentBadge?.name?.toLowerCase()) {
    case 'starter':
      badgeIconSrc = StarterBadge;
      break;
    case 'navigator':
      badgeIconSrc = NavigatorBadge;
      break;
    case 'pathfinder':
      badgeIconSrc = PathfinderBadge;
      break;
    case 'master':
      badgeIconSrc = MasterBadge;
      break;
    case 'legend':
      badgeIconSrc = LegendBadge;
      break;
    case 'paragon':
      badgeIconSrc = ParagonBadge;
      break;
    default:
      badgeIconSrc = StarterBadge;
  }

  return (
    <div className="bg-white">
      <Box
        display="flex"
        style={{
          justifyContent: 'space-between',
          padding: '10px 30px',
          borderBottom: '1px solid #EDEDED',
        }}
      >
        <img width={150} src="../DistinctionlogoLatest.svg" alt="Logo" />
        <Button onClick={() => navigation('/')}>Join Distinction</Button>
      </Box>
      <Spacer space="20" />

      <Container style={{ background: 'transparent' }}>
        <ProfileHeaderSection
          activePlan={activePlan}
          profileData={publicProfile}
          showEditButton={false}
          showVerifyBadge
          username={username}
          isLoading={isLoadingPublicProfile}
        />

        <Box
          style={{
            border: '1px solid #E4E4E7',
            borderRadius: '5px 5px 12px 12px',
          }}
        >
          <Box style={{ display: 'flex', padding: '20px 20px' }}>
            <Text bold block size={'14px'}>
              Learning Activity
            </Text>
            <Spacer space="10" />
          </Box>
          <Box
            style={{
              padding: '10px',
              background: '#FFFBFB',
              borderTop: '1px solid #E4E4E7',
            }}
          >
            <Box background="#fff">
              <BadgeContainer>
                <Text
                  style={{
                    fontWeight: '500',
                    marginBottom: '12px',
                  }}
                  size={'13px'}
                  color="#4a5568"
                  block
                >
                  Current Badge
                </Text>
                <BadgeIcon>
                  <img
                    src={badgeIconSrc}
                    style={{
                      height: '100px',
                      width: '89px',
                    }}
                    alt={publicProfile?.currentBadge?.name ?? ''}
                  />
                </BadgeIcon>
              </BadgeContainer>
            </Box>
            <StatsGrid>
              <Card
                className="time"
                iconUrl={AlarmImg}
                title="Time Spent"
                value={`${
                  publicProfile?.timeSpent &&
                  formatTime(publicProfile?.timeSpent)
                } `}
              />
              <Card
                className="accuracy"
                iconUrl={GroupImg}
                title="Accuracy"
                value={`${publicProfile?.accuracy?.toFixed(2)}%`}
              />
              <Card
                className="streak"
                iconUrl={VectorImg}
                title="Current Streak"
                value={`Day ${publicProfile?.currentStreak}`}
              />
              <Card
                className="points"
                iconUrl={PointImg}
                title="Points Earned"
                value={publicProfile?.totalPoints ?? ''}
              />
              <Card
                className="ranking"
                iconUrl={RankingImg}
                title="Global Ranking"
                value={publicProfile?.globalRank ?? ''}
              />
              <Card
                className="questions"
                iconUrl={BookImg}
                title="Practiced Questions"
                value={
                  thousandFormatter(
                    publicProfile?.totalPracticedQuestion ?? 0
                  ) ?? ''
                }
              />
            </StatsGrid>
          </Box>
          <Section>
            <Title>
              Learn, Compete and Earn with <Text bold>Distinction 👍</Text>{' '}
            </Title>
            <ExtendedButton
              onClick={() => {
                navigation(baseUrl);
              }}
            >
              Join 120k + students learning on distinction
            </ExtendedButton>
          </Section>
        </Box>
        <Footer>@2025 FlexiSAF. All rights reserved.</Footer>
      </Container>
    </div>
  );
}

export default PublicProfile;
