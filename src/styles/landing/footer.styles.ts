import styled from 'styled-components';
import { Text } from '@flexisaf/flexibull2';

import Theme from '../../utils/theme';
import devices from '../../utils/devices';

export const FooterWrapper = styled.div`
  width: 100vw;
  background-color: ${Theme.PrimaryDark};
  padding-top: 2.5rem;
  padding-bottom: 2.5rem;
  /* margin-top: 2.5rem; */
`;

export const CompanyInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & > :not([hidden]) ~ :not([hidden]) {
    --tw-space-y-reverse: 0;
    margin-top: calc(1.5rem * calc(1 - var(--tw-space-y-reverse)));
    margin-bottom: calc(1.5rem * var(--tw-space-y-reverse));
  }

  @media ${devices.tablet} {
    flex-direction: row;
    & > :not([hidden]) ~ :not([hidden]) {
      --tw-space-y-reverse: 0;
      margin-top: calc(0px * calc(1 - var(--tw-space-y-reverse)));
      margin-bottom: calc(0px * var(--tw-space-y-reverse));
    }
  }
`;

export const CompanyInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.7rem;
  max-width: 20rem;
  & > :not([hidden]) ~ :not([hidden]) {
    --tw-space-y-reverse: 0;
    margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
    margin-bottom: calc(1rem * var(--tw-space-y-reverse));
  }

  @media ${devices.laptop} {
    font-size: 0.9rem;
    max-width: 24rem;
  }
`;

export const CompanyLogo = styled.img.attrs({
  src: '/flexisaflogo.svg',
})`
  margin-bottom: 1rem;
  width: 8rem;
`;

export const FooterText = styled(Text).attrs({
  color: Theme.SecondaryGrey,
})`
  line-height: 21.68px;
`;

export const CompanyLinksWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media ${devices.laptop} {
    width: 50%;
  }
`;

export const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;

  & > :not([hidden]) ~ :not([hidden]) {
    --tw-space-y-reverse: 0;
    margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
    margin-bottom: calc(1rem * var(--tw-space-y-reverse));
  }

  @media ${devices.tablet} {
    & > :not([hidden]) ~ :not([hidden]) {
      --tw-space-y-reverse: 0;
      margin-top: calc(1.5rem * calc(1 - var(--tw-space-y-reverse)));
      margin-bottom: calc(1.5rem * var(--tw-space-y-reverse));
    }
  }
`;

export const LinkHeader = styled.h4`
  color: white;
  font-weight: 700;
  font-size: 0.8rem;

  @media ${devices.laptop} {
    font-size: 1rem;
  }
`;

export const Link = styled.a.attrs({
  target: '_blank',
})`
  color: ${Theme.SecondaryGrey};
  text-decoration: none;
  font-size: 0.7rem;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  cursor: pointer;

  &:hover {
    color: ${Theme.PrimaryBlue};
  }

  @media ${devices.laptop} {
    font-size: 0.9rem;
  }
`;

export const Border = styled.div`
  border: 0.2px solid #424242;
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
`;

export const CopyWrightWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SocialLinksWrapper = styled.div`
  display: flex;
  & > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(1rem * var(--tw-space-x-reverse));
    margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse)));
  }
`;
