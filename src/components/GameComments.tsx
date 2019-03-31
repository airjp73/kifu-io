import React from 'react';
import { useGoGameContext } from 'contexts/GoGameContext';
import styled from 'styled-components';

const GameCommentContainer = styled.div`
  padding: 1rem;

  h4 {
    margin-top: 0;
  }
  pre {
    white-space: pre-wrap;
  }
  em {
    opacity: .5;
  }
`;

const GameComments = () => {
  const { gameState } = useGoGameContext();
  const { name, comment } = gameState.moveState;
  return (
    <GameCommentContainer>
      {name && <h4>{name}</h4>}
      {comment ? <pre>{comment}</pre> : <em>No comments on this move</em>}
    </GameCommentContainer>
  );
};

export default GameComments;
