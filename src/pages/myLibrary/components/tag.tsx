import React from 'react';
import styled from 'styled-components';
import { capitalizeFirstLetter } from 'utils/helpers';
import Theme from 'utils/theme';

interface TagProps {
  isActive?: boolean;
  title?: string;
  onClick?: () => void;
}

const Tag = ({ title = '', onClick, isActive }: TagProps) => {
  return (
    <TagBox isActive={isActive} onClick={onClick}>
      {capitalizeFirstLetter(title)}
    </TagBox>
  );
};

export default Tag;

const TagBox = styled.div<TagProps>`
  display: flex;
  width: 90px;
  padding: 8px 16px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  border-radius: 30px;
  border: 1px solid ${Theme.PrimaryBorderColor};
  background: ${(props) => (props.isActive ? '#000' : 'transparent')};
  color: ${(props) => (props.isActive ? '#FFFFFF' : Theme.PrimaryFontColor)};
  transition: 0.2s ease-in-out;
  &:hover {
    background: ${(props) => (props.isActive ? '#000' : '#FFF')};
  }
`;
