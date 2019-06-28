import React, { useMemo } from 'react';
import 'styled-components/macro';
import { css } from 'styled-components';
import firebaseApp from 'api/firebase';
import useCurrentUser from 'hooks/useCurrentUser';
import useQuery from 'api/useQuery';
import Spinner from 'components/Spinner';
import { SgfFile } from 'api/apiDataTypes';
import useSgf from 'goban/useSgf';
import { GoGameContextProvider, useGoGameContext } from 'goban/GoGameContext';
import Goban from 'goban/Goban';
import StaticBoardStateControl from 'goban/StaticBoardStateControl';
import { transformPlayedOn } from 'goban/GameProperties';
import { highlightFaded, panelBackground, portraitMedia } from 'style';
import Button from 'components/Button';
import { Link } from 'react-router-dom';
import { LandscapeView, PortraitView } from 'components/MediaQueryView';

const firestore = firebaseApp.firestore();

const Players = () => {
  const { gameState } = useGoGameContext();
  const {
    playerBlack,
    playerWhite,
    teamBlack,
    teamWhite,
    rankBlack,
    rankWhite,
  } = gameState.properties;

  return (
    <h2
      css={css`
        margin-top: 0;
      `}
    >
      {playerBlack || teamBlack} {rankBlack} vs {playerWhite || teamWhite}{' '}
      {rankWhite}
    </h2>
  );
};

const PlayedOn = () => {
  const { gameState } = useGoGameContext();
  const { playedOn } = gameState.properties;
  return (
    (playedOn && <span>Played on {transformPlayedOn(playedOn)}</span>) || null
  );
};

const ProfileGameItem: React.FunctionComponent<{ sgfFile: SgfFile }> = ({
  sgfFile,
}) => {
  const [gameTree, error] = useSgf(sgfFile.contents);

  if (error)
    return <h3 style={{ color: 'red' }}>Error processing game file</h3>;

  return (
    <div
      css={css`
        padding: 1rem;
        color: ${highlightFaded};
        max-width: 700px;
        margin: 0 auto;
        background-color: ${panelBackground};
        display: flex;

        ${portraitMedia} {
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
      `}
    >
      <GoGameContextProvider gameTree={gameTree}>
        <StaticBoardStateControl moveNumber={50} />
        <PortraitView>
          <Players />
        </PortraitView>
        <Goban
          css={css`
            height: 15rem;
            width: 15rem;
            margin-right: 1rem;
          `}
        />
        <div
          css={css`
            flex: 1;
            display: flex;
            flex-direction: column;
            width: 100%;

            span {
              margin: 0.5rem 0;
            }
          `}
        >
          <LandscapeView>
            <Players />
          </LandscapeView>
          <PlayedOn />
          <span style={{ marginBottom: '2rem' }}>
            Uploaded on {sgfFile.uploadTimestamp.toDate().toLocaleDateString()}
          </span>
          <Link
            css={css`
              width: max-content;
              align-self: flex-end;
              margin-top: auto;
              text-decoration: none;
            `}
            to={`/view/${sgfFile.id}`}
          >
            <Button>View Game</Button>
          </Link>
        </div>
      </GoGameContextProvider>
    </div>
  );
};

const Profile: React.FunctionComponent = () => {
  const [currentUser] = useCurrentUser();
  const query = useMemo(
    () =>
      firestore
        .collection('sgfFiles')
        .where('userId', '==', currentUser.uid)
        .orderBy('uploadTimestamp', 'desc'),
    [currentUser.uid]
  );
  const [data, loading] = useQuery<SgfFile>(query);

  if (loading) return <Spinner />;

  return (
    <div
      css={css`
        width: 100%;
        padding: 0 1rem 2rem 1rem;
        box-sizing: border-box;

        > * + * {
          margin-top: 1rem;
        }
      `}
    >
      <h1>Your Uploaded Games</h1>
      {data.map(sgfFile => (
        <ProfileGameItem key={sgfFile.id} sgfFile={sgfFile} />
      ))}
    </div>
  );
};

export default Profile;
