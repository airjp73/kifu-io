import React from 'react';
import Link from 'next/link';
import { withRouter, WithRouterProps } from 'next/router';
import styled from 'styled-components';
import { highlight, panelHighlight } from 'style';

interface NavMenuProps {
  iconOnly?: boolean;
}

interface NavItemProps {
  label: string;
  href: string;
}

const NavLink = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

const NavList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

const NavListItem = styled.li<{ active: boolean }>`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  :hover {
    background-color: ${panelHighlight};
  }
  ${props => props.active && `background-color: ${panelHighlight};`}
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

const NavItem: React.FunctionComponent<NavItemProps & WithRouterProps> = ({
  label,
  href,
  router,
}) => (
  <NavListItem active={router.pathname === href}>
    <Link href={href}>
      <NavLink>
        <NavItemLabel>{label}</NavItemLabel>
      </NavLink>
    </Link>
  </NavListItem>
);
const NavItemWithRouter = withRouter(NavItem);

interface NavHeaderProps {
  href: string;
}
const NavHeader: React.FunctionComponent<NavHeaderProps> = ({
  children,
  href,
}) => (
  <h3
    css={`
      padding: 0 1rem;
      margin: 0;
    `}
  >
    <Link href={href}>
      <NavLink>{children}</NavLink>
    </Link>
  </h3>
);

const NavMenu: React.FunctionComponent<NavMenuProps> = () => (
  <Nav data-testid="nav-menu">
    <NavSection>
      <NavHeader href="/home">Go Reviews</NavHeader>
    </NavSection>
    <NavSection>
      <NavList>
        <NavItemWithRouter label="Log In" href="/login" />
        <NavItemWithRouter label="View Sample" href="/view" />
      </NavList>
    </NavSection>
  </Nav>
);

export default NavMenu;
