import React, { useState } from 'react';
import styled from 'styled-components';
import 'styled-components/macro';
import { animated, useSpring } from 'react-spring';
import { useGoGameContext } from 'goban/GoGameContext';
import { boxShadowLow, portraitMedia, landscapeMedia } from 'style';
import MediaQueryView, {
  LandscapeView,
  PortraitView,
} from 'components/MediaQueryView';
import FlatButton from 'components/FlatButton';
import GameTreeView from 'goban/GameTreeView';
import GameProperties from 'goban/GameProperties';
import { ReactComponent as CommentIcon } from 'svg/message-square.svg';
import { ReactComponent as InfoIcon } from 'svg/info.svg';
import { ReactComponent as TreeIcon } from 'svg/git-branch.svg';
import { ReactComponent as ExpandUpIcon } from 'svg/chevron-up.svg';
import { ReactComponent as CollapseDownIcon } from 'svg/chevron-down.svg';
import GameComments from './GameComments';
import ButtonTab from '../components/Tabs/ButtonTab';
import Tabs from '../components/Tabs/Tabs';
import TabBar from '../components/Tabs/TabBar';
import TabContent from '../components/Tabs/TabContent';
import TabContentArea from '../components/Tabs/TabContentArea';

interface GameInfoProps {
  className?: string;
}

const ExpandButton = styled(FlatButton)`
  padding: 0.5rem;
  margin-left: auto;
`;

const GameInfoWrapper = styled.div`
  position: relative;
  margin: 0.5rem;
  box-shadow: ${boxShadowLow};
  border-radius: 5px;

  > div {
    background-color: white;
    overflow: hidden;
  }

  ${landscapeMedia} {
    > div {
      height: 100%;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
    }
  }

  ${portraitMedia} {
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
            <LandscapeView>
              <ButtonTab
                tabName="comments"
                leftIcon={<CommentIcon height="1rem" width="1rem" />}
                label="Comments"
                primary={!!gameState.moveState.comment}
              />
              <MediaQueryView maxHeight={600}>
                <ButtonTab
                  tabName="game-tree"
                  leftIcon={<TreeIcon height="1rem" width="1rem" />}
                  label="Tree"
                  primary={gameTreeIsHighlighted}
                />
              </MediaQueryView>
              <ButtonTab
                tabName="more-info"
                leftIcon={<InfoIcon height="1rem" width="1rem" />}
                label="Info"
              />
            </LandscapeView>
            <PortraitView>
              <ButtonTab
                tabName="comments"
                leftIcon={<CommentIcon height="1rem" width="1rem" />}
                label="Comments"
                primary={!!gameState.moveState.comment}
              />
              <ButtonTab
                tabName="game-tree"
                leftIcon={<TreeIcon height="1rem" width="1rem" />}
                label="Tree"
                primary={gameTreeIsHighlighted}
              />
              <ButtonTab
                tabName="more-info"
                leftIcon={<InfoIcon height="1rem" width="1rem" />}
                label="Info"
              />
              <ExpandButton onClick={() => setExpanded(prev => !prev)}>
                {expanded ? (
                  <CollapseDownIcon display="flex" height="1rem" width="1rem" />
                ) : (
                  <ExpandUpIcon display="flex" height="1rem" width="1rem" />
                )}
              </ExpandButton>
            </PortraitView>
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
        <LandscapeView>
          <MediaQueryView minHeight={600}>
            <GameTreeView
              css={`
                max-height: 70%;
              `}
            />
          </MediaQueryView>
        </LandscapeView>
      </animated.div>
    </GameInfoWrapper>
  );
};

export default GameInfo;
