import React, { useEffect, forwardRef } from 'react';
import styled from 'styled-components';
import { setCanvasDimensionsWithCorrectScaling } from 'canvas/util';
import useForwardedRef from 'hooks/useForwardedRef';

interface CanvasLayerProps {
  height: number;
  width: number;
}

const Layer = styled.canvas`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`;

const CanvasLayer: React.FC<CanvasLayerProps> = ({ height, width }, ref) => {
  const [layerRef, refCallback] = useForwardedRef<HTMLCanvasElement>(ref);

  useEffect(() => {
    setCanvasDimensionsWithCorrectScaling(layerRef.current, height, width);
  }, [height, width]);

  return <Layer ref={refCallback} />;
};

export default forwardRef(CanvasLayer);
