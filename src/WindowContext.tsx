import React, { createContext, useState } from 'react';
import useWindowResizeCallback from 'hooks/useWindowResizeCallback';

interface WindowContextValue {
  height: number;
  width: number;
}
export const WindowContext = createContext<WindowContextValue>({
  height: 0,
  width: 0,
});

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
