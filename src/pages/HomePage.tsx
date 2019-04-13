import React from 'react';
import styled from 'styled-components';
import Layout from 'components/Layout';
import Goban from 'components/Goban';
import { GoGameContextProvider } from 'contexts/GoGameContext';
import GameControlButtons from 'components/GameControlButtons';
import sgf from 'parseSgf/snapshots/snapshot6';
import GameInfo from 'components/GameInfo';
import CaptureCounts from 'components/CaptureCounts';
import { largeMedia, smallMedia } from 'style';

const GameViewCaptures = styled(CaptureCounts)``;
const GameViewControlButtons = styled(GameControlButtons)``;
const GameViewInfo = styled(GameInfo)``;
const GobanContainer = styled.div``;
const GameViewGoban = styled.div``;

const GameView = styled.div`
  display: grid;

  ${largeMedia} {
    height: max-content;
    max-width: 1200px;
    margin: auto;
    grid-column-gap: 30px;
    grid-template-areas:
      'capture info'
      'board info'
      'buttons info';
    grid-template-columns: minmax(300px, 700px) minmax(300px, 500px);
    grid-template-rows: max-content auto max-content;

    ${GameViewCaptures} {
      grid-area: capture;
      padding: 1rem 0;
    }

    ${GobanContainer} {
      grid-area: board;

      ${GameViewGoban} {
        margin: auto;
        max-width: 600px;
      }
    }

    ${GameViewInfo} {
      grid-area: info;
    }

    ${GameViewControlButtons} {
      grid-area: buttons;
    }
  }

  ${smallMedia} {
    height: 100%;
    grid-template-rows: min-content min-content 1fr min-content;
    grid-template-columns: 1fr;
  }
`;

const HelloPage: React.FunctionComponent = () => (
  <Layout>
    <GameView>
      <GoGameContextProvider sgf={sgf}>
        <GameViewCaptures />
        <GobanContainer>
          <GameViewGoban>
            <Goban />
          </GameViewGoban>
        </GobanContainer>
        <GameViewInfo />
        <GameViewControlButtons />
      </GoGameContextProvider>
    </GameView>
  </Layout>
);

export default HelloPage;
