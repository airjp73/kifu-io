import React, { useState } from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';
import { useGoGameContext } from 'contexts/GoGameContext';
import { boxShadowLow, smallMedia, largeMedia } from 'style';
import ScreenWidthView from 'components/ScreenWidthView';
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

  ${largeMedia} {
    display: none; /* No expand button on larger screens */
  }
`;

const GameInfoWrapper = styled.div`
  position: relative;

  > div {
    background-color: white;
    overflow: hidden;
  }

  ${largeMedia} {
    padding: 1rem;

    > div {
      height: 100%;
      border-radius: 5px;
      box-shadow: ${boxShadowLow};
      display: grid;
      grid-template-rows: 1fr 1fr;
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
    top: expanded ? '-50vh' : '0vh',
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
            <ScreenWidthView size="SMALL">
              <ButtonTab
                tabName="game-tree"
                leftIcon="linear_scale"
                label="Tree"
                primary={gameTreeIsHighlighted}
              />
            </ScreenWidthView>
            <ButtonTab tabName="more-info" leftIcon="info" label="Info" />
            <ScreenWidthView size="SMALL">
              <ExpandButton onClick={() => setExpanded(prev => !prev)}>
                <FontIcon
                  icon={expanded ? 'expand_more' : 'expand_less'}
                  size="SMALL"
                />
              </ExpandButton>
            </ScreenWidthView>
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
        <ScreenWidthView size="LARGE">
          <GameTreeView />
        </ScreenWidthView>
      </animated.div>
    </GameInfoWrapper>
  );
};

export default GameInfo;
