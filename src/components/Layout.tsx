import React, { useState } from 'react';
import styled from 'styled-components';
import Header from 'components/Header';
import SlideOutPanel from 'components/SlideOutPanel';
import Sidebar from 'components/Sidebar';
import NavMenu from 'components/NavMenu';
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

  ${landscapeMedia} {
    padding: 1rem;
    height: 100%;
    display: flex;
  }
`;

const Layout: React.FunctionComponent = ({ children }) => {
  const [sidePanelOpen, setSidePanelOpen] = useState(false);

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
