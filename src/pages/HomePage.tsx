import React, { useState } from 'react';
import Header from 'components/Header';
import SidePanel from 'components/SidePanel';

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
        Some stuff stuff stuff stuff stuff
      </SidePanel>
    </>
  );
};

export default HelloPage;
