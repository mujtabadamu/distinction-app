import { motion } from 'framer-motion';
import { ModalBody, Button } from '@flexisaf/flexibull2';

import styled from 'styled-components';
import devices from '../../utils/devices';
import Theme from '../../utils/theme';

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const AuthWithGoogle = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 40px;
  background: white;
  box-shadow: 0px 53px 21px rgba(145, 145, 145, 0.01),
    0px 30px 18px rgba(145, 145, 145, 0.05),
    0px 13px 13px rgba(145, 145, 145, 0.09),
    0px 3px 7px rgba(145, 145, 145, 0.1), 0px 0px 0px rgba(145, 145, 145, 0.1);
  border-radius: 4px;
  transition: all 0.2s;
  color: ${Theme.PrimaryColor};

  & img {
    margin-right: 1rem;
  }

  &:hover {
    color: white !important;
  }
`;

export const AuthWrapper = styled(motion.div)`
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 4rem;
  width: 100%;

  @media ${devices.laptop} {
    margin-top: 1rem;
  }
`;

export const VerifyAccountWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3rem;
`;

export const ForgotPasswordModalBody = styled(ModalBody)`
  width: 90%;

  @media ${devices.laptop} {
    width: 40%;
  }
`;


