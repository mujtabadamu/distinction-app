import React from 'react';
import { Box, Button, Spacer } from '@flexisaf/flexibull2';
import Slider from 'react-slick';
import styled from 'styled-components';
import cards from 'assets/images/domino-cards.svg';

const SliderWrapper = styled.div`
  .slick-slider {
    width: 100%;
  }

  .slick-list {
    overflow: hidden;
  }

  .slick-track {
    display: flex;
  }

  .slick-slide {
    float: none;
    height: auto;
    padding: 0 10px;
  }

  .slick-dots {
    display: flex !important;
    justify-content: center;
    gap: 10px;
    margin: 1rem 0 0;
    list-style: none;
  }

  .slick-dots li button::before {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    background-color: #ccc;
    border-radius: 50%;
  }

  .slick-dots li.slick-active button::before {
    background-color: #ffcb66;
  }
`;

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  arrows: false,
  centerMode: true,
  cssEase: 'linear',
  centerPadding: '30px',
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },

    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
        centerPadding: '10px',
      },
    },
  ],
  customPaging: () => <button />,
};

const slides = [
  {
    title: 'Flashcards',
    introText: 'Introducing',
    subtitle: 'Personalized Learning, Anytime, Anywhere',
    buttonText: 'Get Started',
    buttonAction: () => (window.location.href = '/my-library'),
  },
  {
    title: 'Key Points',
    introText: 'Do you know',
    subtitle: 'is now available on distinction?',
    buttonText: 'Get Started',
    buttonAction: () => (window.location.href = '/my-library'),
  },
  // {
  //   title: 'Study Groups',
  //   introText: 'Introducing',
  //   subtitle: 'Learn together with your peers',
  //   buttonText: 'Join Now',
  //   buttonAction: () => (window.location.href = '/my-library'),
  // },
];

const FeatureSlider: React.FC = () => {
  return (
    <SliderWrapper>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <SlideCard key={index} {...slide} />
        ))}
      </Slider>
    </SliderWrapper>
  );
};

export default FeatureSlider;

interface SlideCardProps {
  title: string;
  subtitle: string;
  introText: string;
  buttonText: string;
  buttonAction: () => void;
  image?: string;
  backgroundColor?: string;
}

const Card = styled.div`
  border-radius: 1rem;
  padding: 2rem;
  backdrop-filter: blur(15px);
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
  outline: 1px solid rgba(21, 164, 238, 0.7);
  outline-offset: -1px;
  overflow: hidden;
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: bold;
  margin: 1rem 0 0;
  color: #ffcb66;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  color: #f5f5f7;
  font-size: 1.25rem;
  margin: 0;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SlideCard: React.FC<SlideCardProps> = ({
  title,
  subtitle,
  buttonText,
  buttonAction,
  introText,
}) => {
  return (
    <Card>
      <Box>
        <Subtitle>{introText}</Subtitle>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
        <Spacer space={16} />
        <Button color="#fff" fontColor="#1D4ED8" onClick={buttonAction}>
          {buttonText}
        </Button>
      </Box>
      <ImageWrapper>
        <Image src={cards} alt="" />
      </ImageWrapper>
    </Card>
  );
};

const ImageWrapper = styled.div`
  position: absolute;
  right: 0;
  transform: translateY(-70%);
  height: 100%;
  width: 200px;
  @media (max-width: 1200px) {
    display: none;
  }
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;
