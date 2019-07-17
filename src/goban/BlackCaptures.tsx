import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { createBlackStone } from 'canvas/createStoneSprite';
import { useGoGameContext } from 'goban/GoGameContext';
import { highlight, highlightFaded } from 'style';

interface BlackCapturesProps {
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

const BlackCaptures: React.FunctionComponent<BlackCapturesProps> = ({
  className,
}) => {
  const blackStoneRef = useRef(null);
  const { gameState } = useGoGameContext();
  const { playerBlack, rankBlack, teamBlack } = gameState.properties;

  useEffect(() => {
    createBlackStone(10, blackStoneRef.current);
  }, []);

  return (
    <CaptureCountContainer className={className}>
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
    </CaptureCountContainer>
  );
};

export default BlackCaptures;
