import React from 'react';
import { Box, Spacer, Text } from '@flexisaf/flexibull2';
import styled from 'styled-components';

interface InfoBubbleProps {
  bgColor: string;
  margin?: string;
}

interface InfoBannerProps {
  bgColor: string;
  icon?: string;
  infoTitle?: string;
  infoText: React.ReactNode;
  style?: React.CSSProperties;
  action?: React.ReactNode;
}

const InfoBanner = ({
  bgColor,
  icon,
  infoTitle,
  infoText,
  style,
  action,
}: InfoBannerProps) => {
  return (
    <InfoBubble bgColor={bgColor} margin="0 0 20px 0" style={style}>
      <Box display="flex" style={{ alignItems: 'center', width: '100%' }}>
        <Box>
          <Text size="24px">
            <i className={icon} />
          </Text>
        </Box>
        <Box className="!w-full" margin="0 0 0 8px">
          <Text block size="1rem" style={{ fontWeight: '700' }}>
            {infoTitle}
          </Text>
          <Spacer space={5} />
          <Text style={{ fontWeight: '400' }}>{infoText}</Text>
          {action && (
            <Box>
              <Spacer space={8} />
              {action}
            </Box>
          )}
        </Box>
      </Box>
    </InfoBubble>
  );
};

export default InfoBanner;

const InfoBubble = styled.div<InfoBubbleProps>`
  border-radius: 8px;
  background-color: ${(props) => props.bgColor};
  padding: 20px 12px;
  display: flex;
  justify-content: space-between;
  margin: ${(props) => props.margin};
`;
