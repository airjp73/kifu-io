import React, { useState, useLayoutEffect, forwardRef } from 'react';
import 'styled-components/macro';
import { css } from 'styled-components';
import useWindowResizeCallback from 'hooks/useWindowResizeCallback';
import useForwardedRef from 'hooks/useForwardedRef';
import CanvasContext from './CanvasContext';

const WindowResizableCanvasContainer: React.FC<React.HTMLProps<
  HTMLDivElement
>> = ({ children, ...rest }, ref) => {
  const [containerRef, refCallback] = useForwardedRef<HTMLDivElement>(ref);
  const [dimensions, setDimensions] = useState(null);

  useLayoutEffect(() => {
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect && rect.width;
    const height = rect && rect.height;
    setDimensions({ height, width });
  }, [containerRef]);

  useWindowResizeCallback(() => {
    // The timeout helps ensure that the resize has actually finished
    setTimeout(() => {
      const rect = containerRef.current.getBoundingClientRect();
      setDimensions({ height: rect.height, width: rect.width });
    });
  });

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

export default forwardRef(WindowResizableCanvasContainer);
