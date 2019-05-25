import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import 'styled-components/macro';
import FontIcon from 'components/FontIcon';
import User from 'components/User';
import PatreonButton from 'components/PatreonButton';
import useCurrentUser from 'hooks/useCurrentUser';
import { highlight, panelHighlight } from 'style';

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

const NavBottomSection = styled.section`
  margin: auto 0.5rem 1rem 0.5rem;
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

const NavMenu: React.FunctionComponent = ({ children }) => {
  const [currentUser] = useCurrentUser();

  return (
    <Nav data-testid="nav-menu">
      <h3>Go Reviews</h3>
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
        <NavItem icon="android" label="Log In" to="/login" />
        <NavItem icon="android" label="View Sample" to="/view" />
      </NavList>
      <NavBottomSection>
        <PatreonButton />
      </NavBottomSection>
    </Nav>
  );
};

export default NavMenu;
