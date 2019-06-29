import { useEffect, useState, useCallback, useReducer } from 'react';
import { FirebaseEntity } from './apiDataTypes';

interface QueryState<T> {
  result?: firebase.firestore.QuerySnapshot;
  docs: T[];
  hasMore: boolean;
}
type QueryAction = {
  type: 'result-received';
  result: firebase.firestore.QuerySnapshot;
};

const queryReducer = <T extends FirebaseEntity>(
  state: QueryState<T>,
  action: QueryAction
): QueryState<T> => {
  switch (action.type) {
    case 'result-received':
      return {
        result: action.result,
        hasMore: action.result.docs.length !== 0,
        docs: [
          ...state.docs,
          ...(action.result.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as T[]),
        ] as T[],
      };
    default:
      return state;
  }
};

const useQuery = <T extends FirebaseEntity>(
  query: firebase.firestore.Query
): [T[], boolean, boolean, () => void] => {
  const defaultState = { docs: [], hasMore: true } as QueryState<T>;
  const [queryState, dispatch] = useReducer(queryReducer, defaultState);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(
    async (
      startAfter?: firebase.firestore.QueryDocumentSnapshot,
      endBefore?: firebase.firestore.QueryDocumentSnapshot
    ) => {
      setLoading(true);

      let fullQuery = startAfter ? query.startAfter(startAfter) : query;
      fullQuery = endBefore ? query.endBefore(endBefore) : fullQuery;

      const result = await fullQuery.get();
      dispatch({ type: 'result-received', result });

      setLoading(false);
    },
    [query, dispatch]
  );

  useEffect(() => {
    fetchData();
  }, [query, setLoading, fetchData]);

  const nextPage = useCallback(() => {
    fetchData(queryState.result.docs[queryState.result.docs.length - 1]);
  }, [fetchData, queryState.result]);

  return [queryState.docs as T[], loading, queryState.hasMore, nextPage];
};

export default useQuery;
