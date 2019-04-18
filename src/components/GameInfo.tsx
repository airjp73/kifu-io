import React, { useState } from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';
import { useGoGameContext } from 'contexts/GoGameContext';
import { boxShadowLow, smallMedia, largeMedia } from 'style';
import MediaQueryView from 'components/MediaQueryView';
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

interface GameInfoProps {
  className?: string;
}

const ExpandButton = styled(FlatButton)`
  padding: 0.5rem;
  margin-left: auto;
`;

const GameInfoWrapper = styled.div`
  position: relative;

  > div {
    background-color: white;
    overflow: hidden;
  }

  ${largeMedia} {
    margin: 0.5rem;
    box-shadow: ${boxShadowLow};
    border-radius: 5px;

    > div {
      height: 100%;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
    }
  }

  ${smallMedia} {
    > div {
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
    }
  }
`;

const GameInfo: React.FunctionComponent<GameInfoProps> = ({ className }) => {
  const { gameState, getNode } = useGoGameContext();
  const { variationDisplay } = gameState.properties;
  const { node } = gameState;
  const [expanded, setExpanded] = useState(false);
  const contentAreaStyle = useSpring({
    top: expanded ? '-30%' : '0vh',
    boxShadow: expanded
      ? '0px -1px 3px rgba(0,0,0,.5)'
      : '0px 0px 0px rgba(0,0,0,.5)',
  });

  const showVariationFor = variationDisplay
    ? variationDisplay.showFor
    : 'NEXT_MOVE';
  const currentNode = getNode(node);
  const parentNode = getNode(currentNode && currentNode.parent);
  const gameTreeIsHighlighted =
    showVariationFor === 'NEXT_MOVE'
      ? currentNode && currentNode.children && currentNode.children.length > 1
      : parentNode && parentNode.children && parentNode.children.length > 1;

  return (
    <GameInfoWrapper className={className}>
      <animated.div style={contentAreaStyle}>
        <Tabs defaultTab="comments">
          <TabBar>
            <ButtonTab
              tabName="comments"
              leftIcon="comment"
              label="Comments"
              primary={!!gameState.moveState.comment}
            />
            <MediaQueryView negate minHeight={450} minWidth={700}>
              <ButtonTab
                tabName="game-tree"
                leftIcon="linear_scale"
                label="Tree"
                primary={gameTreeIsHighlighted}
              />
            </MediaQueryView>
            <ButtonTab tabName="more-info" leftIcon="info" label="Info" />
            <MediaQueryView maxWidth={700}>
              <ExpandButton onClick={() => setExpanded(prev => !prev)}>
                <FontIcon
                  icon={expanded ? 'expand_more' : 'expand_less'}
                  size="SMALL"
                />
              </ExpandButton>
            </MediaQueryView>
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
        <MediaQueryView minWidth={700} minHeight={450}>
          <GameTreeView />
        </MediaQueryView>
      </animated.div>
    </GameInfoWrapper>
  );
};

export default GameInfo;
