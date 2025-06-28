import styled from 'styled-components';
import { Text } from '@flexisaf/flexibull2';
import devices from '../../utils/devices';

export const Title = styled(Text)`
  font-size: 1.5rem;

  @media ${devices.laptop} {
    font-size: 2rem;
  }
`;

export const SubTitle = styled(Text)`
  font-size: 1rem;

  @media ${devices.laptop} {
    font-size: 1.5rem;
  }
`;
