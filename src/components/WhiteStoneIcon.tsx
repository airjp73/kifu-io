import React, { useRef, useLayoutEffect } from 'react';
import { createWhiteStone } from 'canvas/createStoneSprite';
import styled from 'styled-components';

interface WhiteStoneIconProps {
  radius: number;
}

export const StoneIconCanvas = styled.canvas`
  margin: -1rem;
`;

const WhiteStoneIcon: React.FC<WhiteStoneIconProps> = ({ radius }) => {
  const whiteStoneRef = useRef(null);
  useLayoutEffect(() => {
    createWhiteStone(radius, whiteStoneRef.current);
  }, [radius]);

  return <StoneIconCanvas ref={whiteStoneRef} />;
};

export default WhiteStoneIcon;
