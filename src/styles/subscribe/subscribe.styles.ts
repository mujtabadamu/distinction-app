import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ModalBody, Text } from '@flexisaf/flexibull2';
import devices from '../../utils/devices';

export const SubscribeWrapper = styled(motion.div)`
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 4rem;
  min-width: 100%;

  @media ${devices.laptop} {
    margin-top: 1rem;
  }
`;

export const InfoWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3rem;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
`;

export const SubscribeModalBody = styled(ModalBody)`
  width: 90%;

  @media ${devices.laptop} {
    width: 40%;
  }
`;

export const ModalHeaderText = styled(Text)`
  font-size: 0.9rem;

  @media ${devices.laptop} {
    font-size: 1.1rem;
  }
`;
