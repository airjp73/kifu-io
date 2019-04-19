import React from 'react';
import styled from 'styled-components';
import { headerHeight, highlight, panelBackground } from 'style';
import FontIcon from './FontIcon';
import FlatButton from './FlatButton';

interface HeaderProps {
  onMenuClick: () => void;
  className?: string;
}

const HeaderContainer = styled.header`
  background-color: ${panelBackground};
  padding-left: 0.5rem;
  padding-right: 1rem;
  height: ${headerHeight};
  box-sizing: border-box;

  position: sticky;
  top: 0;
  left: 0;
  right: 0;

  display: flex;
  color: ${highlight};
  font-size: 1.5rem;
  align-items: center;
  z-index: 1;

  strong {
    display: flex;
    align-items: center;
  }
`;

const SiteTitle = styled.span`
  margin-left: 0.5rem;
`;

const ChildContainer = styled.div`
  margin-left: auto;
`;

const Header: React.FunctionComponent<HeaderProps> = ({
  children,
  className,
  onMenuClick,
}) => (
  <HeaderContainer className={className}>
    <FlatButton onClick={onMenuClick}>
      <FontIcon icon="menu" />
    </FlatButton>
    <SiteTitle>Go Reviews</SiteTitle>
    <ChildContainer>{children}</ChildContainer>
  </HeaderContainer>
);

export default Header;
