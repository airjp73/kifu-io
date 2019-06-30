import React from 'react';
import styled from 'styled-components';
import { headerHeight, highlight, panelBackground } from 'style';
import FlatButton from './FlatButton';
import { ReactComponent as MenuIcon } from 'svg/menu.svg';

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
      <MenuIcon style={{ height: '2rem', width: '2rem' }} />
    </FlatButton>
    <SiteTitle>Kifu.io</SiteTitle>
    <ChildContainer>{children}</ChildContainer>
  </HeaderContainer>
);

export default Header;
