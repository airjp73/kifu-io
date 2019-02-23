import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { highlight, panelBackground } from 'style';
import Portal from './Portal';

interface SidePanelProps {
  active: boolean;
  children: React.ReactNode;
  onClose: () => void;
  side: string;
}

interface PanelProps {
  active: boolean;
  children: React.ReactNode;
  side: string;
}

interface OverlayProps {
  active: boolean;
  onClick: () => void;
}

const panelWidth = '20rem';
const rightPanel = `
  right: 0;
  transform: translateX(${panelWidth});
`;
const leftPanel = `
  left: 0;
  transform: translateX(-${panelWidth});
`;
const Panel = styled.div`
  position: fixed;
  height: 100vh;
  background-color: ${panelBackground};
  overflow: hidden;
  color: ${highlight};
  width: ${panelWidth};
  transition: transform 0.25s ease-in-out;

  ${(props: PanelProps) => (props.side === 'right' ? rightPanel : leftPanel)}
  ${(props: PanelProps) => props.active && 'transform: translateX(0);'}
`;

const activeOverlay = `
  opacity: 1;
  pointer-events: auto;
`;
const Overlay = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease-in-out;

  ${(props: OverlayProps) => props.active && activeOverlay}
`;

const SlideOutPanel: React.FunctionComponent<SidePanelProps> = ({
  active,
  children,
  onClose,
  side = 'left',
}) => (
  <Portal>
    <div
      css={`
        position: absolute;
        right: 0;
        top: 0;
        left: 0;
        bottom: 0;
        pointer-events: none;
      `}
    >
      <Overlay
        active={active}
        onClick={onClose}
        data-testid="side-panel-overlay"
      />
      <Panel active={active} side={side} data-testid="side-panel">
        {children}
      </Panel>
    </div>
  </Portal>
);

export default SlideOutPanel;
