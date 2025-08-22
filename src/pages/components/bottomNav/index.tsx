import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Box, Grid, Spacer, Text } from '@flexisaf/flexibull2';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

// import ContinuePractice from '../continuePractice';

import Theme from '../../utils/theme';
import { setShowContinuePractice } from '../../store/statisticsSlice';
import { useAuthSlice } from 'pages/auth/authSlice';
import useRecentPracticesQuery, {
  IRecentPractice,
} from '../../hooks/practice/useRecentPracticesQuery';

export interface INavItem {
  link: string;
  icon: string;
  label: string;
  name: string;
  isPrimaryAction?: boolean;
}

export interface INavItemComponent extends INavItem {
  isActive: boolean;
  handleClick: Dispatch<SetStateAction<string | null>>;
  setShowOverlay: Dispatch<SetStateAction<boolean>>;
  showOverlay: boolean;
}

const NavItem = ({
  link,
  icon,
  label,
  handleClick,
  isActive,
  name,
  isPrimaryAction,
  setShowOverlay,
  showOverlay,
}: INavItemComponent) => {
  const navigate = useNavigate();

  if (isPrimaryAction)
    return (
      <Box
        vAlign
        height="100%"
        background="#fff"
        align="center"
        pad="15px 0"
        style={{ justifyContent: 'center' }}
      >
        <PrimaryAction
          onClick={() => {
            setShowContinuePractice(false);
            setShowOverlay((prev) => !prev);
          }}
        >
          <div className={`icon ${showOverlay ? 'open' : ''}`}>
            <FaPlus />
          </div>
        </PrimaryAction>
      </Box>
    );

  return (
    <Box
      vAlign
      height="100%"
      background="#fff"
      align="center"
      style={{ justifyContent: 'center' }}
      onClick={useCallback(() => handleClick(name), [name])}
      className={`navItem ${isActive ? 'active' : ''}`}
    >
      <Box onClick={() => navigate(`${link}`)}>
        <Text size="22px">
          <i className={icon} />
        </Text>
        <Spacer space={5} />
        <Text block size="11px">
          {label}
        </Text>
      </Box>
    </Box>
  );
};

const BottomNav = ({
  navItems,
  disabled,
  ...props
}: {
  navItems: INavItem[];
  disabled: boolean;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const hasChatbot = location.pathname.includes('/chatbot');

  // Use RTK Query hook for recent practices
  const { recentPractices } = useRecentPracticesQuery();
  const { user } = useAuthSlice();
  const [active, setActive] = useState<string | null>(null);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  // Find the most recent started practice from RTK Query data
  const mostRecent =
    recentPractices?.find((p: IRecentPractice) => p.status === 'STARTED') ||
    null;

  const checkMostRecent = useCallback(() => {
    if (mostRecent) {
      setShowContinuePractice(true);
    } else {
      setShowContinuePractice(false);
    }
  }, [mostRecent]);
};
