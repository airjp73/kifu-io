import React, { useEffect, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import Header from 'components/Header';
import SlideOutPanel from 'components/SlideOutPanel';
import Sidebar from 'components/Sidebar';
import NavMenu from 'components/NavMenu';
import { headerHeight, portraitMedia, landscapeMedia } from 'style';
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
  overflow: auto;

  ${landscapeMedia} {
    padding: 0.5rem 1rem;
    height: 100%;
    box-sizing: border-box;
    display: flex;
  }

  ${portraitMedia} {
    height: calc(100% - ${headerHeight});
  }
`;

const Layout: React.FunctionComponent<Partial<RouteComponentProps>> = ({
  children,
  history,
}) => {
  const [sidePanelOpen, setSidePanelOpen] = useState(false);

  // Close slide-out panel when route changes (user clicks a link)
  useEffect(() => history.listen(() => setSidePanelOpen(false)), [history]);

  return (
    <Container>
      <PortraitView>
        <Header onMenuClick={() => setSidePanelOpen(prevOpen => !prevOpen)} />
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

export default withRouter(Layout);
