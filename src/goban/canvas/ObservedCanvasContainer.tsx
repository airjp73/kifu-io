import React, { forwardRef, useMemo } from 'react';
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

  const width = containerRect && containerRect.width;
  const height = containerRect && containerRect.height;
  const dimensions = useMemo(() => height && { height, width }, [
    height,
    width,
  ]);

  return (
    <CanvasContext.Provider value={dimensions}>
      <div
        css={css`
          position: relative;
        `}
        ref={refCallback}
        {...rest}
      >
        {!!dimensions && children}
      </div>
    </CanvasContext.Provider>
  );
};

export default forwardRef(ObservedCanvasContainer);
