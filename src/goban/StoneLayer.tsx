import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import CanvasLayer from './canvas/CanvasLayer';
import useGobanLayer from './useGobanLayer';
import { useGoGameContext } from './GoGameContext';
import {
  createBlackStone,
  createWhiteStone,
  calculateStonePadding,
} from 'canvas/createStoneSprite';
import { StoneColor } from './Goban';

const pointToXY = (point: string): [number, number] => {
  const A = 'a'.charCodeAt(0);
  const x = point.charCodeAt(0) - A;
  const y = point.charCodeAt(1) - A;
  return [x, y];
};

const StoneLayer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { height, width, stoneRadius, getCoord } = useGobanLayer();
  const { gameState } = useGoGameContext();
  const { boardState } = gameState;

  const blackStone = useMemo(() => createBlackStone(stoneRadius), [
    stoneRadius,
  ]);
  const whiteStone = useMemo(() => createWhiteStone(stoneRadius), [
    stoneRadius,
  ]);
  const stoneSize = useMemo(() => {
    const width = blackStone.style.width;
    return parseInt(width.substr(0, width.length - 2));
  }, [blackStone]);

  const drawStone = useCallback(
    (x: number, y: number, color: StoneColor) => {
      const stone = color === 'b' ? blackStone : whiteStone;

      // We want the center of the sprite on the point, so subtract the radius and sprite padding
      const ctx = canvasRef.current.getContext('2d');
      const stonePadding = calculateStonePadding(stoneRadius);
      const xCoord = Math.floor(getCoord(x) - stoneRadius - stonePadding + 0.5);
      const yCoord = Math.floor(getCoord(y) - stoneRadius - stonePadding + 0.5);
      ctx.drawImage(stone, xCoord, yCoord, stoneSize, stoneSize);
    },
    [blackStone, whiteStone, getCoord, stoneSize, stoneRadius]
  );

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, width, height);

    Object.entries(boardState).forEach(([point, color]) => {
      const [x, y] = pointToXY(point);
      drawStone(x, y, color);
    });
  }, [boardState, drawStone, height, width]);

  return <CanvasLayer ref={canvasRef} height={height} width={width} />;
};

export default StoneLayer;
