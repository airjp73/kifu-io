import React from 'react';
import GameTreeView from 'components/GameTreeView';
import GameComments from './GameComments';
import Tabs from './Tabs/Tabs';
import TabBar from './Tabs/TabBar';
import TabContent from './Tabs/TabContent';

// TODO: Add tabs to this component to switch between different views
const GameInfo = () => (
  <Tabs defaultTab="comments">
    <TabBar
      tabs={[
        { value: 'comments', icon: 'comment', label: 'Comments' },
        { value: 'game-tree', icon: 'linear_scale', label: 'Game Tree' },
        { value: 'more-info', icon: 'more_vert' },
      ]}
    />
    <TabContent tab="comments">
      <GameComments />
    </TabContent>
    <TabContent tab="game-tree">
      <GameTreeView />
    </TabContent>
  </Tabs>
);

export default GameInfo;
