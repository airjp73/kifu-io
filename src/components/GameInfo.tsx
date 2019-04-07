import React from 'react';
import { useGoGameContext } from 'contexts/GoGameContext';
import FontIcon from 'components/FontIcon';
import FlatButton from 'components/FlatButton';
import GameTreeView from 'components/GameTreeView';
import GameProperties from 'components/GameProperties';
import GameComments from './GameComments';
import Tabs from './Tabs/Tabs';
import TabBar from './Tabs/TabBar';
import TabContent from './Tabs/TabContent';
import TabContentArea from './Tabs/TabContentArea';

const GameInfo = () => {
  const { gameState } = useGoGameContext();
  const { variationDisplay } = gameState.properties;
  const { node } = gameState;

  const showVariationFor = variationDisplay
    ? variationDisplay.showFor
    : 'NEXT_MOVE';
  const gameTreeIsHighlighted =
    showVariationFor === 'NEXT_MOVE'
      ? node.children && node.children.length > 1
      : node.parent && node.parent.children && node.parent.children.length > 1;

  return (
    <Tabs
      tabs={[
        {
          value: 'comments',
          icon: 'comment',
          label: 'Comments',
          highlighted: !!gameState.moveState.comment,
        },
        {
          value: 'game-tree',
          icon: 'linear_scale',
          label: 'Game Tree',
          highlighted: gameTreeIsHighlighted,
        },
        { value: 'more-info', icon: 'info', label: 'Game Info' },
      ]}
      defaultTab="comments"
    >
      <TabBar>
        <FlatButton
          css={`
            height: 100%;
          `}
        >
          <FontIcon icon="expand_less" size="SMALL" />
        </FlatButton>
      </TabBar>
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
};

export default GameInfo;
