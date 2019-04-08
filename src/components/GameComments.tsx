import React, { useMemo } from 'react';
import styled from 'styled-components';
import FlatButton from 'components/FlatButton';
import FontIcon from 'components/FontIcon';
import { primaryAction } from 'style';
import { useGoGameContext } from 'contexts/GoGameContext';
import { PositionStatus, MoveQuality } from 'contexts/gameStateReducer';

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
    display: block;
    margin: 1rem 0;
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

const getQualityMessage = ({ quality, magnitude }: MoveQuality) => {
  switch (quality) {
    case 'bad':
      return magnitude === 1 ? 'Bad move' : 'Very bad move';
    case 'doubtful':
      return 'Doubtful move';
    case 'interesting':
      return 'Interesting move';
    case 'tesuji':
      return magnitude === 1 ? 'Tesuji' : 'Powerful Tesuji!';
    default:
      return null;
  }
};

const getScoreMessage = (estimatedScore: number) =>
  estimatedScore > 0
    ? `Black is leading by ${estimatedScore} points`
    : `White is leading by ${estimatedScore * -1} points`;

const GameComments = () => {
  const { gameState, goToNode } = useGoGameContext();
  const { node } = gameState;
  const {
    name,
    comment,
    estimatedScore,
    moveQuality,
    positionStatus,
  } = gameState.moveState;
  const showEmptyMessage = !(
    name ||
    comment ||
    positionStatus ||
    estimatedScore ||
    moveQuality
  );

  const nextCommentMove = useMemo(() => {
    let currentNode = node.children && node.children[0];
    while (currentNode) {
      if (currentNode.properties && currentNode.properties.C)
        return currentNode;
      currentNode = currentNode.children && currentNode.children[0];
    }
    return null;
  }, [node]);

  return (
    <GameCommentContainer>
      {name && <h3>{name}</h3>}
      {estimatedScore && <em>{getScoreMessage(estimatedScore)}</em>}
      {moveQuality && <em>{getQualityMessage(moveQuality)}</em>}
      {positionStatus && <em>{getStatusMessage(positionStatus)}</em>}
      {comment && <Comment>{comment}</Comment>}
      {showEmptyMessage && <EmptyText>No comments on this move</EmptyText>}
      {nextCommentMove && (
        <FlatButton
          css={`
            color: ${primaryAction};
            font-weight: bold;
          `}
          onClick={() => goToNode(nextCommentMove)}
        >
          <span style={{ marginRight: '.5rem' }}>Go to next comment</span>
          <FontIcon size="SMALL" icon="arrow_forward" />
        </FlatButton>
      )}
    </GameCommentContainer>
  );
};

export default GameComments;
