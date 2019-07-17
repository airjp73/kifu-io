import React from 'react';
import styled, { css } from 'styled-components';
import 'styled-components/macro';
import Goban from 'goban/Goban';
import { GoGameContextProvider } from 'goban/GoGameContext';
import GameControlButtons from 'goban/GameControlButtons';
import GameInfo from 'goban/GameInfo';
import CaptureCounts from 'goban/CaptureCounts';
import useSgf from 'goban/useSgf';
import { portraitMedia, smallLandscapeMedia, largeLandscapeMedia } from 'style';
import AutoAdvanceControl from './AutoAdvanceControl';
import GameAnnouncements from './GameAnnouncements';
import SgfDownloadButton from 'components/SgfDownloadButton';
import GobanKeyNavigation from './GobanKeyNavigation';
import MediaQueryView, { LandscapeView } from 'components/MediaQueryView';
import FabGameInfo from './FabGameInfo';
import BackButton from './BackButton';
import ForwardButton from './ForwardButton';
import HideInSmallLandscape from 'components/HideInSmallLandscape';
import WhiteCaptures from './WhiteCaptures';
import BlackCaptures from './BlackCaptures';

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

  ${largeLandscapeMedia} {
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
      '. board black black'
      '. board white white'
      'backButton board forwardButton info';
    grid-template-columns: min-content 1fr min-content min-content;
    grid-template-rows: min-content 1fr min-content min-content;
    box-sizing: border-box;
  }

  ${portraitMedia} {
    grid-template-areas:
      'capture'
      'board'
      'info'
      'buttons';
    grid-template-rows: min-content 1fr min-content min-content;
    grid-template-columns: 1fr;
  }
`;

const GameView: React.FunctionComponent<GameViewProps> = ({ sgf }) => {
  const [gameTree] = useSgf(sgf);
  return (
    <GameViewContainer>
      <GoGameContextProvider gameTree={gameTree}>
        <GobanKeyNavigation />
        <HideInSmallLandscape>
          <GameViewCaptures />
        </HideInSmallLandscape>
        <GameViewGoban>
          <GameAnnouncements />
        </GameViewGoban>
        <LandscapeView>
          <MediaQueryView maxWidth={1000}>
            <BackButton
              css={css`
                grid-area: backButton;
                width: min-content;
              `}
            />
          </MediaQueryView>
        </LandscapeView>
        <MediaQueryView maxWidth={1000}>
          <FabGameInfo
            css={css`
              grid-area: info;
            `}
          />
        </MediaQueryView>
        <LandscapeView>
          <MediaQueryView maxWidth={1000}>
            <BlackCaptures
              css={css`
                grid-area: black;
                justify-content: flex-start;
              `}
            />
            <WhiteCaptures
              css={css`
                grid-area: white;
                justify-content: flex-start;
              `}
            />
            <ForwardButton
              css={css`
                grid-area: forwardButton;
                width: min-content;
              `}
            />
          </MediaQueryView>
        </LandscapeView>
        <MediaQueryView minWidth={1000}>
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
        </MediaQueryView>
        <HideInSmallLandscape>
          <GameViewControlButtons>
            <AutoAdvanceControl />
          </GameViewControlButtons>
        </HideInSmallLandscape>
      </GoGameContextProvider>
    </GameViewContainer>
  );
};

export default GameView;
