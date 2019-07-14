import React from 'react';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import 'styled-components/macro';
import { GitHub, LogIn, LogOut, UploadCloud } from 'react-feather';
import User from 'components/User';
import useCurrentUser from 'hooks/useCurrentUser';
import { highlight, panelHighlight, smallLandscapeMedia } from 'style';
import LogoutButton from './LogoutButton';
import GoIcon from './GoIcon';
import MediaQueryView, { PortraitView, LandscapeView } from './MediaQueryView';

interface NavItemProps {
  label: string;
  to: string;
  icon: React.ReactElement;
  isExternal?: boolean;
}

const linkStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
  color: ${highlight};
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;

  &.active {
    background-color: ${panelHighlight};
  }

  :hover {
    background-color: ${panelHighlight};
  }

  > svg {
    flex-shrink: 0;
  }
`;

const NavList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

const NavItemLabel = styled.span`
  margin-right: auto;
  padding: 0 0.5rem;
`;

const NavListItem = styled.li`
  font-size: 1rem;

  svg {
    padding: 0 0.25rem;
  }

  ${smallLandscapeMedia} {
    ${NavItemLabel} {
      display: none;
    }
  }
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
  isExternal,
}) => {
  const linkContent = (
    <>
      {icon}
      <NavItemLabel>{label}</NavItemLabel>
    </>
  );
  return (
    <NavListItem>
      {isExternal ? (
        <a css={linkStyle} href={to}>
          {linkContent}
        </a>
      ) : (
        <NavLink css={linkStyle} to={to} activeClassName="active">
          {linkContent}
        </NavLink>
      )}
    </NavListItem>
  );
};

const NavMenu: React.FunctionComponent = () => {
  const [currentUser, isLoaded] = useCurrentUser();

  return (
    <Nav data-testid="nav-menu">
      <LandscapeView>
        <MediaQueryView minWidth={1000}>
          <h3>Kifu.io</h3>
        </MediaQueryView>
        <MediaQueryView maxWidth={1000}>
          <h4>Kifu</h4>
        </MediaQueryView>
      </LandscapeView>
      <PortraitView>
        <h3>Kifu.io</h3>
      </PortraitView>

      {currentUser && (
        <NavUser>
          <NavLink css={linkStyle} to={`/profile`}>
            <User
              photoURL={currentUser.photoURL}
              displayName={currentUser.displayName}
            />
          </NavLink>
        </NavUser>
      )}
      <NavList>
        {!currentUser && isLoaded && (
          <NavItem icon={<LogIn />} label="Log In" to="/login" />
        )}
        <NavItem icon={<UploadCloud />} label="Upload SGF" to="/upload" />
        <NavItem
          icon={<GoIcon height="25px" width="25px" />}
          label="Start Playing"
          to="/start-playing"
        />
        <NavItem
          icon={<GitHub height="25px" width="25px" />}
          label="Github"
          to="http://www.github.com/airjp73/kifu-io"
          isExternal
        />
      </NavList>

      {currentUser && (
        <LogoutButton
          leftIcon={<LogOut />}
          css={css`
            margin-top: auto;
          `}
        />
      )}
    </Nav>
  );
};

export default NavMenu;
