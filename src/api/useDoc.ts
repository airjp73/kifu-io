import { useEffect, useState } from 'react';

const useDoc = <T>(
  docRef: firebase.firestore.DocumentReference
): [T | null, boolean, string | null] => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const doc = await docRef.get();
      if (doc.exists) {
        setData(doc.data() as T);
      } else {
        setError('Not Found');
      }
      setLoading(false);
    }

    fetchData();
  }, [docRef, setData, setLoading]);

  return [data, loading, error];
};

export default useDoc;
