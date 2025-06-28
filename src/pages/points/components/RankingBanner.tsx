import { Box, Text } from '@flexisaf/flexibull2';
import { PointBannerContainer } from '../components/RankingBadges';
import styled from 'styled-components';
import { UserRankDto } from 'generated/index';
import { thousandFormatter } from 'utils/helpers';
import UserIcon from 'assets/images/ranking_empty_icon.svg';
import { CustomGrid } from '..';

interface RankingBannerProps {
  bannerHeadingText?: string;
  title: string;
  subtitle: string;
  students: UserRankDto[];
  background?: string;
}

const getRankSuffix = (rank: number): string => {
  if (rank % 10 === 1 && rank !== 11) return 'st';
  if (rank % 10 === 2 && rank !== 12) return 'nd';
  if (rank % 10 === 3 && rank !== 13) return 'rd';
  return 'th';
};

const RankingBanner: React.FC<RankingBannerProps> = ({
  bannerHeadingText = 'Your school ranking',
  title,
  subtitle,
  students,
  background = 'linear-gradient(249.7deg, #304E99 7.9%, #101A33 52.36%)',
}) => {
  return (
    <PointBannerContainer background={background}>
      <CustomGrid
        default="minmax(min-content, auto) minmax(200px, auto)"
        md="1fr"
      >
        <Box
          display="flex"
          style={{ flexDirection: 'column', justifyContent: 'space-around' }}
        >
          <Text uppercase color="#fff" size="14px">
            {bannerHeadingText}
          </Text>
          <Box pad="1rem 0 0">
            <Title>{title}</Title>
            {students.length && <Subtitle>{subtitle}</Subtitle>}
          </Box>
        </Box>
        <Box>
          <CustomGrid default="repeat(3, 1fr)">
            {students.map((student, index) => (
              <Card key={index}>
                <Avatar
                  src={student.profileImage ?? UserIcon}
                  alt={student.username}
                />
                <Name>{student.username}</Name>
                <Department>{student.department?.name}</Department>
                <RankCard rank={getRankSuffix(student.rank ?? 1)}>
                  <Box>
                    {student.rank}
                    {getRankSuffix(student.rank ?? 1)}
                  </Box>
                  <Points>{thousandFormatter(student.points ?? 0)} pts</Points>
                </RankCard>
              </Card>
            ))}
          </CustomGrid>
        </Box>
      </CustomGrid>
    </PointBannerContainer>
  );
};

export default RankingBanner;

const Card = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  /* max-width: 250px; */
`;

const Avatar = styled.img`
  width: 54px;
  height: 54px;
  border-radius: 50%;
  margin-bottom: 1rem;
`;

const Name = styled.h2`
  font-size: 14px;
  margin-bottom: 0.5rem;
  color: #fff;
  word-break: break-all;
`;

const Department = styled.p`
  color: #f2f3fb;
  font-size: 10px;
  /* margin-bottom: 1rem; */
`;

const RankCard = styled.div<{ rank: string }>`
  background-color: ${(props) =>
    props.rank === '1st'
      ? '#FEF3B5'
      : props.rank === '2nd'
      ? '#B2E5FF'
      : '#EDDBC7'};
  color: ${(props) =>
    props.rank === '1st'
      ? '#E4A229'
      : props.rank === '2nd'
      ? '#335CFF'
      : '#C68F4F'};
  padding: 0.5rem;
  border-radius: 4px;
  width: 100%;
  max-width: 200px;
  font-weight: bold;
`;

const Points = styled.span`
  font-weight: bold;
  /* margin-top: 0.25rem; */
  color: #000;
`;

const Title = styled.h1`
  color: #ffcb66;
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #ffffff;
  font-size: 14px;
  margin-bottom: 2rem;
`;
