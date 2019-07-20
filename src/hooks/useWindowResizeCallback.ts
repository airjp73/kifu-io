import { useEffect } from 'react';

const useWindowResizeCallback = (callback: EventListener) => {
  useEffect(() => {
    window.addEventListener('resize', callback);
    window.addEventListener('orientationchange', callback);
    return () => {
      window.removeEventListener('resize', callback);
      window.removeEventListener('orientationchange', callback);
    };
  }, [callback]);
};

export default useWindowResizeCallback;
