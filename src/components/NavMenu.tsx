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

const NavMenu: React.FunctionComponent<NavMenuProps> = ({ iconOnly }) => (
  <Nav data-testid="nav-menu">
    <section>{iconOnly ? <h3>GR</h3> : <h3>Go Reviews</h3>}</section>
    <section>
      <ul>
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
