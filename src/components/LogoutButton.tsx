import React from 'react';
import firebase from 'api/firebase';

const auth = firebase.auth();

const LogoutButton = () => (
  <button onClick={() => auth.signOut()}>Log Out</button>
);

export default LogoutButton;
