import React, { useRef, createContext, useState, useLayoutEffect } from 'react';
import useWindowResizeCallback from 'hooks/useWindowResizeCallback';

interface CanvasContext {}

const CanvasContext = createContext<CanvasContext>(null);

const WindowResizableCanvasContainer: React.FC<
  React.HTMLProps<HTMLDivElement>
> = ({ children, ...rest }) => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState(null);

  useLayoutEffect(() => {
    const rect = containerRef.current.getBoundingClientRef();
    setDimensions({ height: rect.height, width: rect.width });
  }, []);

  useWindowResizeCallback(() => {
    // The timeout helps ensure that the resize has actually finished
    setTimeout(() => {
      const rect = containerRef.current.getBoundingClientRef();
      setDimensions({ height: rect.height, width: rect.width });
    });
  });

  return (
    <CanvasContext.Provider value={dimensions}>
      <div ref={containerRef} {...rest}>
        {!!dimensions && children}
      </div>
    </CanvasContext.Provider>
  );
};

export default WindowResizableCanvasContainer;
