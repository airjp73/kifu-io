import { useState } from 'react';
import useWindowResizeCallback from './useWindowResizeCallback';

const useWindowWidth = () => {
  const [dimensions, setDimensions] = useState(
    typeof window === 'undefined'
      ? { width: 0, height: 0 }
      : { width: window.innerWidth, height: window.innerHeight }
  );
  useWindowResizeCallback(() =>
    setDimensions({ width: window.innerWidth, height: window.innerHeight })
  );
  return dimensions;
};

export default useWindowWidth;
