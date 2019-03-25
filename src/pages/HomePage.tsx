import React from 'react';
import styled from 'styled-components';
import Layout from 'components/Layout';
import Goban from 'components/Goban';
import { GoGameContextProvider } from 'contexts/GoGameContext';
import GameControlButtons from 'components/GameControlButtons';
import sgf from 'parseSgf/snapshots/snapshot1';
import GameInfo from 'components/GameInfo';

const GameView = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr auto;
`;

const HelloPage: React.FunctionComponent = () => (
  <Layout>
    <GameView>
      <GoGameContextProvider sgf={sgf}>
        <Goban />
        <GameInfo />
        <GameControlButtons />
      </GoGameContextProvider>
    </GameView>
  </Layout>
);

export default HelloPage;
