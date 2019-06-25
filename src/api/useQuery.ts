import { useEffect, useState } from 'react';
import { FirebaseEntity } from './apiDataTypes';

const useQuery = <T extends FirebaseEntity>(
  query: firebase.firestore.Query
): [T[], boolean] => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const result = await query.get();
      const docs = result.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(docs);
      setLoading(false);
    }

    fetchData();
  }, [query, setData, setLoading]);

  return [data, loading];
};

export default useQuery;
