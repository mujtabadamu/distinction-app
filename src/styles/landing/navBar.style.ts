import styled from 'styled-components';
import devices from '../../utils/devices';
import Theme from '../../utils/theme';
import { motion } from 'framer-motion';

export const NavBarContainer = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
`;

export const Logo = styled.img.attrs({
  src: '/distinctionlogo.svg',
})<{ size?: string }>`
  width: ${(props) => (props.size ? props.size : '7rem')};
  cursor: pointer;

  @media ${devices.tablet} {
    width: ${(props) => (props.size ? props.size : '9rem')};
  }
`;

export const NavigationWrapper = styled.div`
  display: none;

  @media ${devices.tablet} {
    display: flex;
    align-items: center;

    & > :not([hidden]) ~ :not([hidden]) {
      --tw-space-x-reverse: 0;
      margin-right: calc(1.5rem * var(--tw-space-x-reverse));
      margin-left: calc(1.5rem * calc(1 - var(--tw-space-x-reverse)));
    }
  }

  @media ${devices.laptop} {
    & > :not([hidden]) ~ :not([hidden]) {
      --tw-space-x-reverse: 0;
      margin-right: calc(3rem * var(--tw-space-x-reverse));
      margin-left: calc(3rem * calc(1 - var(--tw-space-x-reverse)));
    }
  }
`;

export const Navigation = styled.a`
  --tw-text-opacity: 1;
  color: rgb(75 85 99 / var(--tw-text-opacity));
  font-size: 0.7rem;
  cursor: pointer;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  text-decoration: none;

  &:hover {
    color: ${Theme.PrimaryColor};
  }

  @media ${devices.laptop} {
    font-size: 0.9rem;
  }
`;

export const ButtonsWrapper = styled.div`
  display: none;

  @media ${devices.tablet} {
    display: flex;
    & > :not([hidden]) ~ :not([hidden]) {
      --tw-space-x-reverse: 0;
      margin-right: calc(1rem * var(--tw-space-x-reverse));
      margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse)));
    }
  }
`;

export const HamburgerWrapper = styled.div`
  @media ${devices.tablet} {
    display: none;
  }
`;

export const MobileMenuWrapper = styled(motion.div)`
  background-color: white;

  height: 100vh;
  width: 100vw;
  position: fixed;
  right: 0px;
  top: 0px;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.17);

  @media ${devices.tablet} {
    display: none;
  }
`;

export const InnerWrapper = styled.div`
  display: flex;
  width: 60%;
  flex-direction: column;
  padding-top: 1.5rem;
  padding-bottom: 2rem;
  padding-left: 2rem;
  padding-right: 2rem;
  height: 100%;
  margin-left: auto;
  background-color: white;
`;

export const MobileMenuItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

export const MobileButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;

  @media ${devices.tablet} {
    display: none;
  }
`;
