import React from 'react';
import { Box } from '@flexisaf/flexibull2';
import NotificationBg from '../../../assets/images/notificationBg.svg';
import styled from 'styled-components';
import PhoneSvg from '../../../assets/images/iphoneWriteUp.svg';
import PhoneWriteUpDesktop from '../../../assets/images/PhoneWriteUpDesktop.svg';
import { FaArrowRight } from 'react-icons/fa';
import { SimpleQuizathonView } from 'generated/index';
import { motion } from 'framer-motion';
import { formatPrizeOneAlphabet } from 'utils/quizathon';
import { useNavigate } from 'react-router-dom';

interface Props {
  quizathon: SimpleQuizathonView[] | undefined;
  isLoadingActiveQuizathon: boolean;
}

const NotificationCard = ({ quizathon }: Props) => {
  const badgeVariants = {
    pulse: {
      backgroundColor: ['#F9D07F', '#F7D79A', '#F8DFAE', '#F9D07F'],
      transition: { duration: 2, repeat: Infinity, repeatType: 'mirror' },
    },
  };
  const navigate = useNavigate();
  const currentQuizathon = quizathon && quizathon[quizathon?.length - 1];

  return (
    <Content>
      <NotificationBanner>
        <Box className="w-[60%]">
          <motion.div
            variants={badgeVariants as any}
            animate="pulse"
            className="w-[170px] md:w-[200px] rounded-[4px] flex gap-2 items-center justify-center !p-1"
          >
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </div>
            <span className="text-[#151515] text-[11px] md:text-sm font-bold">
              {currentQuizathon?.title ?? 'QUIZATHON 3.0 IS LIVE'}
            </span>
          </motion.div>

          <h2 className="font-medium text-[1rem] md:text-lg leading-[18px] text-[#FFFFFF] my-3">
            Show Up, Unleash Your Genius, Grab the Prize!
          </h2>
          <button
            onClick={() =>
              navigate(`/quizathon-profile/${currentQuizathon?.id}`)
            }
            className="!bg-[#fff] !text-[#1F3BAD] max-w-[280px] text-[11px] md:text-[0.9rem] flex items-center justify-around font-medium p-2 gap-2 rounded-md w-[190px] md:w-full"
          >
            Register and Win{' '}
            {typeof currentQuizathon?.price === 'number' &&
            !Number.isNaN(currentQuizathon.price)
              ? formatPrizeOneAlphabet(currentQuizathon.price)
              : ''}{' '}
            Now!
            <FaArrowRight />
          </button>
        </Box>

        <Box className="absolute top-[99%] -translate-y-1/2 right-[10px] md:hidden">
          <img
            src={PhoneSvg}
            alt="phone"
            className="h-auto max-h-[204px] w-auto max-w-[40vw] object-cover"
            style={{
              clipPath: 'inset(0 0% 50% 0)',
            }}
          />
        </Box>

        <Box className="hidden md:block !mb-[-20px]">
          <img
            src={PhoneWriteUpDesktop}
            alt="phone"
            className="h-full w-auto max-h-[435px] max-w-[356px] object-contain"
          />
        </Box>
      </NotificationBanner>
    </Content>
  );
};

export default NotificationCard;

const NotificationBanner = styled.div`
  color: #000;
  background: url(${NotificationBg}) center/cover no-repeat;
  padding: 10px;
  margin: 20px 0;
  width: 100%;
  position: relative;
  line-height: 1.8;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: 4px;
  @media (min-width: 900px) {
    padding: 1.3rem 10rem;
    justify-content: space-around;
  }
`;

const Content = styled.div`
  position: relative;
`;
