import React, { useRef } from 'react';
import CanvasLayer from './canvas/CanvasLayer';
import useGobanLayer from './useGobanLayer';
import { useGoGameContext } from './GoGameContext';

const EditingLayer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { height, width, getCoord, unit, stoneRadius } = useGobanLayer();
  const context = useGoGameContext();

  return <CanvasLayer ref={canvasRef} height={height} width={width} />;
};

export default EditingLayer;
