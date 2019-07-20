import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { createWhiteStone } from 'canvas/createStoneSprite';
import { useGoGameContext } from 'goban/GoGameContext';
import { highlight, highlightFaded } from 'style';

interface WhiteCapturesProps {
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
  display: flex;
  align-items: center;
  overflow: hidden;
  justify-content: center;

  > canvas {
    height: min-content;
    margin: -0.5rem;
    width: min-content;
  }
`;

const WhiteCaptures: React.FunctionComponent<WhiteCapturesProps> = ({
  className,
}) => {
  const whiteStoneRef = useRef(null);
  const { gameState } = useGoGameContext();
  const { playerWhite, rankWhite, teamWhite } = gameState.properties;

  useEffect(() => {
    createWhiteStone(10, whiteStoneRef.current);
  }, []);

  return (
    <CaptureCountContainer className={className}>
      <canvas ref={whiteStoneRef} />
      <NameAndCaptures>
        <h5>
          {playerWhite || teamWhite || 'White'} {rankWhite}
        </h5>
        <span>
          {gameState.captureCounts.w} Capture
          {gameState.captureCounts.b !== 1 && 's'}
        </span>
      </NameAndCaptures>
    </CaptureCountContainer>
  );
};

export default WhiteCaptures;
