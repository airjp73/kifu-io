import React from 'react';
import styled, { css } from 'styled-components';
import 'styled-components/macro';
import { useGoGameContext } from 'goban/GoGameContext';
import GameTreeView from 'goban/GameTreeView';
import GameProperties from 'goban/GameProperties';
import {
  MessageSquare,
  Info,
  GitBranch,
  MoreVertical,
  Minus,
} from 'react-feather';
import GameComments from './GameComments';
import Tabs from '../components/Tabs/Tabs';
import TabContent from '../components/Tabs/TabContent';
import FabTab from 'components/Tabs/FabTab';
import Fab from 'components/Fab';
import AppearingTabContentArea from 'components/Tabs/AppearingTabContentArea';

interface FabGameInfoProps {
  className?: string;
}

const FabTabs = styled.div`
  display: flex;
  justify-content: center;

  > * + * {
    margin-left: 1rem;
  }
`;

const GameInfoTabs = styled(Tabs)`
  position: relative;
  margin: 0 1rem;
`;

const CloseFab = styled(FabTab)`
  position: absolute;
  right: -0.5rem;
  top: -1rem;
  z-index: 1;
`;

const TabContentContainer = styled.div`
  overflow: auto;
  height: 100%;
`;

const FabGameInfo: React.FunctionComponent<FabGameInfoProps> = ({
  className,
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
    <GameInfoTabs className={className}>
      <FabTabs>
        <FabTab tabName="comments" highlighted={!!gameState.moveState.comment}>
          <MessageSquare />
        </FabTab>
        <FabTab tabName="game-tree" highlighted={gameTreeIsHighlighted}>
          <GitBranch height="1rem" width="1rem" />
        </FabTab>
        <FabTab tabName="more-info">
          <Info height="1rem" width="1rem" />
        </FabTab>
        <Fab>
          {/* TODO: Make speed-dail */}
          <MoreVertical height="1rem" width="1rem" />
        </Fab>
      </FabTabs>
      <AppearingTabContentArea
        css={css`
          top: -300px;
        `}
      >
        <CloseFab tabName={null}>
          <Minus />
        </CloseFab>
        <TabContent tab="comments">
          <TabContentContainer>
            <GameComments />
          </TabContentContainer>
        </TabContent>
        <TabContent tab="game-tree">
          <TabContentContainer>
            <GameTreeView />
          </TabContentContainer>
        </TabContent>
        <TabContent tab="more-info">
          <TabContentContainer>
            <GameProperties />
          </TabContentContainer>
        </TabContent>
      </AppearingTabContentArea>
    </GameInfoTabs>
  );
};

export default FabGameInfo;
