import React, { useState, useMemo, useRef } from 'react';
import CanvasLayer from './canvas/CanvasLayer';
import useGobanLayer from './useGobanLayer';
import { useGoGameContext } from './GoGameContext';

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
  const { height, width, coordToPointIndex, stoneRadius } = useGobanLayer();
  const context = useGoGameContext();
  const [mouseCoords, setMouseCoords] = useState<MouseCoords | null>(null);

  const blackStone = useMemo(() => blackStoneFactory(stoneRadius), [
    stoneRadius,
    blackStoneFactory,
  ]);
  const whiteStone = useMemo(() => whiteStoneFactory(stoneRadius), [
    stoneRadius,
    whiteStoneFactory,
  ]);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const x = coordToPointIndex(event.nativeEvent.offsetX);
    const y = coordToPointIndex(event.nativeEvent.offsetY);
    if (!mouseCoords || x !== mouseCoords.x || y !== mouseCoords.y) {
      setMouseCoords({ x, y });
    }
  };

  const handleMouseLeave = () => setMouseCoords(null);

  console.log(mouseCoords);

  return (
    <CanvasLayer
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={canvasRef}
      height={height}
      width={width}
    />
  );
};

export default EditingLayer;
