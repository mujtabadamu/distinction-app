import React from 'react';

interface TooltipProps {
  box: string | React.ReactNode;
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ children, box }) => {
  return (
    <Container>
      {children}

      <div className="box">{box}</div>
    </Container>
  );
};

import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  display: inline-block;
  .box {
    position: absolute;
    top: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%);
    background: black;
    padding: 8px;
    color: #fff;
    line-height: 1.7;
    text-align: center;
    opacity: 0;
    visibility: hidden;
    max-height: 0px;
    width: 100%;
    transition: 0.4s ease all;

    &::before {
      content: '';
      position: absolute;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-bottom: 6px solid black;
      width: 0;
      height: 0;
      top: -6px;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover .box {
    opacity: 1;
    visibility: visible;
    max-height: 200px;
  }
`;
