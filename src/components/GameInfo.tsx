import React, { useState } from 'react';
import styled from 'styled-components';
import { useGoGameContext } from 'contexts/GoGameContext';
import FontIcon from 'components/FontIcon';
import FlatButton from 'components/FlatButton';
import GameTreeView from 'components/GameTreeView';
import GameProperties from 'components/GameProperties';
import GameComments from './GameComments';
import ButtonTab from './Tabs/ButtonTab';
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
        <Tabs defaultTab="comments">
          <TabBar>
            <ButtonTab
              tabName="comments"
              leftIcon="comment"
              label="Comments"
              primary={!!gameState.moveState.comment}
            />
            <ButtonTab
              tabName="game-tree"
              leftIcon="linear_scale"
              label="Game Tree"
              primary={gameTreeIsHighlighted}
            />
            <ButtonTab tabName="more-info" leftIcon="info" label="Game Info" />
            <FlatButton
              css={`
                padding: 0.5rem;
                margin-left: auto;
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
