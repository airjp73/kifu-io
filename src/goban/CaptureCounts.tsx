import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { createBlackStone, createWhiteStone } from 'canvas/createStoneSprite';
import { useGoGameContext } from 'goban/GoGameContext';
import { highlight, highlightFaded } from 'style';

interface CaptureCountsProps {
  className?: string;
}

const NameAndCaptures = styled.div`
  max-width: 100%;
  overflow: hidden;

  h5 {
    margin: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: ${highlight};
  }

  span {
    font-size: 0.8rem;
    color: ${highlightFaded};
  }
`;

const CaptureCountContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0 0.5rem;
  align-items: center;
  max-width: 100vw;
  overflow: hidden;

  > div {
    display: flex;
    align-items: center;
    overflow: hidden;
    justify-content: center;

    > canvas {
      height: min-content;
      margin: -0.5rem;
      width: min-content;
    }
  }
`;

const CaptureCounts: React.FunctionComponent<CaptureCountsProps> = ({
  className,
}) => {
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
    createBlackStone(10, blackStoneRef.current);
    createWhiteStone(10, whiteStoneRef.current);
  }, []);

  return (
    <CaptureCountContainer className={className}>
      <div>
        <canvas ref={blackStoneRef} />
        <NameAndCaptures>
          <h5>
            {playerBlack || teamBlack} {rankBlack}
          </h5>
          <span>
            {gameState.captureCounts.b} Capture
            {gameState.captureCounts.b !== 1 && 's'}
          </span>
        </NameAndCaptures>
      </div>
      <div>
        <canvas ref={whiteStoneRef} />
        <NameAndCaptures>
          <h5>
            {playerWhite || teamWhite} {rankWhite}
          </h5>
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
