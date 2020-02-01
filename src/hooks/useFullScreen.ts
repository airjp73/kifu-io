import { useState, useEffect } from 'react';

function useFullScreen(
  ref: React.RefObject<HTMLElement>
): [boolean, () => void, () => void] {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const callback = (event: Event) =>
      setIsFullScreen(event.target === document.fullscreenElement);

    ref!.current.addEventListener('fullscreenchange', callback);
    return () => ref!.current.removeEventListener('fullscreenchange', callback);
  }, [ref]);

  return [
    isFullScreen,
    () => ref!.current.requestFullscreen(),
    () => document.exitFullscreen(),
  ];
}

export default useFullScreen;
