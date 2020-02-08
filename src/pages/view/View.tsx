import React, { useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import firebaseApp from 'api/firebase';
import GameView from 'goban/GameView';
import useDoc from 'api/useDoc';
import Spinner from 'components/Spinner';
import SimpleContent from 'components/SimpleContent';
import { SgfFile } from 'api/apiDataTypes';

const firestore = firebaseApp.firestore();

interface ViewPageParams {
  gameId: string;
}

const GameViewPage: React.FunctionComponent<Partial<
  RouteComponentProps<ViewPageParams>
>> = ({ match }) => {
  const docRef = useMemo(
    () => firestore.collection('sgfFiles').doc(match.params.gameId),
    [match.params.gameId]
  );
  const [data, loading, error] = useDoc<SgfFile>(docRef);

  if (loading) {
    return <Spinner />;
  } else if (error) {
    return (
      <SimpleContent>
        <h2>Error</h2>
        <p>{error}</p>
      </SimpleContent>
    );
  } else {
    return <GameView sgf={data.contents} />;
  }
};

export default GameViewPage;
