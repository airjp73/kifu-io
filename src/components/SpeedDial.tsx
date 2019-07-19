import React, { useState, useRef, useEffect } from 'react';
import { useTrail, OpaqueInterpolation } from 'react-spring';
import { css } from 'styled-components';
import 'styled-components/macro';
import { MoreVertical } from 'react-feather';
import useClickOutside from 'hooks/useClickOutside';
import useIsFirstRender from 'hooks/useIsFirstRender';
import Fab from './Fab';

const SpeedDial: React.FC = ({ children }) => {
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
        <MoreVertical height="1rem" width="1rem" />
      </Fab>

      <div
        css={css`
          position: absolute;
          bottom: 100%;
          display: flex;
          flex-direction: column-reverse;
          align-items: center;
          width: 100%;
          ${!open && 'pointer-events: none;'}

          > * {
            margin-bottom: 0.5rem;
          }
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

export default SpeedDial;
