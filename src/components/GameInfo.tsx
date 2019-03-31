import React from 'react';
import GameTreeView from 'components/GameTreeView';
import GameComments from './GameComments';
import Tabs, { useTabContext } from './Tabs/Tabs';
import TabBar from './Tabs/TabBar';
import TabContent from './Tabs/TabContent';
import posed, { PoseGroup } from 'react-pose';

const TabContentArea = posed.div({
  enter: {
    x: 0,
    delay: 300,
    beforeChildren: true,
  },
  exit: {
    x: 50,
  },
});

const TabBody: React.FunctionComponent = ({ children }) => {
  const { currentTab } = useTabContext();
  return (
    <PoseGroup>
      {React.Children.toArray(children)
        .filter(child => child && child.type === TabContent)
        .map(child => (
          <TabContentArea css={`height:100%;`} key={child.props.tab}>{child}</TabContentArea>
        ))}
      {/* <TabContentArea key={currentTab}>{children}</TabContentArea> */}
    </PoseGroup>
  );
};

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
    <TabBody>
      <TabContent tab="comments">
        <GameComments />
      </TabContent>
      <TabContent tab="game-tree">
        <GameTreeView />
      </TabContent>
    </TabBody>
  </Tabs>
);

export default GameInfo;
