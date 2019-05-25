import React, { useState } from 'react';
import styled from 'styled-components';
import Header from 'components/Header';
import SlideOutPanel from 'components/SlideOutPanel';
import Sidebar, { SidebarBottomArea } from 'components/Sidebar';
import NavMenu from 'components/NavMenu';
import User from 'components/User';
import PatreonButton from 'components/PatreonButton';
import useCurrentUser from 'hooks/useCurrentUser';
import { portraitMedia, landscapeMedia } from 'style';
import { LandscapeView, PortraitView } from './MediaQueryView';

const Container = styled.div`
  height: 100%;
  display: flex;

  ${portraitMedia} {
    flex-direction: column;
  }
`;

const MainContent = styled.main`
  position: relative;
  flex: 1;
  padding: 1rem;

  ${landscapeMedia} {
    height: 100%;
    display: flex;
  }
`;

const Layout: React.FunctionComponent = ({ children }) => {
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const currentUser = useCurrentUser();

  return (
    <Container>
      <PortraitView>
        <Header onMenuClick={() => setSidePanelOpen(prevOpen => !prevOpen)}>
          Home
        </Header>
      </PortraitView>
      <LandscapeView>
        <Sidebar>
          <NavMenu />
          {currentUser && (
            <SidebarBottomArea>
              <User
                photoURL={currentUser.photoURL}
                displayName={currentUser.displayName}
              />
              <PatreonButton />
            </SidebarBottomArea>
          )}
        </Sidebar>
      </LandscapeView>
      <SlideOutPanel
        active={sidePanelOpen}
        onClose={() => setSidePanelOpen(false)}
        side="left"
      >
        <NavMenu />
      </SlideOutPanel>
      <MainContent>{children}</MainContent>
    </Container>
  );
};

export default Layout;
