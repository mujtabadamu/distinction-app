import styled from 'styled-components';

export const Container = styled.div`
  & .logo {
    padding: 0 20px;
  }
  & .quizathon-banner {
    object-fit: contain;
    width: 100%;
  }
  & .quizathon-countdown {
    padding: 1rem;
    border: 1px solid #c6ccf09e;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 0 auto;
    border-radius: 8px;
    @media (min-width: 768px) {
      border: none;
      width: 100%;
    }
  }

  & .quizathon-title {
    font-size: 1rem;
    font-weight: 600;
    @media (min-width: 768px) {
      font-size: 1.5rem;
    }
  }
  & .quizathon-desc {
    font-size: 1rem;
    @media (min-width: 768px) {
      font-size: 1.3rem;
    }
  }
  & .container-faq {
    padding: 1rem;
    max-width: 1024px;
    margin: 0 auto;
  }
`;

export const WinnerContainer = styled.div`
  padding: 20px;
  position: relative;
  @media (min-width: 768px) {
    padding: 40px;
  }
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
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    @media (min-width: 768px) {
      font-size: 1rem;
      position: absolute;
      top: 46px;
      right: 40px;
    }
  }
  & .winner-title {
    font-size: 1rem;
    font-weight: 700;
    color: #202020;
    @media (min-width: 768px) {
      font-size: 1.5rem;
    }
  }
`;
export const PublicContainer = styled.div`
  padding: 0 20px;
  background-color: #f2f2f7;
  @media (min-width: 768px) {
    padding: 0 40px;
  }

  & .public-title {
    font-size: 1.1rem;
    @media (min-width: 768px) {
      font-size: 1.5rem;
    }
  }
  & .public-subtitle {
    font-size: 1rem;
    font-weight: 500;
    @media (min-width: 768px) {
      font-size: 1.3rem;
    }
  }

  & .public-card {
    border-radius: 8px;
    display: flex;
    padding: 20px;
    justify-content: space-between;
    flex-direction: column;
    gap: 1.3rem;
    margin: 5px;
    min-width: 90%;
    width: 342px;
    height: 400px;
  }

  & .qoute-img {
    width: 25px;
    height: 25px;
  }
`;
export const Desc = styled.h3`
  display: flex;
  gap: 0.3rem;
`;

export const HeroImageStyle = styled.img`
  width: 100%;
  object-fit: contain;
  height: 433px;
  @media (min-width: 768px) {
    width: 50%;
  }
`;

export const HeroSection = styled.div`
  padding: 1rem 2rem;
  width: 100%;
  & .title-text {
    font-size: 1rem;
    font-weight: 700;
  }
  & .paragraph {
    font-size: 1rem;
    max-width: 542px;
    line-height: 1.5;
    text-align: justify;
  }
  & .title-head {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1d4ed8;
    @media (min-width: 768px) {
      font-size: 2.4rem;
    }
  }
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
export const Card = styled.div`
  background: #fff;
  width: 100%;
  padding: 1rem;
  & .position {
    color: #8e8e93;
    display: flex;
    align-items: center;
    gap: 0.2rem;
    font-size: 0.9rem;
  }
  & .position-text {
    margin: 0;
  }
  & .amount-won {
    color: #aeaeb2;
    font-size: 0.9rem;
  }
`;

export const PriceCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #e5e5ea;
  & .title {
    margin: 0.5rem;
    font-size: 1rem;
    color: #8e8e93;
  }
`;

export const BannerDesktop = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: block;
    position: relative;
    width: 100%;
    img {
      width: 100%;
      height: auto;
    }
    /* .text-wrapper {
      position: absolute;
      left: 150px;
      top: 228px;
    } */

    .background-text {
      position: absolute;
      text-align: center;
      top: 300px;
      width: 80%;
      margin: 0 auto;
      left: 150px;
      padding: 20px;
      background: rgba(0, 0, 0, 0.25);
      border-radius: 10px;
    }
    .banner-button {
      position: absolute;
      top: 73%;
      left: 70%;
      background-color: #fff;
      color: #353593;
      cursor: pointer;
      padding: 20px 30px;
    }
  }
`;

export const BannerMobile = styled.div`
  position: relative;
  width: 100%;
  img {
    width: 100%;
    height: auto;
  }
  .banner-button {
    position: absolute;
    top: 88%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    color: #353593;
    cursor: pointer;
    padding: 10px 30px;
  }
  @media (min-width: 768px) {
    display: none;
  }
`;
export const BoxWinnerMobile = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  @media (min-width: 768px) {
    display: block;
  }
`;
