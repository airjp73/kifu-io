import React, { useState } from 'react';
import styled from 'styled-components';
import Header from 'components/Header';
import SlideOutPanel from 'components/SlideOutPanel';
import Sidebar from 'components/Sidebar';
import NavMenu from 'components/NavMenu';
import { headerHeight, portraitMedia, landscapeMedia } from 'style';

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
    height: 100%;
    display: flex;
  }
`;

const MobileHeader = styled(Header)`
  ${landscapeMedia} {
    display: none;
  }
`;

const DesktopSidebar = styled(Sidebar)`
  ${portraitMedia} {
    display: none;
  }
`;

const Layout: React.FunctionComponent = ({ children }) => {
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  return (
    <Container>
      <MobileHeader onMenuClick={() => setSidePanelOpen(prevOpen => !prevOpen)}>
        Home
      </MobileHeader>
      <DesktopSidebar>
        <NavMenu iconOnly />
      </DesktopSidebar>
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
