import React, { useMemo } from 'react';
import 'styled-components/macro';
import { css } from 'styled-components';
import { Link } from 'react-router-dom';
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
import { LandscapeView, PortraitView } from 'components/MediaQueryView';
import SgfDownload from 'components/SgfDownload';
import usePlayerNames from 'goban/usePlayerNames';
import FlatButton from 'components/FlatButton';

const firestore = firebaseApp.firestore();

const Players = () => {
  const playerNames = usePlayerNames();

  return (
    <h2
      css={css`
        margin-top: 0;
      `}
    >
      {playerNames}
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
          smallBoard
          observeRect={false}
        />
        <div
          css={css`
            flex: 1;
            display: flex;
            flex-direction: column;
            width: 100%;

            > span {
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
          <div
            css={css`
              width: max-content;
              align-self: flex-end;
              margin-top: auto;
              display: flex;

              > * + * {
                margin-left: 1rem;
              }
            `}
          >
            <FlatButton>
              <SgfDownload sgfContents={sgfFile.contents}>Download</SgfDownload>
            </FlatButton>
            <Link
              css={css`
                text-decoration: none;
              `}
              to={`/view/${sgfFile.id}`}
            >
              <Button>View Game</Button>
            </Link>
          </div>
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
        .orderBy('uploadTimestamp', 'desc')
        .limit(10),
    [currentUser.uid]
  );
  const [data, loading, hasMore, nextPage] = useQuery<SgfFile>(query);

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
      {data.length === 0 && loading && <Spinner />}
      {data.length > 0 && hasMore && (
        <Button
          css={css`
            margin: 1rem auto;
          `}
          onClick={nextPage}
          disabled={loading}
        >
          {loading ? '...Loading' : 'Load More'}
        </Button>
      )}
      {!hasMore && (
        <p
          css={css`
            margin-top: 3rem;
            color: ${highlightFaded};
            text-align: center;
          `}
        >
          No More Games
        </p>
      )}
    </div>
  );
};

export default Profile;
