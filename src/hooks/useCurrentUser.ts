import { useState, useEffect } from 'react';
import firebase from 'api/firebase';

const auth = firebase.auth();

function useCurrentUser() {
  const [isLoaded, setIsLoaded] = useState(!!auth.currentUser);
  const [currentUser, setCurrentUser] = useState(auth.currentUser);

  useEffect(
    () =>
      auth.onAuthStateChanged(user => {
        setCurrentUser(user);
        setIsLoaded(true);
      }),
    []
  );

  const value: [firebase.User, boolean] = [currentUser, isLoaded];
  return value;
}

export default useCurrentUser;
