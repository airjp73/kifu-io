import React, { createContext, useState } from 'react';
import useWindowResizeCallback from 'hooks/useWindowResizeCallback';

export const WindowContext = createContext(null);

const WindowContextProvider: React.FC = ({ children }) => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useWindowResizeCallback(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  });
  return (
    <WindowContext.Provider value={dimensions}>
      {children}
    </WindowContext.Provider>
  );
};

export default WindowContextProvider;
