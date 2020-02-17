import React, { useState, useRef } from 'react';
import { useTrail } from 'react-spring';
import { css } from 'styled-components';
import 'styled-components/macro';
import { MoreHorizontal } from 'react-feather';
import useClickOutside from 'hooks/useClickOutside';
import useIsFirstRender from 'hooks/useIsFirstRender';
import Fab from './Fab';

interface SpeedDialProps {
  direction?: 'UP' | 'DOWN' | 'LEFT';
  icon?: React.ReactNode;
}

const directionStyles = {
  UP: css`
    bottom: 100%;
    flex-direction: column-reverse;

    > * {
      margin-bottom: 0.5rem;
    }
  `,
  DOWN: css`
    top: 100%;
    flex-direction: column;

    > * {
      margin-top: 0.5rem;
    }
  `,
  LEFT: css`
    right: calc(100% + 1rem);
    bottom: 0.25rem;
    flex-direction: column-reverse;

    > * + * {
      margin-bottom: 0.5rem;
    }
  `,
};

const SpeedDial: React.FC<SpeedDialProps> = ({ children, direction, icon }) => {
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

  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setOpen(false));

  return (
    <div
      css={css`
        position: relative;
      `}
      ref={containerRef}
    >
      <Fab onClick={() => setOpen(prevOpen => !prevOpen)}>
        {icon || <MoreHorizontal height="1.5rem" width="1.5rem" />}
      </Fab>

      <div
        css={css`
          position: absolute;
          display: flex;
          align-items: center;
          width: 100%;
          ${!open && 'pointer-events: none;'}
          ${direction && directionStyles[direction]}
        `}
      >
        {trail.map((style, index) =>
          React.cloneElement(childrenArray[index] as React.ReactElement, {
            key: index,
            // labelAbove: direction === 'LEFT',
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
