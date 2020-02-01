import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import CanvasLayer from './canvas/CanvasLayer';
import useGobanLayer from './useGobanLayer';
import { useGoGameContext } from './GoGameContext';
import { StoneColor } from './Goban';
import pointToXY from './pointToXY';
import useStoneSize from './useStoneSize';
import calculateStoneCoord from './calculateStoneCoord';

interface StoneLayerProps {
  blackStoneFactory: (stoneRadius: number) => HTMLCanvasElement;
  whiteStoneFactory: (stoneRadius: number) => HTMLCanvasElement;
}

const StoneLayer: React.FC<StoneLayerProps> = ({
  blackStoneFactory,
  whiteStoneFactory,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { height, width, stoneRadius, getCoord } = useGobanLayer();
  const { gameState } = useGoGameContext();
  const { boardState } = gameState;

  const blackStone = useMemo(() => blackStoneFactory(stoneRadius), [
    stoneRadius,
    blackStoneFactory,
  ]);
  const whiteStone = useMemo(() => whiteStoneFactory(stoneRadius), [
    stoneRadius,
    whiteStoneFactory,
  ]);
  const stoneSize = useStoneSize(blackStone);

  const drawStone = useCallback(
    (x: number, y: number, color: StoneColor) => {
      const stone = color === 'b' ? blackStone : whiteStone;

      const ctx = canvasRef.current.getContext('2d');
      const stoneCoord = calculateStoneCoord(
        stoneRadius,
        getCoord(x),
        getCoord(y)
      );
      ctx.drawImage(stone, stoneCoord.x, stoneCoord.y, stoneSize, stoneSize);
    },
    [blackStone, whiteStone, getCoord, stoneSize, stoneRadius]
  );

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');

    Object.entries(boardState).forEach(([point, color]) => {
      const [x, y] = pointToXY(point);
      drawStone(x, y, color);
    });

    return () => ctx.clearRect(0, 0, width, height);
  }, [boardState, drawStone, height, width]);

  return <CanvasLayer ref={canvasRef} height={height} width={width} />;
};

export default StoneLayer;
