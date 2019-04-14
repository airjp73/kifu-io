import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { createBlackStone, createWhiteStone } from 'canvas/createStoneSprite';
import { useGoGameContext } from 'contexts/GoGameContext';
import { highlight, highlightFaded } from 'style';

interface CaptureCountsProps {
  className?: string;
}

const NameAndCaptures = styled.div`
  max-width: 100%;
  overflow: hidden;

  h4 {
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
    createBlackStone(12, blackStoneRef.current);
    createWhiteStone(12, whiteStoneRef.current);
  }, []);

  return (
    <CaptureCountContainer className={className}>
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
