import React from 'react';
import firebase from 'api/firebase';
import FlatButton from './FlatButton';

const auth = firebase.auth();

const LogoutButton: React.FunctionComponent<
  React.ComponentProps<typeof FlatButton>
> = props => (
  <FlatButton {...props} onClick={() => auth.signOut()}>
    Log Out
  </FlatButton>
);

export default LogoutButton;
