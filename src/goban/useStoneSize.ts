import { useMemo } from 'react';

const useStoneSize = (stone: HTMLCanvasElement) => {
  return useMemo(() => {
    const width = stone.style.width;
    return parseInt(width.substr(0, width.length - 2));
  }, [stone]);
};

export default useStoneSize;
