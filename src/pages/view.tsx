import React from 'react';
import GameView from 'goban/GameView';
import Layout from 'components/Layout';
import Spinner from 'components/Spinner';

const GameViewPage: React.FunctionComponent = () => (
  <Layout>
    <GameView />
  </Layout>
);

export default GameViewPage;
