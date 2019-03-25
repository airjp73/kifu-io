import React from 'react';
import styled from 'styled-components';
import GameTreeView from 'components/GameTreeView';

const GameTreeContainer = styled.div`
  width: 100%;
  overflow: auto;
`;

const GameInfo = () => (
  <GameTreeContainer>
    <GameTreeView />
  </GameTreeContainer>
)

export default GameInfo;