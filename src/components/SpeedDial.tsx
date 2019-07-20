import React, { useState, useRef } from 'react';
import { useTrail } from 'react-spring';
import { css } from 'styled-components';
import 'styled-components/macro';
import { MoreHorizontal } from 'react-feather';
import useClickOutside from 'hooks/useClickOutside';
import useIsFirstRender from 'hooks/useIsFirstRender';
import Fab from './Fab';

interface SpeedDialProps {
  direction?: 'UP' | 'DOWN';
}

const SpeedDial: React.FC<SpeedDialProps> = ({ children, direction }) => {
  const isFirstRender = useIsFirstRender();
  const childrenArray = React.Children.toArray(children);

  const fullyClosed = { transform: 'scale(0)', opacity: 0 };
  const fullyOpen = { transform: 'scale(1)', opacity: 1 };
  const openConfig = [fullyClosed, { transform: 'scale(1)' }, { opacity: 1 }];
  const closeConfig = [fullyClosed];
  const [open, setOpen] = useState(false);
  const trail = useTrail(childrenArray.length, {
    from: (open || isFirstRender ? fullyClosed : fullyOpen) as any,
    to: open ? openConfig : closeConfig,
    config: { tension: 700, clamp: true },
  });

  const containerRef = useRef(null);
  useClickOutside(containerRef, () => setOpen(false));

  return (
    <div
      css={css`
        position: relative;
      `}
      ref={containerRef}
    >
      <Fab onClick={() => setOpen(prevOpen => !prevOpen)}>
        <MoreHorizontal height="1.5rem" width="1.5rem" />
      </Fab>

      <div
        css={css`
          position: absolute;
          display: flex;
          align-items: center;
          width: 100%;
          ${!open && 'pointer-events: none;'}

          ${direction === 'UP'
            ? css`
                bottom: 100%;
                flex-direction: column-reverse;

                > * {
                  margin-bottom: 0.5rem;
                }
              `
            : css`
                top: 100%;
                flex-direction: column;

                > * {
                  margin-top: 0.5rem;
                }
              `}
        `}
      >
        {trail.map((style, index) =>
          React.cloneElement(childrenArray[index] as React.ReactElement, {
            key: index,
            style,
          })
        )}
      </div>
    </div>
  );
};

SpeedDial.defaultProps = {
  direction: 'UP',
};

export default SpeedDial;
