import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import CanvasLayer from './canvas/CanvasLayer';
import useGobanLayer from './useGobanLayer';
import { useGoGameContext } from './GoGameContext';
import { StoneColor } from './Goban';
import { calculateStonePadding } from 'canvas/createStoneSprite';
import useStoneSize from './useStoneSize';
import calculateStoneCoord from './calculateStoneCoord';

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
  const { moveState } = gameState;
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

  const handleMouseLeave = () => setMouseCoords(null);

  useEffect(() => {
    if (mouseCoords) {
      const { x, y } = mouseCoords;
      const ctx = canvasRef.current.getContext('2d');
      const stoneCoord = calculateStoneCoord(
        stoneRadius,
        getCoord(x),
        getCoord(y)
      );
      ctx.drawImage(
        currentStone,
        stoneCoord.x,
        stoneCoord.y,
        stoneSize,
        stoneSize
      );
      return () => ctx.clearRect(0, 0, width, height);
    }
  }, [mouseCoords, currentStone, getCoord, stoneRadius]);

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
