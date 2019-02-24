import React from 'react';
import styled from 'styled-components';
import { highlight, panelBackground } from 'style';
import FontIcon from './FontIcon';
import FlatButton from './FlatButton';

interface HeaderProps {
  onMenuClick: () => void;
}

const HeaderContainer = styled.header`
  background-color: ${panelBackground};
  padding: .5rem 2rem .5rem 1.5rem;

  position: sticky;
  top: 0;
  left: 0;
  right: 0;

  display: flex;
  color: ${highlight};
  font-size: 3rem;
  align-items: center;

  strong {
    display: flex;
    align-items: center;
  }
`;

const MenuIcon = styled(FontIcon)`
  font-size: 4rem;
`;

const SiteTitle = styled.span`
  margin-left: .5rem;
`;

const ChildContainer = styled.div`
  margin-left: auto;
`;

const Header: React.FunctionComponent<HeaderProps> = ({ children, onMenuClick }) => (
  <HeaderContainer>
    <FlatButton onClick={onMenuClick}>
      <MenuIcon icon="menu" />
    </FlatButton>
    <SiteTitle>Go Reviews</SiteTitle>
    <ChildContainer>{children}</ChildContainer>
  </HeaderContainer>
);

export default Header;
