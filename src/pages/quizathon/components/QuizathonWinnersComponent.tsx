import { Text, Box, Spacer, DropDown, Grid } from '@flexisaf/flexibull2';
import FirstWinnerImg from '../../../assets/images/first_winner.jpeg';
import SecondWinnerImg from '../../../assets/images/second_winner.jpg';
import ThirdWinnerImg from '../../../assets/images/third_winner.jpeg';
import Quizathon1FirstWinner from '../../../assets/images/quizathon1.0-first-winner.jpeg';
import Quizathon1ThirdWinner from '../../../assets/images/quizathon1.0-third-winner.jpeg';
import { useState } from 'react';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

interface Winner {
  id: number;
  name: string;
  institution: string;
  points: string;
  img: string;
  color: string;
}

interface QuizathonSection {
  winners: Winner[];
  backgroundColor: string;
}

interface QuizathonData {
  [key: string]: QuizathonSection;
}

interface MenuItem {
  label: string;
  onClick: () => void;
}

const QuizathonWinners = () => {
  const [selectedQuizathon, setSelectedQuizathon] = useState('all');
  const settings = {
    speed: 1000,
    slidesToShow: 3.05,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    cssEase: 'linear',
    arrows: false,
    spaceBetween: 20,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2.1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3.1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.09,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const getFilteredQuizathons = () => {
    if (selectedQuizathon === 'all') {
      return quizathons;
    }
    return {
      [selectedQuizathon]: quizathons[selectedQuizathon],
    };
  };

  const handleSortMenu = (): MenuItem[] => {
    return [
      {
        label: 'All Quizathons',
        onClick: () => {
          setSelectedQuizathon('all');
        },
      },
      ...Object.keys(quizathons).map((name) => ({
        label: name,
        onClick: () => {
          setSelectedQuizathon(name);
        },
      })),
    ];
  };

  return (
    <>
      <WinnerContainer style={{ background: '#fff' }}>
        <BoxFilter>
          <DropDown
            label={
              <Box className="sort-box">
                <i className="saf-arrow-3" />
                Filter by Quizathon Version
              </Box>
            }
            menuAlign="bottom right"
            menuList={handleSortMenu()}
          />
        </BoxFilter>
        <Spacer space="20" />
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
          }}
        >
          {Object.entries(getFilteredQuizathons()).map(
            ([title, { winners, backgroundColor }]) => (
              <Box
                key={title}
                style={{ backgroundColor: backgroundColor, padding: '2rem 0' }}
              >
                <Text
                  className="winner-title"
                  block
                  bold
                  style={{ lineHeight: '1.3', textAlign: 'center' }}
                >
                  Winners Of {title}
                </Text>
                <Spacer space="20" />
                <Box className="winner-container">
                  <Desktop>
                    <Grid
                      default="repeat(3, 1fr)"
                      md="repeat(2, 1fr)"
                      sm="repeat(1, 1fr)"
                      gap="20px"
                    >
                      {winners.map((winner, index) => (
                        <Box
                          key={index}
                          className="winner-bottom-bg"
                          background={winner.color}
                        >
                          <Box
                            background="#F2F2F7"
                            className="winner-card"
                            key={winner.id}
                          >
                            <Box
                              className="winner-wrapper"
                              background={winner.color}
                            >
                              <Box className="position">
                                <Text size="1rem" block bold>
                                  {winner.id}
                                </Text>
                              </Box>
                              <img
                                src={winner.img}
                                alt="winner-image"
                                className="winner-img"
                              />
                            </Box>
                            <Text
                              size="1.1rem"
                              block
                              bold
                              style={{ textAlign: 'center' }}
                            >
                              {winner.name}
                            </Text>
                            <Box>
                              <Text
                                size="1rem"
                                block
                                style={{ textAlign: 'center' }}
                              >
                                {winner.institution}
                              </Text>
                              <Spacer space="5" />
                              <Text
                                size="1rem"
                                block
                                style={{
                                  color: '#7F7F7F80',
                                  textAlign: 'center',
                                }}
                              >
                                {winner.points}
                              </Text>
                            </Box>
                          </Box>
                        </Box>
                      ))}
                    </Grid>
                  </Desktop>

                  <Mobile>
                    <CusSlider {...settings}>
                      {winners.map((winner, index) => (
                        <Box
                          key={index}
                          className="winner-bottom-bg"
                          background={winner.color}
                        >
                          <Box
                            background="#F2F3FB"
                            className="winner-card"
                            key={winner.id}
                          >
                            <Box
                              className="winner-wrapper"
                              background={winner.color}
                            >
                              <Box className="position">
                                <Text size="1rem" block bold>
                                  {winner.id}
                                </Text>
                              </Box>
                              <img
                                src={winner.img}
                                alt="winner-image"
                                className="winner-img"
                              />
                            </Box>
                            <Text
                              size="1.1rem"
                              block
                              bold
                              style={{ textAlign: 'center' }}
                            >
                              {winner.name}
                            </Text>
                            <Box>
                              <Text
                                size="1rem"
                                block
                                style={{ textAlign: 'center' }}
                              >
                                {winner.institution}
                              </Text>
                              <Spacer space="5" />
                              <Text
                                size="1rem"
                                block
                                style={{
                                  color: '#7F7F7F80',
                                  textAlign: 'center',
                                }}
                              >
                                {winner.points}
                              </Text>
                            </Box>
                          </Box>
                        </Box>
                      ))}
                    </CusSlider>
                  </Mobile>
                </Box>
              </Box>
            )
          )}
        </Box>
      </WinnerContainer>
    </>
  );
};

const BoxFilter = styled(Box)`
  text-align: center;
  & .sort-box {
    padding: 0.9rem;
    border-radius: 5px;
    border: 1px solid #0a0a0c;
    color: #6c7072;
    cursor: pointer;
    display: flex;
    align-items: center;
    margin: 1rem;
    justify-content: center;
  }
  @media (min-width: 768px) {
    text-align: right;
  }
`;

const quizathons: QuizathonData = {
  'Quizathon 1.0': {
    winners: [
      {
        id: 1,
        name: 'Izuafa Abdulrafiu',
        institution: 'Veritas University, Abuja',
        points: '20,63',
        img: Quizathon1FirstWinner,
        color: '#1D4ED8',
      },
      {
        id: 2,
        name: 'Daniel Adesanya Oluwajoba',
        institution: 'University of Benin',
        points: '1654',
        img: FirstWinnerImg,
        color: '#FF9500',
      },
      {
        id: 3,
        name: 'Emmanuel Philip Ogbonna',
        institution: 'Univeristy of Calabar',
        points: '1633',
        img: Quizathon1ThirdWinner,
        color: '#187A97',
      },
    ],
    backgroundColor: '#ffff',
  },
  'Quizathon 2.0': {
    winners: [
      {
        id: 1,
        name: 'Daniel Adesanya',
        institution: 'University of Ibadan',
        points: '11,927',
        img: FirstWinnerImg,
        color: '#1D4ED8',
      },
      {
        id: 2,
        name: 'Osazuwa Ero',
        institution: 'Federal University of Technology, Minna',
        points: '10,639',
        img: SecondWinnerImg,
        color: '#FF9500',
      },
      {
        id: 3,
        name: 'Barnabas Oluwasegun',
        institution: 'University of Ibadan',
        points: '8,654',
        img: ThirdWinnerImg,
        color: '#187A97',
      },
    ],
    backgroundColor: '#F8F9FF',
  },
};
const CusSlider = styled(Slider)`
  & .slick-slide {
    margin: 10px;
  }
  & .slick-list {
    height: 450px;
  }
`;
const Mobile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  @media (min-width: 768px) {
    display: none;
  }
`;
const Desktop = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
`;

export const WinnerContainer = styled.div`
  position: relative;
  & .winner-container {
    width: 100%;
    margin: 0 auto;
    @media (min-width: 768px) {
      width: 80%;
    }
  }
  & .winner-bottom-bg {
    padding: 0 0 5px 0;
    border-radius: 8px;
  }

  & .winner-card {
    border-radius: 8px;
    padding: 30px;
    gap: 0.4rem;
    height: 373px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
  & .winner-wrapper {
    border-radius: 50%;
    padding: 0.3rem;
    position: relative;
    width: 140px;
    height: 140px;
  }

  & .current-title {
    display: none;
    @media (min-width: 768px) {
      display: block;
    }
  }

  & .winner-img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  & .position {
    color: black;
    background-color: #fff;
    border-radius: 50%;
    position: absolute;
    width: 38px;
    height: 38px;
    display: flex;
    justify-content: center;
    align-items: center;
    top: -30px;
    right: 48px;
  }
  & .past-winners {
    color: #1d4ed8;
    text-decoration: underline;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    @media (min-width: 768px) {
      position: absolute;
      top: 46px;
      right: 40px;
    }
  }
  & .winner-title {
    font-size: 1.3rem;
    font-weight: 700;
    color: #202020;
    @media (min-width: 768px) {
      font-size: 1.8rem;
    }
  }
`;
export default QuizathonWinners;
