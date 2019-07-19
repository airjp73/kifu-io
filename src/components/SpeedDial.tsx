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

  const [open, setOpen] = useState(false);
  const trail = useTrail(childrenArray.length, {
    scale: open ? 1 : 0,
    config: { velocity: isFirstRender ? 0 : 20, friction: 10, clamp: true },
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
            style: {
              transform: (style.scale as OpaqueInterpolation<
                number
              >).interpolate(s => `scale(${s})`),
            },
          })
        )}
      </div>
    </div>
  );
};

export default SpeedDial;
