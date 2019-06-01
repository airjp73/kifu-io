import React from 'react';
import firebase from 'api/firebase';
import WithRouter from 'components/WithRouter';
import FlatButton from './FlatButton';

const auth = firebase.auth();

const LogoutButton: React.FunctionComponent<
  React.ComponentProps<typeof FlatButton>
> = props => (
  <WithRouter>
    {({ history }) => (
      <FlatButton
        {...props}
        onClick={async () => {
          await auth.signOut();
          history.push('/login');
        }}
      >
        Log Out
      </FlatButton>
    )}
  </WithRouter>
);

export default LogoutButton;
