import React, { useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import firebaseApp from 'api/firebase';
import GameView from 'goban/GameView';
import useData from 'api/useData';
import Spinner from 'components/Spinner';

const firestore = firebaseApp.firestore();

interface ViewPageParams {
  gameId: string;
}

const GameViewPage: React.FunctionComponent<
  Partial<RouteComponentProps<ViewPageParams>>
> = ({ match }) => {
  const docRef = useMemo(
    () => firestore.collection('sgfFiles').doc(match.params.gameId),
    [match.params.gameId]
  );
  const [data, loading] = useData(docRef);

  return loading ? <Spinner /> : <GameView sgf={data.contents} />;
};

export default GameViewPage;
