import styled from 'styled-components';
import devices from '../../utils/devices';

export const Container = styled.div`
  max-width: 1100px;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  margin-left: auto;
  margin-right: auto;
  width: 100%;

  @media ${devices.laptop} {
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }

  @media (min-width: 1280px) {
    padding-left: 0px;
    padding-right: 0px;
  }
`;

export const Section = styled.section`
  margin-bottom: 2rem;

  @media ${devices.laptop} {
    margin-bottom: 10rem;
  }
`;

export const Section2 = styled.section`
  margin-bottom: 2rem;

  @media ${devices.laptop} {
    margin-bottom: 20rem;
  }
`;
