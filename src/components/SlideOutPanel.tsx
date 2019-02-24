import React from 'react';
import styled from 'styled-components';
import posed, { PoseGroup } from 'react-pose';
import { highlight, panelBackground } from 'style';
import Portal from './Portal';

interface SidePanelProps {
  active: boolean;
  onClose: () => void;
  side: string;
}

interface PanelProps {
  side: string;
}

const PanelPose = posed.div({
  closed: {
    x: (props: PanelProps) => (props.side === 'left' ? '-20rem' : '20rem'),
  },
  open: { x: '0rem' },
});
const panelWidth = '20rem';
const rightPanel = `
  right: 0;
  transform: translateX(${panelWidth});
`;
const leftPanel = `
  left: 0;
  transform: translateX(-${panelWidth});
`;
const Panel = styled(PanelPose)`
  position: fixed;
  height: 100vh;
  background-color: ${panelBackground};
  overflow: hidden;
  color: ${highlight};
  width: ${panelWidth};

  ${(props: PanelProps) => (props.side === 'right' ? rightPanel : leftPanel)}
`;

const OverlayPose = posed.div({
  closed: { opacity: 0 },
  open: {
    opacity: 1,
    transition: {
      duration: 200,
      ease: 'linear',
    },
  },
});
const Overlay = styled(OverlayPose)`
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
`;

const SlideOutPanel: React.FunctionComponent<SidePanelProps> = ({
  active,
  children,
  onClose,
  side = 'left',
}) => (
  <Portal>
    <PoseGroup
      preEnterPose="closed"
      enterPose="open"
      exitPose="closed"
      css={`
        position: absolute;
        right: 0;
        top: 0;
        left: 0;
        bottom: 0;
      `}
    >
      {active && (
        <Overlay
          key="overlay"
          onClick={onClose}
          data-testid="slide-out-panel-overlay"
        />
      )}
      {active && (
        <Panel key="panel" side={side} data-testid="slide-out-panel">
          {children}
        </Panel>
      )}
    </PoseGroup>
  </Portal>
);

export default SlideOutPanel;
