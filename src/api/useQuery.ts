import { useEffect, useState, useCallback, useMemo } from 'react';
import { FirebaseEntity } from './apiDataTypes';

interface QueryActions {
  nextPage: () => void;
  prevPage: () => void;
}

const useQuery = <T extends FirebaseEntity>(
  query: firebase.firestore.Query
): [T[], boolean, QueryActions] => {
  const [result, setResult] = useState<firebase.firestore.QuerySnapshot>(null);
  const [loading, setLoading] = useState(true);
  const docs = useMemo(
    () =>
      result
        ? (result.docs.map(doc => ({ id: doc.id, ...doc.data() })) as T[])
        : [],
    [result]
  );

  const fetchData = useCallback(
    async (
      startAfter?: firebase.firestore.QueryDocumentSnapshot,
      endBefore?: firebase.firestore.QueryDocumentSnapshot
    ) => {
      setLoading(true);

      let fullQuery = startAfter ? query.startAfter(startAfter) : query;
      fullQuery = endBefore ? query.endBefore(endBefore) : fullQuery;
      const result = await fullQuery.get();
      setResult(result);

      setLoading(false);
    },
    [query, setResult, setLoading]
  );

  useEffect(() => {
    fetchData();
  }, [query, setResult, setLoading, fetchData]);

  const nextPage = useCallback(() => {
    fetchData(result.docs[result.docs.length]);
  }, [fetchData, result]);

  const prevPage = useCallback(() => {
    fetchData(result.docs[0]);
  }, [fetchData, result]);

  const actions: QueryActions = useMemo(
    () => ({
      nextPage,
      prevPage,
    }),
    [nextPage, prevPage]
  );

  return [docs, loading, actions];
};

export default useQuery;
