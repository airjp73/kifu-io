import React from 'react';
import styled from 'styled-components';
import useWindowDimensions from 'hooks/useWindowDimensions';
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
import { portraitMedia, smallLandscapeMedia } from 'style';

interface FabGameInfoProps {
  className?: string;
}

const FabTabs = styled.div`
  display: flex;
  justify-content: center;

  ${portraitMedia} {
    > * + * {
      margin-left: 1rem;
    }
  }

  ${smallLandscapeMedia} {
    height: 100%;
    flex-direction: column;

    > * + * {
      margin-top: 1rem;
    }
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

const GameInfoAppearingArea = styled(AppearingTabContentArea)`
  ${portraitMedia} {
    top: -150px;
  }

  ${smallLandscapeMedia} {
    top: -25px;
    left: -250px;
  }
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

  const { height, width } = useWindowDimensions();
  const isLandscape = height < width;

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
      <GameInfoAppearingArea
        originX={isLandscape ? 100 : 50}
        originY={isLandscape ? 50 : 100}
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
      </GameInfoAppearingArea>
    </GameInfoTabs>
  );
};

export default FabGameInfo;
