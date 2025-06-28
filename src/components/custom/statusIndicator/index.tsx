import React from 'react';
import styled from 'styled-components';
import Theme from '../../../utils/theme';

const StatusWrapper = styled.div`
  display: inline-flex;
  align-items: center;

  & .indicator {
    height: 0.425rem;
    width: 0.425rem;
    margin: 0.275rem;
    border-radius: 0.4125rem;
    background-color: ${(props) =>
      props.color ? props.color : Theme.PrimaryGrey};
  }
  & .label {
    padding-right: 0.75rem;
    padding-left: 0.125rem;
    color: ${Theme.PrimaryFontColor};
    text-transform: capitalize;
  }
`;

const StatusIndicator = (
  props: JSX.IntrinsicAttributes & { label: string }
) => {
  return (
    <StatusWrapper {...props}>
      <span className="indicator" />
      <span className="label">{props.label}</span>
    </StatusWrapper>
  );
};

export default StatusIndicator;
