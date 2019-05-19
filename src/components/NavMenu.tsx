import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { highlight, panelHighlight } from 'style';

interface NavMenuProps {
  iconOnly?: boolean;
}

interface NavItemProps {
  label: string;
  to: string;
}

const Link = styled(NavLink)`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;

  &.active {
    background-color: ${panelHighlight};
  }
`;

const NavList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

const NavListItem = styled.li`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  :hover {
    background-color: ${panelHighlight};
  }
`;

const NavItemLabel = styled.span`
  margin-right: auto;
`;

const NavSection = styled.section`
  margin: 1rem 0;
`;

const Nav = styled.nav`
  color: ${highlight};
`;

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
      padding: 0 1rem;
      margin: 0;
    `}
  >
    <Link to={to}>{children}</Link>
  </h3>
);

const NavMenu: React.FunctionComponent<NavMenuProps> = () => (
  <Nav data-testid="nav-menu">
    <NavSection>
      <NavHeader to="/home">Go Reviews</NavHeader>
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
