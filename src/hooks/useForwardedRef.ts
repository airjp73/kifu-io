import { useRef } from 'react';

function useForwardedRef<T>(
  forwardedRef?: React.MutableRefObject<T>
): [React.MutableRefObject<T>, (thing: T) => void] {
  const ref = useRef<T>(null);
  const refCallback = (thing: T) => {
    ref.current = thing;
    if (forwardedRef) forwardedRef.current = thing;
  };

  return [ref, refCallback];
}

export default useForwardedRef;
