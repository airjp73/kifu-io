import React from 'react';
import GameTreeView from 'components/GameTreeView';
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
      { value: 'more-info', icon: 'more_vert' },
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
    </TabContentArea>
  </Tabs>
);

export default GameInfo;
