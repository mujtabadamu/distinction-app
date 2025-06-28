import { Box, Text, Spacer, Button } from '@flexisaf/flexibull2';
import { BsInstagram, BsTwitterX } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';
import styled from 'styled-components';
import { Webinar } from './webinars';
import React from 'react';
import moment from 'moment';
import { DISTINCTION_RESOURCE_BASE_URL } from 'utils/constants';

export const WebinarCard: React.FC<Webinar> = ({
  title,
  speaker,
  date,
  registerUrl,
  time,
  youtubeRedirect,
  speakerImage,
  speakerTeam,
}) => {
  const active = new Date(date) > new Date();
  return (
    <CardContainer className="shadow-md relative">
      <div className="absolute bg-[#FFCB66] uppercase p-3 rounded-l-md font-bold top-[-20px]  right-0">
        {active ? 'Upcoming' : 'Past'}
      </div>
      <ImageBg>
        <Spacer space="20" />

        <p className="flex items-center gap-1">
          <img className="w-[18px] h-[18px]" src="./favicon.svg" />
          <span className="text-[18px] font-bold text-white">Distinction</span>
        </p>
        <Spacer space="5" />

        <Box>
          <Text block bold className="text-[18px] text-white">
            {title}
          </Text>
          <Spacer space="10" />
        </Box>

        <Spacer space="10" />

        <div>
          <Text block bold color="white">
            {moment(date).format('Do MMM, YYYY')}
          </Text>
          <Spacer space="10" />
          <Text bold block color="white">
            {moment(time, 'HH:mm:ss.SSS').format('hh:mm A')}
          </Text>
        </div>
      </ImageBg>

      <div className="flex relative h-[120px]">
        <Box className="flex flex-col !p-4 ">
          <Text className="text-xl " block bold color="white">
            {speaker}
          </Text>
          <Spacer space="3" />
          <Text bold block color="#FFC96B">
            {speakerTeam}
          </Text>
          <Box className="flex gap-1 !my-2">
            <a
              href={'https://x.com/FlexiSAF'}
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsTwitterX color="#fff" />
            </a>
            <a
              href={'https://facebook.com/share/15BZam81t'}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook color="#fff" />
            </a>
            <a
              href={'https://instagram.com/flexisaf'}
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsInstagram color="#fff" />
            </a>
            <Text bold block color="#FFC96B">
              @flexisaf
            </Text>
          </Box>
        </Box>
        <div className="">
          <img
            src={`${DISTINCTION_RESOURCE_BASE_URL}${speakerImage?.url}`}
            className="h-[130px] w-[130px] md:w-[180px] md:h-[180px] rounded-full absolute top-[-80px] right-2"
          />
        </div>
      </div>
      <Box className=" absolute bottom-0 left-0 right-0">
        <Text color="white" block className="text-center my-1">
          CLICK THE BUTTON BELOW TO {active ? 'REGISTER' : 'VIEW RECORDING'}
        </Text>
        <Box className=" text-center rounded-b" pad="10px">
          {active ? (
            <Button
              block
              pale
              style={{ background: '#fff' }}
              onClick={() =>
                registerUrl &&
                window.open(
                  registerUrl.startsWith('http')
                    ? registerUrl
                    : `https://${registerUrl}`,
                  '_blank'
                )
              }
            >
              Register
            </Button>
          ) : (
            <Button
              block
              onClick={() =>
                youtubeRedirect &&
                window.open(
                  youtubeRedirect.startsWith('http')
                    ? youtubeRedirect
                    : `https://${youtubeRedirect}`,
                  '_blank'
                )
              }
            >
              View Recording
            </Button>
          )}
        </Box>
      </Box>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  max-width: 390px;
  background: #2e4797;
  border-radius: 16px;
  height: 420px;
`;
const ImageBg = styled.div`
  background-image: url('./Webiner.svg');
  background-position: bottom 0px right 0px;
  background-repeat: no-repeat;
  height: 50%;
  width: 100%;
  padding: 15px;
  border-radius: 10px;
  z-index: 2;
`;
