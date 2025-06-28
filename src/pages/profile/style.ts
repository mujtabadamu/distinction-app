import { Box, Button, Grid } from '@flexisaf/flexibull2';
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  background: white;
`;

export const ProfileHeader = styled.div`
  display: flex;
  align-items: end;
  flex-wrap: wrap;
  gap: 10px;
  width: 95%;
  margin: auto;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  transform: translate(0%, 65%);
`;

export const ProfileInfo = styled.div`
  flex: 1;
`;

export const NiNWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  & .nin_button {
    color: #ffff;
    background-color: #202020;
    /* padding: 10px; */
    @media screen and (max-width: 768px) {
      width: 60%;
      margin: 10px 0px;
    }
  }
`;

export const BadgeContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 15px 20px 20px 20px;
  margin: 20px 0px;
  box-shadow: 0px 4px 9px 0px #0000000a, 0px 16px 16px 0px #0000000a,
    0px 37px 22px 0px #00000005, 0px 65px 26px 0px #00000003,
    0px 102px 29px 0px #00000000;
  height: 150px;
  width: 370px;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const BadgeIcon = styled(Box)`
  margin-top: 20px;
`;

export const StatsGrid = styled(Grid)`
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
`;

export const Section = styled.div`
  background: #071b59;
  border-radius: 12px;
  padding: 10px;
  height: 160px;
  text-align: center;
  color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h2`
  font-size: 18px;
  font-weight: 400;
  margin: 0 0 20px 0;
`;

export const ExtendedButton = styled(Button)`
  background: white;
  color: #1d4ed8;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  width: fit-content;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    background: white !important;
  }
`;

export const Footer = styled.div`
  text-align: center;
  color: #9e9e9e;
  font-size: 16px;
  padding: 20px 0;
`;
