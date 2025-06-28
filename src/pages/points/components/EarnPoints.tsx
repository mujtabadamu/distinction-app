import styled, { keyframes } from 'styled-components';
import { Button, Box } from '@flexisaf/flexibull2';
import useProfile from 'pages/profile/hooks/useProfile';
import { UserProfileDTO } from 'generated/index';

interface PointItem {
  title: string;
  description?: string;
  points: number;
  earned?: boolean;
  onButtonClick?: () => void;
}

const isProfileComplete = (profile: UserProfileDTO | null) => {
  if (!profile) return;
  const requiredFields = [
    profile.firstName,
    profile.lastName,
    profile.stateOfOrigin,
    profile.gender,
    profile.dateOfBirth,
    profile.schoolInformationView?.department?.name,
    profile.schoolInformationView?.level,
    profile.schoolInformationView?.school?.name,
  ];

  return requiredFields.every(
    (field) => field !== null && field !== undefined && field !== ''
  );
};

const EarnPoints = () => {
  const { profileData } = useProfile();

  const pointItems: PointItem[] = [
    {
      title: 'Welcome Bonus',
      points: 10,
      earned: true,
    },
    {
      title: 'KYC Completion',
      points: 3,
      earned: !!profileData?.isNinVerified,
      onButtonClick: () => (window.location.href = '/profile'),
    },
    {
      title: '50 correct answers',
      points: 5,
      earned: false,
      onButtonClick: () => (window.location.href = '/new-practice'),
    },
    {
      title: 'Refer & Earn (Per successful referral)',
      points: 10,
      earned: false,
      onButtonClick: () => (window.location.href = '/referrals'),
    },
    {
      title: 'Profile Update',
      points: 2,
      earned: isProfileComplete(profileData),
      onButtonClick: () => (window.location.href = '/profile'),
    },
  ];

  const sortedPointItems = [...pointItems].sort((a, b) => {
    if (a.earned === b.earned) return 0;
    return a.earned ? 1 : -1;
  });
  return (
    <Container>
      <ContentContainer>
        <Box pad="1rem">
          <Title>Earn More Points</Title>
        </Box>

        <ItemsList>
          {sortedPointItems.map((item, index) => (
            <ItemCard key={index}>
              <ItemInfo>
                <ItemTitle>{item.title}</ItemTitle>
                {item.description && (
                  <ItemDescription>{item.description}</ItemDescription>
                )}
                <ItemPoints>{item.points} Points</ItemPoints>
              </ItemInfo>

              {item.earned ? (
                <Button
                  style={{ padding: '0.5rem 1.1rem' }}
                  disabled={item.earned}
                  pale
                >
                  Earned
                </Button>
              ) : (
                <Button
                  pale
                  style={{ padding: '0.5rem 1.5rem' }}
                  onClick={item?.onButtonClick}
                >
                  Earn
                </Button>
              )}
            </ItemCard>
          ))}
        </ItemsList>
      </ContentContainer>
    </Container>
  );
};

export default EarnPoints;

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

const Container = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  /* box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); */
  /* overflow: hidden; */
  animation: ${fadeIn} 0.5s ease-out;
`;

const ContentContainer = styled.div`
  @media (max-width: 768px) {
    margin-bottom: 5rem;
  }
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: bold;
  margin: 0;
`;

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  & :hover {
    background-color: #f9fafb;
  }
`;

const ItemCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 0.5rem;

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: center;
  }
  border-top: 1px solid #ededed;
`;

const ItemInfo = styled.div`
  @media (max-width: 640px) {
    margin-bottom: 0.5rem;
  }
`;

const ItemTitle = styled.div`
  font-weight: 500;
`;

const ItemDescription = styled.div`
  font-size: 0.875rem;
`;

const ItemPoints = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
  color: #6c7072;
`;
