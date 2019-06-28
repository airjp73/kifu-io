import React from 'react';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import 'styled-components/macro';
import ConstructionBanner from 'components/ConstructionBanner';
import FontIcon from 'components/FontIcon';
import User from 'components/User';
import useCurrentUser from 'hooks/useCurrentUser';
import { highlight, panelHighlight } from 'style';
import LogoutButton from './LogoutButton';

interface NavItemProps {
  label: string;
  to: string;
  icon: string;
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
  padding: 0 0.5rem;
`;

const NavUser = styled.div`
  margin: 0.5rem 0;
`;

const Nav = styled.nav`
  height: 100%;
  display: flex;
  flex-direction: column;

  h4,
  h3 {
    margin: 0.5rem;
  }
`;

const NavItem: React.FunctionComponent<NavItemProps> = ({
  label,
  to,
  icon,
}) => (
  <NavListItem>
    <Link to={to} activeClassName="active">
      <FontIcon
        css={`
          width: 2rem;
          text-align: center;
        `}
        icon={icon}
        size="SMALL"
      />
      <NavItemLabel>{label}</NavItemLabel>
    </Link>
  </NavListItem>
);

const NavMenu: React.FunctionComponent = () => {
  const [currentUser, isLoaded] = useCurrentUser();

  return (
    <Nav data-testid="nav-menu">
      <h3>Kifu.io</h3>
      <ConstructionBanner />
      {currentUser && (
        <NavUser>
          <Link to={`/profile`}>
            <User
              photoURL={currentUser.photoURL}
              displayName={currentUser.displayName}
            />
          </Link>
        </NavUser>
      )}
      <NavList>
        {!currentUser && isLoaded && (
          <NavItem icon="account_circle" label="Log In" to="/login" />
        )}
        <NavItem icon="cloud_upload" label="Upload SGF" to="/upload" />
      </NavList>

      {currentUser && (
        <LogoutButton
          leftIcon="exit_to_app"
          css={css`
            margin-top: auto;
          `}
        />
      )}
    </Nav>
  );
};

export default NavMenu;
