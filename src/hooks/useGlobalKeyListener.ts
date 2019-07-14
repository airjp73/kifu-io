import { useEffect, useCallback, useRef } from 'react';
import { unstable_batchedUpdates as batchedUpdates } from 'react-dom';

export const KEY_CODES = {
  up: 38,
  down: 40,
  right: 39,
  left: 37,
};

/**
 * Adds a global keydown listener.
 *
 * Since there are update-heavy callbacks using this, it uses `unstable_batchedUpdates`.
 * This is important for performance reasons.
 * React-redux uses it too, so hopefully they don't take it away 🤞.
 */
const useGlobalKeyListener = (keyCode: number, callback: () => void) => {
  const lastRun = useRef(Date.now());

  const handleKeydown = useCallback(
    (event: KeyboardEvent) => {
      const now = Date.now();
      if (event.keyCode === keyCode && now > lastRun.current + 100) {
        lastRun.current = now;
        batchedUpdates(callback);
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
