import React from 'react';
import styled, { css } from 'styled-components';
import 'styled-components/macro';
import { useGoGameContext } from 'goban/GoGameContext';
import { boxShadowLow, tallMedia, shortMedia } from 'style';
import MediaQueryView from 'components/MediaQueryView';
import GameTreeView from 'goban/GameTreeView';
import GameProperties from 'goban/GameProperties';
import { MessageSquare, Info, GitBranch } from 'react-feather';
import GameComments from './GameComments';
import ButtonTab from '../components/Tabs/ButtonTab';
import Tabs from '../components/Tabs/Tabs';
import TabBar from '../components/Tabs/TabBar';
import TabContent from '../components/Tabs/TabContent';
import TabContentArea from '../components/Tabs/TabContentArea';

interface GameInfoProps {
  className?: string;
  otherTab?: React.ReactElement;
}

const GameInfoWrapper = styled.div`
  position: relative;
  margin: 0.5rem;
  box-shadow: ${boxShadowLow};
  border-radius: 5px;
  overflow: hidden;

  > div {
    background-color: white;
    overflow: hidden;
    height: 100%;
    border-radius: 5px;
    display: grid;
  }

  ${shortMedia} {
    > div {
      display: grid;
      grid-template-rows: 1fr;
    }
  }

  ${tallMedia} {
    > div {
      display: grid;
      grid-template-rows: 1fr 1fr;
    }
  }
`;

const GameInfo: React.FunctionComponent<GameInfoProps> = ({
  children,
  className,
  otherTab,
}) => {
  const { gameState, getNode } = useGoGameContext();
  const { variationDisplay } = gameState.properties;
  const { node } = gameState;

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
      <div>
        <Tabs defaultTab="comments">
          <TabBar>
            <ButtonTab
              tabName="comments"
              leftIcon={<MessageSquare height="1rem" width="1rem" />}
              label="Comments"
              primary={!!gameState.moveState.comment}
            />
            <MediaQueryView maxHeight={650}>
              <ButtonTab
                tabName="game-tree"
                leftIcon={<GitBranch height="1rem" width="1rem" />}
                label="Tree"
                primary={gameTreeIsHighlighted}
              />
            </MediaQueryView>
            <ButtonTab
              tabName="more-info"
              leftIcon={<Info height="1rem" width="1rem" />}
              label="Info"
            />
          </TabBar>
          <div
            css={css`
              position: absolute;
              right: 1rem;
              top: 0.5rem;
              z-index: 1;
              display: flex;
              flex-direction: row;

              > * + * {
                margin-left: 1rem;
              }
            `}
          >
            {children}
          </div>
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
            <TabContent tab="other">{otherTab}</TabContent>
          </TabContentArea>
        </Tabs>
        <MediaQueryView minHeight={651}>
          <GameTreeView />
        </MediaQueryView>
      </div>
    </GameInfoWrapper>
  );
};

export default GameInfo;
