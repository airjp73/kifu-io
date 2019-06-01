import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import firebase from 'api/firebase';
import FlatButton from './FlatButton';

const auth = firebase.auth();

const LogoutButton: React.FunctionComponent<
  React.ComponentProps<typeof FlatButton> & Partial<RouteComponentProps>
> = ({ history, ...rest }) => (
  <FlatButton
    {...rest}
    onClick={async () => {
      await auth.signOut();
      history.push('/login');
    }}
  >
    Log Out
  </FlatButton>
);

export default withRouter(LogoutButton);
