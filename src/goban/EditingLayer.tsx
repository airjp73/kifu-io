import React, { useState, useMemo, useRef, useEffect } from 'react';
import CanvasLayer from './canvas/CanvasLayer';
import useGobanLayer from './useGobanLayer';
import { useGoGameContext } from './GoGameContext';
import useStoneSize from './useStoneSize';
import calculateStoneCoord from './calculateStoneCoord';
import xyToPoint from './xyToPoint';

interface EditingLayerProps {
  blackStoneFactory: (stoneRadius: number) => HTMLCanvasElement;
  whiteStoneFactory: (stoneRadius: number) => HTMLCanvasElement;
}

interface MouseCoords {
  x: number;
  y: number;
}

const EditingLayer: React.FC<EditingLayerProps> = ({
  blackStoneFactory,
  whiteStoneFactory,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    height,
    width,
    coordToPointIndex,
    getCoord,
    stoneRadius,
  } = useGobanLayer();
  const { gameState } = useGoGameContext();
  const { boardState, moveState, properties } = gameState;
  const { boardSize } = properties;
  const [mouseCoords, setMouseCoords] = useState<MouseCoords | null>(null);

  const blackStone = useMemo(() => blackStoneFactory(stoneRadius), [
    stoneRadius,
    blackStoneFactory,
  ]);
  const whiteStone = useMemo(() => whiteStoneFactory(stoneRadius), [
    stoneRadius,
    whiteStoneFactory,
  ]);
  const currentStone =
    moveState.playerToPlay && moveState.playerToPlay === 'w'
      ? whiteStone
      : blackStone;
  const stoneSize = useStoneSize(blackStone);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const x = coordToPointIndex(event.nativeEvent.offsetX);
    const y = coordToPointIndex(event.nativeEvent.offsetY);
    if (!mouseCoords || x !== mouseCoords.x || y !== mouseCoords.y) {
      setMouseCoords({ x, y });
    }
  };

  const handleClick = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const x = coordToPointIndex(event.nativeEvent.offsetX);
    const y = coordToPointIndex(event.nativeEvent.offsetY);
    // dispatch something
  };

  const handleMouseLeave = () => setMouseCoords(null);

  const shouldDraw =
    mouseCoords &&
    mouseCoords.x >= 0 &&
    mouseCoords.x < boardSize[0] &&
    mouseCoords.y >= 0 &&
    mouseCoords.y < boardSize[1] &&
    !boardState[xyToPoint([mouseCoords.x, mouseCoords.y])];

  useEffect(() => {
    if (shouldDraw) {
      const { x, y } = mouseCoords;
      const stoneCoord = calculateStoneCoord(
        stoneRadius,
        getCoord(x),
        getCoord(y)
      );

      const ctx = canvasRef.current.getContext('2d');
      ctx.globalAlpha = 0.6;
      ctx.drawImage(
        currentStone,
        stoneCoord.x,
        stoneCoord.y,
        stoneSize,
        stoneSize
      );
      return () => ctx.clearRect(0, 0, width, height);
    }
  }, [
    mouseCoords,
    currentStone,
    stoneRadius,
    shouldDraw,
    stoneSize,
    height,
    width,
    getCoord,
  ]);

  return (
    <CanvasLayer
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      ref={canvasRef}
      height={height}
      width={width}
    />
  );
};

export default EditingLayer;
