import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Header from 'components/Header';
import SlideOutPanel from 'components/SlideOutPanel';
import NavMenu from 'components/NavMenu';
import { headerHeight } from 'style';

const GlobalStyles = createGlobalStyle`
  html, body {
    height: 100%;

    #__next {
      height: 100%;
    }
  }
`;

// TODO: Add styles for larger screens
const MainContent = styled.main`
  position: relative;
  height: calc(100% - ${headerHeight});
`;

const Layout: React.FunctionComponent = ({ children }) => {
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  return (
    <>
      <GlobalStyles />
      <Header onMenuClick={() => setSidePanelOpen(true)}>Home</Header>
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
