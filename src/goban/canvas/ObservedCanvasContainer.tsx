import React, { useRef } from 'react';
import { useRect } from '@reach/rect';
import CanvasContext from './CanvasContext';

const ObservedCanvasContainer: React.FC<React.HTMLProps<HTMLDivElement>> = ({
  children,
  ...rest
}) => {
  const containerRef = useRef(null);
  const containerRect = useRect(containerRef);
  const height = containerRect && containerRect.height;
  const width = containerRect && containerRect.height;

  return (
    <CanvasContext.Provider value={{ height, width }}>
      <div ref={containerRef} {...rest}>
        {!!containerRect && children}
      </div>
    </CanvasContext.Provider>
  );
};

export default ObservedCanvasContainer;
