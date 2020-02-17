import React, { useRef, useLayoutEffect } from 'react';
import { createDoubleStone } from 'canvas/createStoneSprite';
import styled from 'styled-components';

interface DoubleStoneIconProps {
  radius: number;
}

export const StoneIconCanvas = styled.canvas`
  margin: -1rem;
`;

const DoubleStoneIcon: React.FC<DoubleStoneIconProps> = ({ radius }) => {
  const canvasRef = useRef(null);
  useLayoutEffect(() => {
    createDoubleStone(radius, canvasRef.current);
  }, [radius]);

  return <StoneIconCanvas ref={canvasRef} />;
};

export default DoubleStoneIcon;
