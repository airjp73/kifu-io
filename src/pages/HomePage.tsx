import React, { useState } from 'react';
import Header from 'components/Header';
import SidePanel from 'components/SidePanel';
import NavMenu from 'components/NavMenu';

const HelloPage: React.FunctionComponent = () => {
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
    </>
  );
};

export default HelloPage;
