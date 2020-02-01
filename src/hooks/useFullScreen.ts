import { useState, useEffect } from 'react';

function useFullScreen(
  el: React.RefObject<HTMLElement>
): [boolean, () => void, () => void] {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const callback = (event: Event) =>
      setIsFullScreen(event.target === document.fullscreenElement);

    el!.current.addEventListener('fullscreenchange', callback);
    return () => el!.current.removeEventListener('fullscreenchange', callback);
  }, []);

  return [
    isFullScreen,
    () => el!.current.requestFullscreen(),
    () => document.exitFullscreen(),
  ];
}

export default useFullScreen;
