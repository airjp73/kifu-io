import React from 'react';
import styled from 'styled-components';
import GameTreeView from 'components/GameTreeView';

const GameTreeContainer = styled.div`
  overflow: scroll;
  background-color: #ccc;
`;

const GameInfo = () => (
  <GameTreeContainer>
    <GameTreeView />
  </GameTreeContainer>
)

export default GameInfo;