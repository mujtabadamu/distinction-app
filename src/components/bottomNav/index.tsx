import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Box, Grid, Spacer, Text } from '@flexisaf/flexibull2';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

import {
  selectMostRecentStartedPractice,
  // selectShowContinuePractice,
} from '../../redux/statistics/selectors';
import { selectCurrentUser } from '../../redux/auth/selectors';
// import ContinuePractice from '../continuePractice';

import Theme from '../../utils/theme';
import { setShowContinuePractice } from '../../redux/statistics/reducer';

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
  const dispatch = useDispatch();

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
            dispatch(setShowContinuePractice(false));
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
  const dispatch = useDispatch();
  const location = useLocation();
  const hasChatbot = location.pathname.includes('/chatbot');
  // const showContinuePractice = useSelector(selectShowContinuePractice);

  const mostRecent = useSelector(selectMostRecentStartedPractice);
  const user = useSelector(selectCurrentUser);
  const [active, setActive] = useState<string | null>(null);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const checkMostRecent = useCallback(() => {
    if (mostRecent) {
      dispatch(setShowContinuePractice(true));
    } else {
      dispatch(setShowContinuePractice(false));
    }
  }, [mostRecent]);

  useEffect(() => {
    checkMostRecent();
  }, [mostRecent]);

  useEffect(() => {
    setActive(window.location.pathname.slice(1));
  }, []);

  const socialShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Distinction',
          url: 'https://distinction.app',
          text: `${user?.firstName} is inviting you to check out Distinction, where you can practice for your upcoming exams.`,
        });

        alert('Thanks for sharing');
      } catch (err) {
        alert(`Couldn't share ${err}`);
      }
    } else {
      alert('Social share is not supported on this device.');
    }
  };

  return (
    <>
      <AnimatePresence>
        {showOverlay && (
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="options">
              <motion.div
                className="option"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                onClick={() =>
                  navigate(disabled ? '/quizathon-profile' : '/new-practice')
                }
              >
                <i className="saf-note" style={{ fontSize: '1.2rem' }} />{' '}
                <Text>New Practice</Text>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                className="option"
                onClick={socialShare}
              >
                <i className="saf-share" style={{ fontSize: '1.2rem' }} />{' '}
                <Text>Invite / Share</Text>
              </motion.div>
            </div>
          </Overlay>
        )}
      </AnimatePresence>
      {!hasChatbot && (
        <BottomNavWrapper {...props}>
          {/* {showContinuePractice && <ContinuePractice mostRecent={mostRecent} />} */}

          <Grid sm="1fr 1fr 1fr" gap="0">
            {navItems.map((item, index) => (
              <NavItem
                key={index}
                handleClick={setActive}
                isActive={active === item.name}
                link={item.link}
                icon={item.icon}
                label={item.label}
                name={item.name}
                isPrimaryAction={item.isPrimaryAction}
                setShowOverlay={setShowOverlay}
                showOverlay={showOverlay}
              />
            ))}
          </Grid>
        </BottomNavWrapper>
      )}
    </>
  );
};

export default BottomNav;

const BottomNavWrapper = styled.div`
  position: fixed;
  z-index: 20;
  bottom: 0px;
  left: 0px;
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  & .navItem {
    color: ${Theme.PrimaryGrey} !important;
  }
  & .active {
    color: ${Theme.PrimaryColor} !important;
    font-weight: 600;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 90%;
  background: rgba(0, 0, 0, 0.2);

  & .options {
    display: flex;
    align-items: center;
    position: absolute;
    width: fit-content;
    gap: 1rem;
    top: 92%;
    left: 50%;
    transform: translate(-50%);

    & .option {
      display: flex;
      background-color: white;
      border-radius: 1000px;
      align-items: center;
      width: max-content;
      gap: 10px;
      padding: 10px 15px;
      box-shadow: 1px 6px 15px rgba(0, 0, 0, 0.2);
    }
  }
`;

const PrimaryAction = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 1000px;
  background-color: ${Theme.PrimaryColor};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 26px;
  box-shadow: 1px 6px 15px rgba(38, 73, 157, 0.5);

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    transition: transform 0.3s ease-in-out;
    font-size: 1.1rem;
  }

  .open {
    transform: rotate(45deg);
    font-size: 1.4rem;
  }
`;
