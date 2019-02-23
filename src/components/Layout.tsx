import React, { useState } from 'react';
import styled from 'styled-components';
import Header from 'components/Header';
import SlideOutPanel from 'components/SlideOutPanel';
import NavMenu from 'components/NavMenu';

interface LayoutProps {
  children: React.ReactNode,
}

// TODO: Add styles for larger screens
const MainContent = styled.main`
`;

const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  return (
    <>
      <Header onMenuClick={() => setSidePanelOpen(true)}>Home</Header>
      <SlideOutPanel
        active={sidePanelOpen}
        onClose={() => setSidePanelOpen(false)}
        side="left"
      >
        <NavMenu />
      </SlideOutPanel>
      <MainContent>
        {children}
      </MainContent>
    </>
  );
};

export default Layout;
