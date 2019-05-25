import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import 'styled-components/macro';
import { highlight, panelHighlight } from 'style';

interface NavItemProps {
  label: string;
  to: string;
}

const Link = styled(NavLink)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem 1rem;
  cursor: pointer;
  color: ${highlight};
  text-decoration: none;

  &.active {
    background-color: ${panelHighlight};
  }

  :hover {
    background-color: ${panelHighlight};
  }
`;

const NavList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

const NavListItem = styled.li`
  font-size: 1rem;
`;

const NavItemLabel = styled.span`
  margin-right: auto;
`;

const NavSection = styled.section`
  margin: 1rem 0;
`;

const Nav = styled.nav``;

const NavItem: React.FunctionComponent<NavItemProps> = ({ label, to }) => (
  <NavListItem>
    <Link to={to} activeClassName="active">
      <NavItemLabel>{label}</NavItemLabel>
    </Link>
  </NavListItem>
);

interface NavHeaderProps {
  to: string;
}
const NavHeader: React.FunctionComponent<NavHeaderProps> = ({
  children,
  to,
}) => (
  <h3
    css={`
      margin: 0;
    `}
  >
    <Link to={to} isActive={() => false}>
      {children}
    </Link>
  </h3>
);

const NavMenu: React.FunctionComponent = ({ children }) => (
  <Nav data-testid="nav-menu">
    <NavSection>
      <NavHeader to="/">Go Reviews</NavHeader>
    </NavSection>
    <NavSection>
      <NavList>
        <NavItem label="Log In" to="/login" />
        <NavItem label="View Sample" to="/view" />
      </NavList>
    </NavSection>
  </Nav>
);

export default NavMenu;
