import React, { useMemo, useRef } from 'react';
import 'styled-components/macro';
import { css } from 'styled-components';
import firebaseApp from 'api/firebase';
import useCurrentUser from 'hooks/useCurrentUser';
import LogoutButton from 'components/LogoutButton';
import useQuery from 'api/useQuery';
import Spinner from 'components/Spinner';
import { SgfFile } from 'api/apiDataTypes';
import useSgf from 'goban/useSgf';
import { GoGameContextProvider, useGoGameContext } from 'goban/GoGameContext';
import Goban from 'goban/Goban';
import StaticBoardStateControl from 'goban/StaticBoardStateControl';
import CaptureCounts from 'goban/CaptureCounts';
import Button from 'components/Button';
import { Link } from 'react-router-dom';

const firestore = firebaseApp.firestore();

const ProfileGameSummary = () => {
  const { gameState } = useGoGameContext();
  const {
    playerBlack,
    playerWhite,
    teamBlack,
    teamWhite,
    rankBlack,
    rankWhite,
  } = gameState.properties;

  return <div>kk</div>;
};
const ProfileGameItem: React.FunctionComponent<{ sgfFile: SgfFile }> = ({
  sgfFile,
}) => {
  const [gameTree, error] = useSgf(sgfFile.contents);

  console.log(sgfFile);
  if (error)
    return <h3 style={{ color: 'red' }}>Error processing game file</h3>;

  return (
    <div
      css={css`
        padding: 0.5rem;
        width: 20rem;
        height: 20rem;
        display: flex;
        flex-direction: column;
      `}
    >
      <GoGameContextProvider gameTree={gameTree}>
        <StaticBoardStateControl moveNumber={50} />
        <CaptureCounts
          css={css`
            grid-area: captures;
          `}
        />
        <Goban
          css={css`
            height: 15rem;
            grid-area: board;
            margin: 1rem;
          `}
        />
        {/* <Link
          css={css`
            grid-area: link;
            text-decoration: none;
            align-self: flex-end;
          `}
          to={`/view/${sgfFile.id}`}
        >
          <Button>View Game</Button>
        </Link> */}
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
    <div style={{ width: '100%' }}>
      <h1>Welcome {currentUser.displayName}</h1>
      <div
        css={css`
          flex-flow: row wrap;
        `}
      >
        {data.map(sgfFile => (
          <ProfileGameItem key={sgfFile.id} sgfFile={sgfFile} />
        ))}
      </div>
      <LogoutButton
        style={{
          position: 'absolute',
          bottom: '1rem',
          right: '1rem',
        }}
      />
    </div>
  );
};

export default Profile;
