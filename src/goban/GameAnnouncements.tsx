import React, { useEffect, useState } from 'react';
import 'styled-components/macro';
import { useGoGameContext } from './GoGameContext';
import { GameStateProperties } from './gameStateReducer';
import { css, keyframes } from 'styled-components';
import { primaryAction, highlight } from 'style';

const fadeInOut = keyframes`
  0% { opacity: 0; transform: scale(.75); }
  25%, 75% { opacity: .9; transform: scale(1); }
  100% { opacity: 0; transform: scale(.75); }
`;

const isPass = (move: string[], boardSize: GameStateProperties['boardSize']) =>
  move.length === 0 ||
  move[0] === '' ||
  (move[0] === 'tt' && boardSize[0] <= 19 && boardSize[1] <= 19);

const GameAnnouncements: React.FunctionComponent = () => {
  const { gameState, getNode } = useGoGameContext();
  const { properties, node } = gameState;
  const [message, setMessage] = useState<string>(null);

  useEffect(() => {
    const nodeProperties = getNode(node).properties || {};
    const { B: blackMove, W: whiteMove } = nodeProperties;

    if (blackMove && isPass(blackMove, properties.boardSize)) {
      setMessage('Black Passes');
    } else if (whiteMove && isPass(whiteMove, properties.boardSize)) {
      setMessage('White Passes');
    }

    return () => setMessage(null);
  }, [node, properties.boardSize]);

  return (
    message && (
      <div
        key={message}
        css={css`
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          margin: auto;
          padding: 1rem;
          background-color: ${primaryAction};
          border-radius: 3px;
          width: min-content;
          height: min-content;
          white-space: nowrap;
          color: ${highlight};
          opacity: 0;
          animation: ${fadeInOut} 2s ease;
        `}
      >
        <h3>{message}</h3>
      </div>
    )
  );
};

export default GameAnnouncements;
