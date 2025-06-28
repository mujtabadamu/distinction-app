import { ReactNode } from 'react';
import styled from 'styled-components';
import { Accordion } from '@flexisaf/flexibull2';
import Theme from '../../utils/theme';
import devices from '../../utils/devices';

export const FaqsWrapper = styled(Accordion).attrs({
  gap: '5px',
  color: Theme.PrimaryColor,
})`
  margin-top: 1rem;
  border: none;
  box-shadow: 0px 283px 113px rgba(199, 199, 199, 0.01),
    0px 159px 95px rgba(199, 199, 199, 0.05),
    0px 71px 71px rgba(199, 199, 199, 0.09),
    0px 18px 39px rgba(199, 199, 199, 0.1), 0px 0px 0px rgba(199, 199, 199, 0.1);
  border-radius: 5px;
  background-color: white;
  font-size: 0.8rem;
  font-weight: 400 !important;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  color: ${Theme.PrimaryDark};

  @media ${devices.laptop} {
    margin-top: 1.8rem;
  }
`;

export const FaqQuestion = styled.div<{ label: string | ReactNode }>`
  border: none;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export const FaqAnswer = styled.div`
  border: none;
`;
