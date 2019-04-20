import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Header from 'components/Header';
import SlideOutPanel from 'components/SlideOutPanel';
import Sidebar from 'components/Sidebar';
import NavMenu from 'components/NavMenu';
import { headerHeight, darkFaded, smallMedia, largeMedia } from 'style';

const GlobalStyles = createGlobalStyle`
  html, body {
    height: 100%;
    overflow: hidden;
    background-color: ${darkFaded};

    #__next {
      height: 100%;
    }
  }
`;

const MainContent = styled.main`
  position: relative;

  ${smallMedia} {
    height: calc(100% - ${headerHeight});
  }

  ${largeMedia} {
    height: 100%;
    display: flex;
    margin-left: ${headerHeight};
  }
`;

const MobileHeader = styled(Header)`
  ${largeMedia} {
    display: none;
  }
`;

const DesktopSidebar = styled(Sidebar)`
  position: absolute;
  ${smallMedia} {
    display: none;
  }
`;

const Layout: React.FunctionComponent = ({ children }) => {
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  return (
    <>
      <GlobalStyles />
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
    </>
  );
};

export default Layout;
