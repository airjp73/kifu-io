import React from 'react';
import styled from 'styled-components';
import Goban from 'goban/Goban';
import { GoGameContextProvider } from 'goban/GoGameContext';
import GameControlButtons from 'goban/GameControlButtons';
import GameInfo from 'goban/GameInfo';
import CaptureCounts from 'goban/CaptureCounts';
import useSgf from 'goban/useSgf';
import { landscapeMedia, portraitMedia } from 'style';
import AutoAdvanceControl from './AutoAdvanceControl';

interface GameViewProps {
  sgf: string;
}

const GameViewCaptures = styled(CaptureCounts)``;
const GameViewControlButtons = styled(GameControlButtons)``;
const GameViewInfo = styled(GameInfo)``;
const GameViewGoban = styled(Goban)``;

const GameViewContainer = styled.div`
  display: grid;
  height: 100%;

  ${GameViewCaptures} {
    grid-area: capture;
  }

  ${GameViewControlButtons} {
    grid-area: buttons;
  }

  ${GameViewGoban} {
    grid-area: board;
  }

  ${GameViewInfo} {
    grid-area: info;
  }

  ${landscapeMedia} {
    width: fit-content;
    margin: auto;
    grid-template-areas:
      'board capture'
      'board info'
      'board buttons';
    grid-template-columns: minmax(300px, 1000px) minmax(300px, 800px);
    grid-template-rows: min-content 1fr max-content;
    grid-column-gap: 1rem;
    box-sizing: border-box;
  }

  ${portraitMedia} {
    grid-template-areas:
      'capture'
      'board'
      'info'
      'buttons';
    grid-template-rows: min-content 3fr 2fr min-content;
    grid-template-columns: 1fr;
  }
`;

const GameView: React.FunctionComponent<GameViewProps> = ({ sgf }) => {
  const [gameTree] = useSgf(sgf);
  return (
    <GameViewContainer>
      <GoGameContextProvider gameTree={gameTree}>
        <GameViewCaptures />
        <GameViewGoban />
        <GameViewInfo />
        <GameViewControlButtons>
          <AutoAdvanceControl />
        </GameViewControlButtons>
      </GoGameContextProvider>
    </GameViewContainer>
  );
};

export default GameView;
