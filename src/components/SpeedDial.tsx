import React, { useState, useRef } from 'react';
import { useTrail } from 'react-spring';
import { css } from 'styled-components';
import 'styled-components/macro';
import { MoreHorizontal } from 'react-feather';
import { labelDirections } from './SpeedDialOption';
import useClickOutside from 'hooks/useClickOutside';
import useIsFirstRender from 'hooks/useIsFirstRender';
import Fab from './Fab';

interface SpeedDialProps {
  direction?: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
  icon?: React.ReactNode;
  flowDirection?: string;
}

const flowMargins: { [key: string]: string } = {
  'column-reverse': 'margin-bottom',
  column: 'margin-top',
  row: 'margin-left',
  'row-reverse': 'margin-right',
};
const directionStyles = {
  UP: (flowDirection: string = 'column-reverse') => css`
    bottom: calc(100% + 1rem);
    flex-direction: ${flowDirection};

    > * + * {
      ${flowMargins[flowDirection]}: 0.5rem;
    }
  `,
  DOWN: (flowDirection: string = 'column') => css`
    top: calc(100% + 1rem);
    flex-direction: ${flowDirection};

    > * + * {
      ${flowMargins[flowDirection]}: 0.5rem;
    }
  `,
  LEFT: (flowDirection: string = 'column-reverse') => css`
    right: calc(100% + 1rem);
    bottom: 0.25rem;
    flex-direction: ${flowDirection};

    > * + * {
      ${flowMargins[flowDirection]}: 0.5rem;
    }
  `,
  RIGHT: (flowDirection: string = 'column-reverse') => css`
    left: calc(100% + 1rem);
    top: 0.25rem;
    flex-direction: ${flowDirection};

    > * + * {
      ${flowMargins[flowDirection]}: 0.5rem;
    }
  `,
};

const SpeedDial: React.FC<SpeedDialProps> = ({
  children,
  direction,
  icon,
  flowDirection,
}) => {
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

  const buttonRef = useRef<HTMLButtonElement>(null);
  useClickOutside(buttonRef, () => setOpen(false));

  return (
    <div
      css={css`
        position: relative;
      `}
    >
      <Fab onClick={() => setOpen(prevOpen => !prevOpen)} ref={buttonRef}>
        {icon || <MoreHorizontal height="1.5rem" width="1.5rem" />}
      </Fab>

      <div
        css={css`
          position: absolute;
          display: flex;
          align-items: center;
          width: 100%;
          ${!open && 'pointer-events: none;'}
          ${direction && directionStyles[direction](flowDirection)}
        `}
      >
        {trail.map((style, index) =>
          React.cloneElement(childrenArray[index] as React.ReactElement, {
            key: index,
            labelDirection:
              direction === 'RIGHT'
                ? labelDirections.RIGHT
                : labelDirections.LEFT,
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
