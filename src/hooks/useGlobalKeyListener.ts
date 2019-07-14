import { useEffect, useCallback, useRef } from 'react';

export const KEY_CODES = {
  upArrow: 38,
  down: 40,
  right: 39,
  left: 37,
};

const useGlobalKeyListener = (keyCode: number, callback: () => void) => {
  // Throttling because this is primarily used to update game state which is slow
  const lastRun = useRef(Date.now());

  const handleKeydown = useCallback(
    (event: KeyboardEvent) => {
      const now = Date.now();
      if (event.keyCode === keyCode && now > lastRun.current + 250) {
        lastRun.current = now;
        callback();
      }
    },
    [keyCode, callback]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [handleKeydown]);
};

export default useGlobalKeyListener;
