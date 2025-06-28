import React from 'react';
import { Box, Spacer, Text, Button } from '@flexisaf/flexibull2';
import styled from 'styled-components';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { SimpleQuizathonView } from 'generated/index';
import BannerDeskto from '../../../assets/images/QuizathonCardBanner.svg';
import { formatPrize } from 'utils/quizathon';

interface QuizathonCardProps {
  event: SimpleQuizathonView;
  isRegistered?: boolean;
  onButtonClick?: () => void;
  onCardClick: () => void;
  badge?: React.ReactNode;
  loading?: boolean;
}

interface InfoRowProps {
  icon: string;
  text: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ icon, text }) => {
  return (
    <InfoRowContainer>
      <i className={icon} />
      <Text color="##434343" size="12px">
        {text}
      </Text>
    </InfoRowContainer>
  );
};

const QuizathonCard: React.FC<QuizathonCardProps> = ({
  event,
  loading = false,
  badge,
  onCardClick,
  isRegistered,
  ...rest
}) => {
  const eventStartTime = new Date(event.startAt as string);
  const eventEndTime = new Date(event.stopAt as string);
  const currentTimeStamp = new Date();

  const hasStarted = eventStartTime.getTime() <= currentTimeStamp.getTime();
  const hasEnded = eventEndTime.getTime() <= currentTimeStamp.getTime();
  const isActive = hasStarted && !hasEnded;

  const formattedDate = moment(event.startAt).format('Do MMMM, YYYY');
  const formattedTime = `${moment(event.startAt).format('hh:mm A')} - ${moment(
    event.stopAt
  ).format('hh:mm A')}`;

  const description =
    event.description ||
    'The monthly campus quizathon event is back. As usual, there are awesome prices to be won';
  const navigate = useNavigate();

  return (
    <Card onClick={onCardClick} {...rest}>
      <CardContent>
        <Box style={{ position: 'relative' }}>
          <CardImage src={event.bannerUrl || BannerDeskto} alt={event.title} />
          {badge && <BadgeContainer>{badge}</BadgeContainer>}
        </Box>

        <ContentSection>
          <TitleText size="1.1rem" color="#434343">
            {event.title}
          </TitleText>
          <Spacer space={5} />

          <DescriptionText color="#434343" size="13px">
            {description}
          </DescriptionText>
          <Spacer space={10} />

          <InfoSection>
            <InfoRow
              icon="saf-empty-wallet"
              text={formatPrize(event.price as number)}
            />
            <Spacer space={10} />
            <InfoRow icon="saf-calendar-1" text={formattedDate} />
            <Spacer space={10} />
            <InfoRow icon="saf-clock" text={formattedTime} />
          </InfoSection>
        </ContentSection>
      </CardContent>

      <ButtonContainer>
        <Spacer space={20} />
        {isActive && isRegistered ? (
          <Button
            onClick={() => navigate('/new-practice')}
            className="w-full"
            progress={loading}
          >
            Start Now
          </Button>
        ) : (
          <CardButton progress={loading}>View Quizathon</CardButton>
        )}
      </ButtonContainer>
    </Card>
  );
};

export default QuizathonCard;

const Card = styled(Box)`
  border-radius: 6px;
  display: flex;
  background: #fff;
  cursor: pointer;
  flex-direction: column;

  height: 100%;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-4px);
  }
`;

const CardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ContentSection = styled.div`
  flex: 1;
  padding: 10px 8px 0 8px;
  display: flex;
  flex-direction: column;
`;

const TitleText = styled(Text)`
  font-weight: 500;
  line-height: 1.5;
  margin-bottom: 5px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DescriptionText = styled(Text)`
  line-height: 1.6;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 10px;
`;

const InfoSection = styled.div`
  margin-top: auto;
`;

const ButtonContainer = styled.div`
  padding: 0 8px 20px 8px;
  margin-top: auto;
`;

const BadgeContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
`;

const CardImage = styled.img`
  width: 100%;
  height: 194px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
`;

const CardButton = styled(Button)<{ disabled?: boolean }>`
  width: 100%;
  padding: 10px 0;
  border-radius: 6px;
  border: ${({ disabled }) => (disabled ? 'none' : '1px solid #1D4ED8')};
  background: ${({ disabled }) => (disabled ? '#D4D4D8' : '#fff')};
  color: ${({ disabled }) => (disabled ? '#656464' : '#1D4ED8')};
  font-weight: 400;
  font-size: 0.8rem;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: background 0.2s;

  &:hover {
    color: #ffff;
  }
`;

const InfoRowContainer = styled.div<{
  marginTop?: string;
  marginBottom?: string;
}>`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: ${({ marginTop }) => marginTop};
  margin-bottom: ${({ marginBottom }) => marginBottom};
`;
