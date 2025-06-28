import styled from 'styled-components';
import Theme from '../../utils/theme';
import fontSize from '../../utils/typography';
import devices from '../../utils/devices';
import { Box } from '@flexisaf/flexibull2';

export const Container = styled(Box)`
  width: 90%;
  margin: auto;
  max-width: 1440px;
  font-size: medium;
  #works {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 30px auto;
    min-height: 70vh;

    .boxWrapper {
      margin-top: 30px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  }
  #benefits {
    min-height: 70vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    ul {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      list-style: none;
    }
    ul li {
      width: 180px;
      font-size: large;
      margin-bottom: 10px;
    }
    ul svg {
      padding: 5px;
      font-size: 3.3rem;
      display: block;
      margin-bottom: 10px;
      color: ${Theme.PrimaryColor};
    }
    @media screen and (max-width: 768px) {
      ul li {
        width: 80%;
      }
    }
  }
  #guidelines {
    min-height: 50vh;
  }
`;
export const Title = styled.h1`
  font-size: ${fontSize.h1.size};
  font-weight: 700;
  color: ${Theme.PrimaryColor};
  line-height: 156.52%;
  /* text-align: center; */

  @media (min-width: 1024px) {
    font-size: 2rem /* 32px */;
  }

  @media (min-width: 1280px) {
    font-size: 2.5rem /* 40px */;
  }
`;

export const CreateEarnImage = styled.img.attrs({
  src: '/images/pexels-karolina-grabowska-6328945.jpg',
})`
  width: 100%;
  object-fit: contain;
  margin-bottom: 10px;
  @media ${devices.laptop} {
    width: 45%;
    margin-bottom: 0px;
  }
`;

export const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 191.02%;
  gap: 2.8em;
  text-align: justify;

  div {
    width: 100%;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    div {
      width: 100%;
    }
  }
`;

export const Card = styled.div`
  background: #fff;
  padding: 20px;
  width: 300px;
  line-height: 23px;
  height: 200px;
  margin: 5px;
  border-radius: 5px;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  font-size: medium;
  position: relative;
  strong {
    display: block;
    text-align: center;
    margin: 10px 0px;
    color: ${Theme.PrimaryColor};
  }
  div {
    position: absolute;
    top: -20px;
    left: 0;
    right: 0;
    margin: auto;
    padding: 0px;
    border-radius: 100px;
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* border: 1px solid black; */
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
  svg {
    font-size: 24px;
  }
  @media screen and (max-width: 768px) {
    margin-top: 30px;
  }
`;
