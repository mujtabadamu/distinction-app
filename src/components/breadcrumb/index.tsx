import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Theme from 'utils/theme';

const BreadCrumbWrapper = styled.div`
  margin-bottom: 20px;
`;

interface LinkItem {
  text: string;
  path?: string;
  onClick?: () => void;
}

interface BreadCrumbsProps {
  links: LinkItem[];
  last: string;
}

const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ links, last }) => (
  <BreadCrumbWrapper>
    {links.map((link) => (
      <span style={{ color: '#2E4898', fontWeight: '600' }} key={link.text}>
        <i className="saf-arrow-left-2" />
        {link.onClick ? (
          <span
            onClick={link.onClick}
            style={{ color: '#2E4898', cursor: 'pointer', fontWeight: '600' }}
          >
            {link.text}
          </span>
        ) : link.path ? (
          <Link to={link.path} style={{ color: '#2E4898', fontWeight: '600' }}>
            {link.text}
          </Link>
        ) : (
          <span style={{ color: '#2E4898' }}>{link.text}</span>
        )}
      </span>
    ))}
    <span style={{ color: Theme.PrimaryGrey }}>{` / ${last}`}</span>
  </BreadCrumbWrapper>
);

export default BreadCrumbs;
