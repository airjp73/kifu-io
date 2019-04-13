import { useEffect } from 'react';

const useWindowResizeCallback = (callback: EventListener) => {
  useEffect(() => {
    window.addEventListener('resize', callback);
    return () => window.removeEventListener('resize', callback);
  }, [callback]);
};

export default useWindowResizeCallback;
