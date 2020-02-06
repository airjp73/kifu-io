import { useRef, useEffect } from 'react';

/**
 * @deprecated This is not a good pattern
 */
const useIsFirstRender = () => {
  const isFirstRender = useRef(true);
  useEffect(() => {
    isFirstRender.current = false;
  });
  return isFirstRender.current;
};

export default useIsFirstRender;
