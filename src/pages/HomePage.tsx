import React from 'react';
import dynamic from 'next/dynamic';
import Layout from 'components/Layout';
import Spinner from 'components/Spinner';

/**
 * Dynamic import for two reasons
 *
 * 1. It's a waste to process the sgf on the server
 *    since canvases can't be rendered on the server anyway
 * 2. Some of the game view content responds to the screen size in js (not css)
 *    which causes flickering since there is no screen on the server.
 */
const GameView = dynamic(() => import('components/GameView'), {
  ssr: false,
  loading: Spinner,
});

const GameViewPage: React.FunctionComponent = () => (
  <Layout>
    <GameView />
  </Layout>
);

export default GameViewPage;
