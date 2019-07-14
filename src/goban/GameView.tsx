import React from 'react';
import styled, { css } from 'styled-components';
import 'styled-components/macro';
import Goban from 'goban/Goban';
import { GoGameContextProvider } from 'goban/GoGameContext';
import GameControlButtons from 'goban/GameControlButtons';
import GameInfo from 'goban/GameInfo';
import CaptureCounts from 'goban/CaptureCounts';
import useSgf from 'goban/useSgf';
import { landscapeMedia, portraitMedia, smallLandscapeMedia } from 'style';
import AutoAdvanceControl from './AutoAdvanceControl';
import GameAnnouncements from './GameAnnouncements';
import SgfDownloadButton from 'components/SgfDownloadButton';
import GobanKeyNavigation from './GobanKeyNavigation';

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

  ${smallLandscapeMedia} {
    width: 100%;
    grid-template-areas:
      'board capture'
      'board info'
      'board buttons';
    grid-template-columns: minmax(35%, 65%) minmax(35%, 65%);
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
    grid-template-rows: min-content 4fr 2fr min-content;
    grid-template-columns: 1fr;
  }
`;

const GameView: React.FunctionComponent<GameViewProps> = ({ sgf }) => {
  const [gameTree] = useSgf(sgf);
  return (
    <GameViewContainer>
      <GoGameContextProvider gameTree={gameTree}>
        <GobanKeyNavigation />
        <GameViewCaptures />
        <GameViewGoban>
          <GameAnnouncements />
        </GameViewGoban>
        <GameViewInfo
          otherTab={
            <div
              css={css`
                padding: 0.5rem;
              `}
            >
              <SgfDownloadButton sgfContents={sgf} />
            </div>
          }
        />
        <GameViewControlButtons>
          <AutoAdvanceControl />
        </GameViewControlButtons>
      </GoGameContextProvider>
    </GameViewContainer>
  );
};

export default GameView;
