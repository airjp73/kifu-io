import { useState, useEffect } from 'react';
import firebase from 'api/firebase';

const auth = firebase.auth();

// User gets set in the effect hook because it won't run on the server side
// We don't have access to the auth state on the server side
function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState(auth.currentUser);

  useEffect(() => auth.onAuthStateChanged(setCurrentUser), []);

  return currentUser;
}

export default useCurrentUser;
