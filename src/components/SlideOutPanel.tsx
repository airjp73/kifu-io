import React from 'react';
import styled from 'styled-components';
import 'styled-components/macro';
import Sidebar from 'components/Sidebar';
import { animated, config, useTransition } from 'react-spring';
import { highlight } from 'style';
import Portal from './Portal';

interface SidePanelProps {
  active: boolean;
  onClose: () => void;
  side: string;
}

interface PanelProps {
  side: string;
}

const rightPanel = `
  right: 0;
  transform: translateX(100%);
`;
const leftPanel = `
  left: 0;
  transform: translateX(-100%);
`;
const Panel = animated(styled(Sidebar)`
  position: fixed;
  overflow: hidden;

  ${(props: PanelProps) => (props.side === 'right' ? rightPanel : leftPanel)}
`);
const Overlay = animated(styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
`);

const SlideOutPanel: React.FunctionComponent<SidePanelProps> = ({
  active,
  children,
  onClose,
  side = 'left',
}) => {
  const transition = useTransition(active, null, {
    from: {
      opacity: 0,
      transform: side === 'left' ? 'translateX(-100%)' : 'translateX(100%)',
    },
    enter: { opacity: 1, transform: 'translateX(0);' },
    leave: {
      opacity: 0,
      transform: side === 'left' ? 'translateX(-100%)' : 'translateX(100%)',
    },
    config: { ...config.default, velocity: 10 },
  });

  return (
    <Portal>
      {transition.map(
        ({ item, key, props }) =>
          item && (
            <div
              css={`
                position: absolute;
                right: 0;
                top: 0;
                left: 0;
                bottom: 0;
              `}
              key={key}
            >
              <Overlay
                key="overlay"
                onClick={onClose}
                data-testid="slide-out-panel-overlay"
                style={{ opacity: props.opacity }}
              />
              <Panel
                key="panel"
                side={side}
                style={{ transform: props.transform }}
                data-testid="slide-out-panel"
              >
                {children}
              </Panel>
            </div>
          )
      )}
    </Portal>
  );
};

export default SlideOutPanel;
