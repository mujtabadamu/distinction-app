import styled from 'styled-components';
import devices from 'utils/devices';
import { Box } from '@flexisaf/flexibull2';

export const Logo = styled.img.attrs({
  src: '/newdistinctionlogo.svg',
})<{ size?: string }>`
  width: ${(props) => (props.size ? props.size : '7rem')};
  cursor: pointer;
  padding: 1rem;

  @media ${devices.tablet} {
    width: ${(props) => (props.size ? props.size : '9rem')};
  }
`;

export const VerifyContainer = styled(Box)`
  padding: 0.5rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-image: url('overlay.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  & .container-exam {
    max-width: 381px;
    display: none;
    margin-bottom: 1rem;
    @media ${devices.tablet} {
      display: block;
    }
  }
  & .easy-title {
    font-weight: 700;
    font-family: Noto Serif;
  }
  & .easy-description {
    font-size: 1rem;
    font-weight: 400;
  }
  @media ${devices.tablet} {
    padding: 1.5rem;
  }
`;

export const Footer = styled(Box)`
  display: flex;
  justify-content: space-between;
  gap: 0.3rem;
  flex-wrap: wrap;
  padding: 1rem;
  & .footer-service {
    font-weight: bold;
    text-decoration: underline;
    color: black;
  }
`;

export const Screen = styled(Box)`
  padding: 2rem;
  background-color: white;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  & .container {
    max-width: 370px;
    margin: 0 auto;
  }
`;

export const InstitutionProfile = styled(Box)`
  & .title {
    color: #454545;
    font-size: 1rem;
    font-weight: 500;
    margin: 0;
  }

  & .course {
    color: #454545;
    font-size: 0.9rem;
    font-weight: 400;
  }
  & .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #d9d9d9;
  }
`;

export const Boxicon = styled(Box)<{ top: string }>`
  position: absolute;
  top: ${(props) => props.top};
  right: 5px;
  cursor: pointer;
`;

export const ProfileDetails = styled(Box)`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  flex-wrap: wrap;
`;
