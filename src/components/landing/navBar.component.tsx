import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Hamburger from 'hamburger-react';
import { AnimatePresence } from 'framer-motion';

import useOnClickOutside from '../../hooks/general/useOnClickOutside';

import ContentContainer from './contentContainer';
import { ANIMATE_ONCE } from '../../utils/constants';
import { defaultVariant } from '../../styles/common/animationVariants.motion';
import { selectCurrentUser } from '../../redux/auth/selectors';

import {
  NavBarContainer,
  Logo,
  Navigation,
  NavigationWrapper,
  ButtonsWrapper,
  HamburgerWrapper,
  MobileMenuWrapper,
  InnerWrapper,
  MobileMenuItems,
  MobileButtonWrapper,
} from '../../styles/landing/navBar.style';
import {
  PrimaryButton,
  SecondaryButton,
} from '../../styles/common/buttons.styles';

interface NavLink {
  link: string;
  name: string;
}

interface NavBarProps {
  navLinks: NavLink[];
}

const NavBar = ({ navLinks }: NavBarProps) => {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const [isOpen, setIsOpen] = useState(false);
  const ref = React.createRef<HTMLDivElement>();

  useOnClickOutside(ref, () => setIsOpen(false));

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <ContentContainer>
      <NavBarContainer
        variants={defaultVariant}
        animate="visible"
        initial="hidden"
        viewport={{ once: ANIMATE_ONCE, amount: 'some' }}
        className="w-full flex justify-between items-center py-6"
      >
        <Logo />

        <NavigationWrapper>
          {navLinks.map((link: NavLink) => (
            <>
              <Navigation href={link.link}>{link.name}</Navigation>
            </>
          ))}
        </NavigationWrapper>

        {!user?.id ? (
          <ButtonsWrapper>
            <SecondaryButton onClick={() => navigate('/login')}>
              Sign in
            </SecondaryButton>
            <PrimaryButton onClick={() => navigate('/register')}>
              Create free account
            </PrimaryButton>
          </ButtonsWrapper>
        ) : (
          <ButtonsWrapper>
            <PrimaryButton onClick={() => navigate('/home')}>
              Go to dashboard
            </PrimaryButton>
          </ButtonsWrapper>
        )}

        <HamburgerWrapper>
          <Hamburger size={18} toggled={isOpen} toggle={setIsOpen} />
        </HamburgerWrapper>
      </NavBarContainer>

      {isOpen && (
        <AnimatePresence>
          <MobileMenuWrapper
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <InnerWrapper ref={ref}>
              <div style={{ marginLeft: 'auto' }}>
                <Hamburger size={18} toggled={isOpen} toggle={setIsOpen} />
              </div>
              <MobileMenuItems>
                {navLinks.map((link: NavLink) => (
                  <React.Fragment key={link.link}>
                    <Navigation href={link.link}>{link.name}</Navigation>
                  </React.Fragment>
                ))}
              </MobileMenuItems>
              {!user?.id ? (
                <MobileButtonWrapper>
                  <PrimaryButton onClick={() => navigate('/register')}>
                    Create free account
                  </PrimaryButton>
                  <SecondaryButton onClick={() => navigate('/login')}>
                    Sign in
                  </SecondaryButton>
                </MobileButtonWrapper>
              ) : (
                <MobileButtonWrapper>
                  <PrimaryButton onClick={() => navigate('/home')}>
                    Go to dashboard
                  </PrimaryButton>
                </MobileButtonWrapper>
              )}
            </InnerWrapper>
          </MobileMenuWrapper>
        </AnimatePresence>
      )}
    </ContentContainer>
  );
};

export default NavBar;
