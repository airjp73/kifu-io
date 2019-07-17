import React, { useState } from 'react';
import styled from 'styled-components';
import 'styled-components/macro';
import { animated, useSpring } from 'react-spring';
import { useGoGameContext } from 'goban/GoGameContext';
import { boxShadowLow, portraitMedia, landscapeMedia } from 'style';
import FlatButton from 'components/FlatButton';
import GameTreeView from 'goban/GameTreeView';
import GameProperties from 'goban/GameProperties';
import {
  MessageSquare,
  Info,
  GitBranch,
  ChevronUp,
  ChevronDown,
  MoreVertical,
} from 'react-feather';
import GameComments from './GameComments';
import ButtonTab from '../components/Tabs/ButtonTab';
import Tabs from '../components/Tabs/Tabs';
import TabBar from '../components/Tabs/TabBar';
import TabContent from '../components/Tabs/TabContent';
import TabContentArea from '../components/Tabs/TabContentArea';
import FabTab from 'components/Tabs/FabTab';
import Fab from 'components/Fab';
import AppearingTabContentArea from 'components/Tabs/AppearingTabContentArea';

interface FabGameInfoProps {
  className?: string;
}

const FabTabs = styled.div`
  display: flex;

  > * + * {
    margin-left: 1rem;
  }
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

const FabGameInfo: React.FunctionComponent<FabGameInfoProps> = ({
  className,
}) => {
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
      <Tabs defaultTab="comments">
        <FabTabs>
          <FabTab
            tabName="comments"
            highlighted={!!gameState.moveState.comment}
          >
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
        <AppearingTabContentArea>
          <TabContent tab="comments">
            <GameComments />
          </TabContent>
          <TabContent tab="game-tree">
            <GameTreeView />
          </TabContent>
          <TabContent tab="more-info">
            <GameProperties />
          </TabContent>
        </AppearingTabContentArea>
      </Tabs>
    </GameInfoWrapper>
  );
};

export default FabGameInfo;
