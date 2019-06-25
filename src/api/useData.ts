import { useEffect, useState } from 'react';

const useData = (
  docRef: firebase.firestore.DocumentReference
): [any, boolean, string?] => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>(null);

  useEffect(() => {
    async function fetchData() {
      const doc = await docRef.get();
      if (doc.exists) {
        setData(doc.data());
      } else {
        setError('Not Found');
      }
      setLoading(false);
    }

    fetchData();
  }, [docRef, setData, setLoading]);

  return [data, loading, error];
};

export default useData;
