import { Spacer, Box, Text } from '@flexisaf/flexibull2';
import { Container } from './styles';
import styled from 'styled-components';
import NavBar from 'components/landing/navBar.component';
import QuizathonWinners from './components/QuizathonWinnersComponent';
import BannerMobileImage from '../../assets/images/BannerMobile.png';
import BannerDesktopImage from '../../assets/images/BannerDeskto.png';
import QuizathonFaq from './components/QuizathonFaq';

const quizathonWinners = () => {
  const quizathonPageLink = [
    { link: '#home', name: 'Home' },
    { link: '#features', name: 'Features' },
    { link: '#benefits', name: 'Benefits' },
    { link: '/quizathon', name: 'Quizathon' },
  ];

  return (
    <>
      <Container>
        <NavBar navLinks={quizathonPageLink} />
        <Spacer space="30" />
        <BannerDesktop>
          <div className="banner-wrapper">
            <img src={BannerDesktopImage} alt="Desktop Banner" />
            <Box className="background-text">
              <Text bold size="1.1rem" color="#fff">
                Below are information about the current and past distinction
                quizathon winners from inception
              </Text>
            </Box>
          </div>
        </BannerDesktop>
        <BannerMobile>
          <div className="banner-wrapper">
            <img src={BannerMobileImage} alt="Mobile Banner" />
            <Box className="background-text">
              <Text bold size="1rem" color="#fff">
                Below are information about the current and past distinction
                quizathon winners from inception
              </Text>
            </Box>
          </div>
        </BannerMobile>
      </Container>
      <QuizathonWinners />
      <QuizathonFaq />
    </>
  );
};

export const BannerDesktop = styled.div`
  width: 100%;
  height: 100%;
  display: none;

  .banner-wrapper {
    position: relative;
    width: 100%;
  }

  .background-text {
    position: absolute;
    text-align: center;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    max-width: 800px;
    padding: 20px;
    background: rgba(0, 0, 0, 0.25);
    border-radius: 10px;
  }

  img {
    width: 100%;
    height: auto;
    display: block;
  }

  @media (min-width: 768px) {
    display: block;
  }
`;

export const BannerMobile = styled.div`
  width: 100%;

  .banner-wrapper {
    position: relative;
    width: 100%;
  }

  img {
    width: 100%;
    height: auto;
    display: block;
  }

  .background-text {
    position: absolute;
    text-align: center;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
    width: 85%;
    padding: 15px;
    background: rgba(0, 0, 0, 0.25);
    border-radius: 10px;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

export default quizathonWinners;
