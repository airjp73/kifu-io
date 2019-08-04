import React, { forwardRef } from 'react';
import { useRect } from '@reach/rect';
import 'styled-components/macro';
import { css } from 'styled-components';
import CanvasContext from './CanvasContext';
import useForwardedRef from 'hooks/useForwardedRef';

const ObservedCanvasContainer: React.FC<React.HTMLProps<HTMLDivElement>> = (
  { children, ...rest },
  ref
) => {
  const [containerRef, refCallback] = useForwardedRef(ref);
  const containerRect = useRect(containerRef);
  const height = containerRect && containerRect.height;
  const width = containerRect && containerRect.height;

  return (
    <CanvasContext.Provider value={{ height, width }}>
      <div
        css={css`
          position: relative;
        `}
        ref={refCallback}
        {...rest}
      >
        {/* TODO: Wait to render children after Goban is fully converted */}
        {/* {!!dimensions && children} */}
        {children}
      </div>
    </CanvasContext.Provider>
  );
};

export default forwardRef(ObservedCanvasContainer);
