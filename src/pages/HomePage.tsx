import React from 'react';
import Layout from 'components/Layout';
import Goban from 'components/Goban';
import { GoGameContextProvider } from 'contexts/GoGameContext';
import sgf from 'parseSgf/snapshots/snapshot1';

const HelloPage: React.FunctionComponent = () => (
  <Layout>
    <GoGameContextProvider sgf={sgf}>
      <Goban />
    </GoGameContextProvider>
  </Layout>
);

export default HelloPage;
