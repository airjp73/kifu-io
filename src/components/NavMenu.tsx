import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { highlight, panelHighlight } from 'style';
import FontIcon from './FontIcon';

interface NavMenuProps {
  iconOnly?: boolean;
}

interface NavItemProps {
  icon: string;
  iconOnly?: boolean;
  label: string;
  href: string;
}

const NavLink = styled.a`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-around;
  cursor: pointer;
`;

const NavListItem = styled.li`
  padding: 0.5rem 1rem;
  :hover {
    background-color: ${panelHighlight};
  }
  font-size: 1rem;
`;

const NavItemLabel = styled.span`
  margin-left: 1rem;
  margin-right: auto;
`;

const Nav = styled.nav`
  color: ${highlight};

  section {
    padding: 1rem 0;
  }

  h3 {
    padding: 0 1rem;
    margin: 0;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
`;

const NavItem: React.FunctionComponent<NavItemProps> = ({
  icon,
  label,
  href,
  iconOnly,
}) => (
  <NavListItem>
    <Link href={href}>
      <NavLink>
        <FontIcon size="SMALL" icon={icon} />
        {!iconOnly && <NavItemLabel>{label}</NavItemLabel>}
      </NavLink>
    </Link>
  </NavListItem>
);

interface HeaderLinkProps {
  href: string;
}
const HeaderLink: React.FunctionComponent<HeaderLinkProps> = ({
  children,
  href,
}) => (
  <h3>
    <Link href={href}>
      <NavLink>{children}</NavLink>
    </Link>
  </h3>
);

const NavMenu: React.FunctionComponent<NavMenuProps> = ({ iconOnly }) => (
  <Nav data-testid="nav-menu">
    <section>
      <HeaderLink href="/home">{iconOnly ? 'GR' : 'Go Reviews'}</HeaderLink>
    </section>
    <section>
      <ul>
        <NavItem
          icon="android"
          label="View Sample Sgf"
          href="/view"
          iconOnly={iconOnly}
        />
        <NavItem
          icon="search"
          label="Browse Reviews"
          href="/browse"
          iconOnly={iconOnly}
        />
        <NavItem
          icon="create"
          label="Review a Game"
          href="/review"
          iconOnly={iconOnly}
        />
        <NavItem
          icon="cloud_upload"
          label="Request a Review"
          href="/request"
          iconOnly={iconOnly}
        />
      </ul>
    </section>
  </Nav>
);

export default NavMenu;
