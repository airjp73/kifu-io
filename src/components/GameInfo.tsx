import React from 'react';
import GameTreeView from 'components/GameTreeView';
import GameProperties from 'components/GameProperties';
import GameComments from './GameComments';
import Tabs from './Tabs/Tabs';
import TabBar from './Tabs/TabBar';
import TabContent from './Tabs/TabContent';
import TabContentArea from './Tabs/TabContentArea';

const GameInfo = () => (
  <Tabs
    tabs={[
      { value: 'comments', icon: 'comment', label: 'Comments' },
      { value: 'game-tree', icon: 'linear_scale', label: 'Game Tree' },
      { value: 'more-info', icon: 'info', label: 'Game Info' },
    ]}
    defaultTab="comments"
  >
    <TabBar />
    <TabContentArea>
      <TabContent tab="comments">
        <GameComments />
      </TabContent>
      <TabContent tab="game-tree">
        <GameTreeView />
      </TabContent>
      <TabContent tab="more-info">
        <GameProperties />
      </TabContent>
    </TabContentArea>
  </Tabs>
);

export default GameInfo;
