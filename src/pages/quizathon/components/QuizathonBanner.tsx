
import { Text, Spacer, Box } from '@flexisaf/flexibull2';
import { BannerDesktop, BannerMobile } from '../styles';
import BannerDesktopImage from '../../../assets/images/BannerDeskto.png';
import BannerMobileImage from '../../../assets/images/BannerMobile.png';

const QuizathonBanner = () => {
  return (
    <>
      <BannerDesktop>
        <img src={BannerDesktopImage} />

        <Box className="background-text">
          <Text color="#FFCB66" bold size="1.1rem">
            What is Quizathon?
          </Text>
          <Spacer space={10} />
          <Text style={{ lineHeight: '19px' }} color="#fff" size="1rem">
            Quizathon isn’t just another competition, it’s a nationwide
            celebration of academic excellence. It features AI-generated,
            curriculum-aligned questions designed to test your critical thinking
            and knowledge. From single to multiple-choice questions, Quizathon
            will push you to the next level.
          </Text>
        </Box>
      </BannerDesktop>
      <BannerMobile>
        <img src={BannerMobileImage} />
        <Box pad="20px" style={{ textAlign: 'center' }}>
          <Text color="#FFCB66" bold size="1.1rem">
            What is Quizathon?
          </Text>
          <Spacer space={10} />
          <Text style={{ lineHeight: '19px' }} color="#202020" size="1rem">
            Quizathon isn’t just another competition, it’s a nationwide
            celebration of academic excellence. It features AI-generated,
            curriculum-aligned questions designed to test your critical thinking
            and knowledge. From single to multiple-choice questions, Quizathon
            will push you to the next level.
          </Text>
        </Box>
      </BannerMobile>
    </>
  );
};

export default QuizathonBanner;
