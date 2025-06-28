import React from 'react';
import { EmptyState } from '@flexisaf/flexibull2';
import { useNavigate } from 'react-router-dom';
import { Button } from '@flexisaf/flexibull2';
import styled from 'styled-components';
import devices from '../../utils/devices';

interface INotfound {
  title: string;
  info: string;
  link: string;
  buttonText?: string;
  height?: string;
  width?: string;
}

const NotFound = ({
  title,
  info,
  link,
  buttonText,
  height,
  width,
}: INotfound) => {
  const navigate = useNavigate();
  return (
    <NotFoundWrapper height={height || '100vh'} width={width || '100vw'}>
      <EmptyState
        type="customers"
        title={title || 'Page not found'}
        info={info || 'Uh oh, you might be lost'}
        className="content"
        action={
          link ? (
            <Button onClick={() => navigate(`/${link}`)}>
              {buttonText || `Return to ${link}`}
            </Button>
          ) : (
            <Button onClick={() => navigate('/')}>Return to home</Button>
          )
        }
      />
    </NotFoundWrapper>
  );
};

export default NotFound;

const NotFoundWrapper = styled.div<{ width: string; height: string }>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  & .content {
    width: 70% !important;

    @media ${devices.laptop} {
      width: 400px;
    }
  }
`;
