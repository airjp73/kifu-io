import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import 'styled-components/macro';
import User from 'components/User';
import PatreonButton from 'components/PatreonButton';
import useCurrentUser from 'hooks/useCurrentUser';
import { highlight, panelHighlight } from 'style';

interface NavItemProps {
  label: string;
  to: string;
}

const Link = styled(NavLink)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem;
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
  padding: 0 1rem;
`;

const NavUser = styled.div`
  margin: 1rem 0;
`;

const NavBottomSection = styled.section`
  margin: auto 0.5rem 1rem 0.5rem;
`;

const Nav = styled.nav`
  height: 100%;
  display: flex;
  flex-direction: column;
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
  <Link to={to} isActive={() => false}>
    <h3
      css={`
        margin: 0;
        padding: 0.5rem 0;
      `}
    >
      {children}
    </h3>
  </Link>
);

const NavMenu: React.FunctionComponent = ({ children }) => {
  const currentUser = useCurrentUser();

  return (
    <Nav data-testid="nav-menu">
      <NavHeader to="/">Go Reviews</NavHeader>
      <NavList>
        <NavItem label="Log In" to="/login" />
        <NavItem label="View Sample" to="/view" />
      </NavList>
      {currentUser && (
        <NavUser>
          <Link to={`/profile/${currentUser.uid}`}>
            <User
              photoURL={currentUser.photoURL}
              displayName={currentUser.displayName}
            />
          </Link>
        </NavUser>
      )}
      <NavBottomSection>
        <PatreonButton />
      </NavBottomSection>
    </Nav>
  );
};

export default NavMenu;
