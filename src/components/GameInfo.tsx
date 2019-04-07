import React, { useState } from 'react';
import styled from 'styled-components';
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
import { animated, useSpring } from 'react-spring';

const GameInfoWrapper = styled.div`
  position: relative;

  > div {
    background-color: white;
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
  }
`;

const GameInfo = () => {
  const { gameState } = useGoGameContext();
  const { variationDisplay } = gameState.properties;
  const { node } = gameState;
  const [expanded, setExpanded] = useState(false);
  const contentAreaStyle = useSpring({
    top: expanded ? '-50vh' : '0vh',
    boxShadow: expanded
      ? '0px -1px 3px rgba(0,0,0,.5)'
      : '0px 0px 0px rgba(0,0,0,.5)',
  });

  const showVariationFor = variationDisplay
    ? variationDisplay.showFor
    : 'NEXT_MOVE';
  const gameTreeIsHighlighted =
    showVariationFor === 'NEXT_MOVE'
      ? node.children && node.children.length > 1
      : node.parent && node.parent.children && node.parent.children.length > 1;

  return (
    <GameInfoWrapper>
      <animated.div style={contentAreaStyle}>
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
                padding: 0.5rem;
              `}
              onClick={() => setExpanded(prev => !prev)}
            >
              <FontIcon
                icon={expanded ? 'expand_more' : 'expand_less'}
                size="SMALL"
              />
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
      </animated.div>
    </GameInfoWrapper>
  );
};

export default GameInfo;
