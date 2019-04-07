import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { createBlackStone, createWhiteStone } from 'canvas/createStoneSprite';
import { useGoGameContext } from 'contexts/GoGameContext';

const NameAndCaptures = styled.div`
  h4 {
    margin: 0;
  }
  span {
    color: rgba(0, 0, 0, 0.5);
    font-size: 0.8rem;
  }
`;

const CaptureCountContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 0.5 0;
  align-items: center;

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
  const {
    playerBlack,
    playerWhite,
    rankBlack,
    rankWhite,
    teamBlack,
    teamWhite,
  } = gameState.properties;

  useEffect(() => {
    createBlackStone(8, blackStoneRef.current);
    createWhiteStone(8, whiteStoneRef.current);
  }, []);

  return (
    <CaptureCountContainer>
      <div>
        <canvas ref={blackStoneRef} />
        <NameAndCaptures>
          <h4>
            {playerBlack || teamBlack} {rankBlack}
          </h4>
          <span>
            {gameState.captureCounts.b} Capture
            {gameState.captureCounts.b !== 1 && 's'}
          </span>
        </NameAndCaptures>
      </div>
      <div>
        <canvas ref={whiteStoneRef} />
        <NameAndCaptures>
          <h4>
            {playerWhite || teamWhite} {rankWhite}
          </h4>
          <span>
            {gameState.captureCounts.w} Capture
            {gameState.captureCounts.b !== 1 && 's'}
          </span>
        </NameAndCaptures>
      </div>
    </CaptureCountContainer>
  );
};

export default CaptureCounts;
