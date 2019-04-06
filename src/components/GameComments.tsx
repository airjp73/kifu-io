import React from 'react';
import styled from 'styled-components';
import { useGoGameContext } from 'contexts/GoGameContext';
import { PositionStatus } from 'contexts/gameStateReducer';

const Comment = styled.p`
  white-space: pre-wrap;
  margin: 1rem 0;
`;
const EmptyText = styled.p`
  margin-top: 1rem;
  opacity: 0.5;
  font-style: italic;
`;
const GameCommentContainer = styled.div`
  padding: 0 1rem;

  h3 {
    margin-bottom: 1rem;
  }
  pre {
    white-space: pre-wrap;
    margin: 1rem 0;
  }
  em {
    font-weight: 600;
  }
`;

const getStatusMessage = ({ favoredPlayer, magnitude }: PositionStatus) => {
  switch (favoredPlayer) {
    case 'b':
      return magnitude === 1 ? 'Good for black' : 'Very good for black';
    case 'w':
      return magnitude === 1 ? 'Good for white' : 'Very good for white';
    case 'even':
      return magnitude === 1 ? 'Position is event' : 'Joseki';
    case 'unclear':
      return magnitude === 1
        ? 'Position is unclear'
        : 'Position is very unclear';
    default:
      return null;
  }
};

const GameComments = () => {
  const { gameState } = useGoGameContext();
  const { name, comment, positionStatus } = gameState.moveState;
  const showEmptyMessage = !(name || comment || positionStatus);
  return (
    <GameCommentContainer>
      {name && <h3>{name}</h3>}
      {positionStatus && <em>{getStatusMessage(positionStatus)}</em>}
      {comment && <Comment>{comment}</Comment>}
      {showEmptyMessage && <EmptyText>No comments on this move</EmptyText>}
    </GameCommentContainer>
  );
};

export default GameComments;
