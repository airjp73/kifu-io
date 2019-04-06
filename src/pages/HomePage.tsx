import React from 'react';
import styled from 'styled-components';
import Layout from 'components/Layout';
import Goban from 'components/Goban';
import { GoGameContextProvider } from 'contexts/GoGameContext';
import GameControlButtons from 'components/GameControlButtons';
import sgf from 'parseSgf/snapshots/snapshot5';
import GameInfo from 'components/GameInfo';
import CaptureCounts from 'components/CaptureCounts';

const GameView = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: min-content min-content 1fr min-content;
`;

const HelloPage: React.FunctionComponent = () => (
  <Layout>
    <GameView>
      <GoGameContextProvider sgf={sgf}>
        <CaptureCounts />
        <Goban />
        <GameInfo />
        <GameControlButtons />
      </GoGameContextProvider>
    </GameView>
  </Layout>
);

export default HelloPage;
