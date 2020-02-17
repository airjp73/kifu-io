import React, { useEffect, useRef } from 'react';
import { createBlackStone } from 'canvas/createStoneSprite';
import styled from 'styled-components';

interface BlackStoneIconProps {
  radius: number;
}

export const StoneIconCanvas = styled.canvas`
  margin: -1rem;
`;

const BlackStoneIcon: React.FC<BlackStoneIconProps> = ({ radius }) => {
  const blackStoneRef = useRef(null);
  useEffect(() => {
    createBlackStone(radius, blackStoneRef.current);
  }, [radius]);

  return <StoneIconCanvas ref={blackStoneRef} />;
};

export default BlackStoneIcon;
