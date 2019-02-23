import React, { useState } from 'react';
import styled from 'styled-components';
import Header from 'components/Header';
import SidePanel from 'components/SidePanel';
import NavMenu from 'components/NavMenu';

interface LayoutProps {
  children: React.ReactNode,
}

const MainContent = styled.main`
`;

const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  return (
    <>
      <Header onMenuClick={() => setSidePanelOpen(true)}>Home</Header>
      <SidePanel
        active={sidePanelOpen}
        onClose={() => setSidePanelOpen(false)}
        side="left"
      >
        <NavMenu />
      </SidePanel>
      <main>
        {children}
      </main>
    </>
  );
};

export default Layout;
