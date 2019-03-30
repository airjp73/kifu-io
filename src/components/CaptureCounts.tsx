import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { createBlackStone, createWhiteStone } from 'canvas/createStoneSprite';
import { useGoGameContext } from 'contexts/GoGameContext';

const CaptureCountContainer = styled.div`
  display: flex;
  justify-content: space-around;

  > div {
    display: flex;
    align-items: center;
    /* padding: .25rem; */

    > canvas {
      height: min-content;
      width: min-content;
    }

    > h4 {
      margin: 0;
    }
  }
`;

const CaptureCounts = () => {
  const blackStoneRef = useRef(null);
  const whiteStoneRef = useRef(null);
  const { gameState } = useGoGameContext();

  // TODO: Get actual capture counts from context

  useEffect(() => {
    createBlackStone(8, blackStoneRef.current);
    createWhiteStone(8, whiteStoneRef.current);
  }, []);

  return (
    <CaptureCountContainer>
      <div>
        <canvas ref={blackStoneRef} />
        <h4>{gameState.captureCounts.b} Captures</h4>
      </div>
      <div>
        <canvas ref={whiteStoneRef} />
        <h4>{gameState.captureCounts.w} Captures</h4>
      </div>
    </CaptureCountContainer>
  );
};

export default CaptureCounts;
