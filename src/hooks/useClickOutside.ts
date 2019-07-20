import { useEffect } from 'react';

const useClickOutside = (
  ref: React.MutableRefObject<HTMLElement>,
  callback: (event: MouseEvent) => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!ref.current.contains(event.target as Node)) {
        callback(event);
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  });
};

export default useClickOutside;
