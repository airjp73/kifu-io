import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { highlight, panelHighlight } from 'style';
import FontIcon from './FontIcon';

interface NavItemProps {
  icon: string;
  label: string;
  href: string;
}

const NavLink = styled.a`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  cursor: pointer;
`;

const NavListItem = styled.li`
  padding: 0.5rem 1rem;
  :hover {
    background-color: ${panelHighlight};
  }
`;

const Nav = styled.nav`
  color: ${highlight};

  h3 {
    padding: 0 1rem;
  }

  ul {
    padding: 0;
  }
`;

const NavItem: React.FunctionComponent<NavItemProps> = ({
  icon,
  label,
  href,
}) => (
  <NavListItem>
    <Link href={href}>
      <NavLink>
        <FontIcon
          css={`
            margin-right: 1rem;
          `}
          icon={icon}
        />
        {label}
      </NavLink>
    </Link>
  </NavListItem>
);

const NavMenu = () => (
  <Nav data-testid="nav-menu">
    <h3>Go Reviews</h3>
    <ul css="list-style: none;">
      <NavItem icon="search" label="Browse Reviews" href="/browse" />
      <NavItem icon="create" label="Review a Game" href="/review" />
      <NavItem icon="cloud_upload" label="Request a Review" href="/request" />
    </ul>
  </Nav>
);

export default NavMenu;
