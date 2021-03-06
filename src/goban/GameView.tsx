import React, { useRef } from 'react';
import styled, { css } from 'styled-components';
import 'styled-components/macro';
import Goban from 'goban/Goban';
import { GoGameContextProvider } from 'goban/GoGameContext';
import GameControlButtons from 'goban/GameControlButtons';
import GameInfo from 'goban/GameInfo';
import CaptureCounts from 'goban/CaptureCounts';
import useSgf from 'goban/useSgf';
import { portraitMedia, smallLandscapeMedia, largeLandscapeMedia } from 'style';
import useWindowDimensions from 'hooks/useWindowDimensions';
import useFullScreen from 'hooks/useFullScreen';
import AutoAdvanceControl from './AutoAdvanceControl';
import GameAnnouncements from './GameAnnouncements';
import SgfDownload from 'components/SgfDownload';
import { make as EditingProvider } from 'reason/goban/editing/EditingProvider.gen';
import { make as EditingToolsSpeedDial } from 'reason/pages/view/EditingToolsSpeedDial.gen';
import GobanKeyNavigation from './GobanKeyNavigation';
import MediaQueryView, {
  LandscapeView,
  PortraitView,
} from 'components/MediaQueryView';
import FabGameInfo from './FabGameInfo';
import HideInSmallLandscape from 'components/HideInSmallLandscape';
import WhiteCaptures from './WhiteCaptures';
import BlackCaptures from './BlackCaptures';
import SpeedDial from 'components/SpeedDial';
import SpeedDialOption from 'components/SpeedDialOption';
import { Download, Maximize2, Minimize2 } from 'react-feather';
import { purple } from 'style';
import EditModeFab from './EditModeFab';
import { ToastContainer } from 'react-toastify';
import MoveLinkButton from 'pages/view/MoveLinkButton';
import LinkedMoveHandler from 'pages/view/LinkedMoveHandler';
import { directionFromJs } from 'reason/common/SpeedDial.bs';

interface GameViewProps {
  sgf: string;
}

const GameViewCaptures = styled(CaptureCounts)``;
const GameViewControlButtons = styled(GameControlButtons)``;
const GameViewInfo = styled(GameInfo)``;
const GameViewGoban = styled(Goban)``;
const HeaderSaveButton = styled.div`
  position: fixed;
  top: 2.5rem; /* headerHeight - 1.5rem */
  right: 1rem;
  z-index: 1000;
`;

const GameViewContainer = styled.div`
  display: grid;
  height: 100%;
  background-color: ${purple[50]};

  ${GameViewCaptures} {
    grid-area: capture;
  }

  ${GameViewControlButtons} {
    grid-area: buttons;
    margin: 1rem 0;
  }

  ${GameViewGoban} {
    grid-area: board;
  }

  ${GameViewInfo} {
    grid-area: info;
  }

  ${largeLandscapeMedia} {
    grid-template-areas:
      'board capture'
      'board info'
      'board buttons';
    grid-template-columns: minmax(300px, 60%) minmax(300px, 45%);
    grid-template-rows: min-content 1fr max-content;
    grid-column-gap: 1rem;
    box-sizing: border-box;
  }

  ${smallLandscapeMedia} {
    width: 100%;
    grid-template-areas:
      'black board buttons'
      'white board buttons'
      'info board buttons';
    grid-template-columns: min-content 1fr min-content;
    grid-template-rows: min-content min-content 1fr;
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

  &:fullscreen {
    width: 100vw;
    height: 100vh;
    padding: 0.5rem;
  }
`;

type OverflowSpeedDialProps = { sgf: string } & Pick<
  React.ComponentProps<typeof SpeedDial>,
  'direction' | 'flowDirection'
>;
const OverflowSpeedDial: React.FC<OverflowSpeedDialProps> = ({
  direction,
  sgf,
  children,
  flowDirection,
}) => {
  return (
    <SpeedDial direction={direction} flowDirection={flowDirection}>
      <MoveLinkButton />
      <SpeedDialOption label="Download">
        <SgfDownload sgfContents={sgf}>
          <Download height="1rem" width="1rem" />
        </SgfDownload>
      </SpeedDialOption>
      {children}
    </SpeedDial>
  );
};

const GameView: React.FunctionComponent<GameViewProps> = ({ sgf }) => {
  const [gameTree] = useSgf(sgf);
  const { height, width } = useWindowDimensions();
  const isLandscape = height < width;
  const gameViewRef: React.RefObject<HTMLDivElement> = useRef();
  const [isFullScreen, goFullScreen, exitFullScreen] = useFullScreen(
    gameViewRef
  );

  const speedDialDirection = isLandscape ? 'RIGHT' : 'UP';
  const speedDialFlowDirection = isLandscape ? 'column' : undefined;

  const fullScreenOption = (
    <SpeedDialOption
      label={isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
      onClick={() => {
        if (isFullScreen) exitFullScreen();
        else goFullScreen();
      }}
    >
      {isFullScreen ? <Minimize2 /> : <Maximize2 />}
    </SpeedDialOption>
  );

  return (
    <GameViewContainer ref={gameViewRef}>
      <ToastContainer
        enableMultiContainer
        toastClassName="customToast"
        containerId="game-view"
      />
      <GoGameContextProvider gameTree={gameTree}>
        <EditingProvider>
          <PortraitView>
            <HeaderSaveButton>
              <EditModeFab />
            </HeaderSaveButton>
          </PortraitView>
          <GobanKeyNavigation />
          <LinkedMoveHandler />
          <HideInSmallLandscape>
            <GameViewCaptures />
          </HideInSmallLandscape>
          <GameViewGoban>
            <GameAnnouncements />
          </GameViewGoban>
          <MediaQueryView maxWidth={1000}>
            <FabGameInfo
              css={css`
                grid-area: info;
              `}
            >
              <LandscapeView>
                <EditModeFab />
              </LandscapeView>
              <EditingToolsSpeedDial
                flowDirection={speedDialFlowDirection}
                direction={directionFromJs(speedDialDirection)}
              />
              <OverflowSpeedDial
                direction={speedDialDirection}
                sgf={sgf}
                flowDirection={speedDialFlowDirection}
              >
                {fullScreenOption}
              </OverflowSpeedDial>
            </FabGameInfo>
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
            </MediaQueryView>
          </LandscapeView>
          <MediaQueryView minWidth={1001}>
            <GameViewInfo>
              <EditModeFab />
              <EditingToolsSpeedDial direction={directionFromJs('DOWN')} />
              <OverflowSpeedDial direction="DOWN" sgf={sgf}>
                {fullScreenOption}
              </OverflowSpeedDial>
            </GameViewInfo>
          </MediaQueryView>
          <GameViewControlButtons>
            <AutoAdvanceControl />
          </GameViewControlButtons>
        </EditingProvider>
      </GoGameContextProvider>
    </GameViewContainer>
  );
};

export default GameView;
