import React from 'react';
import firebase from 'api/firebase';
import { css } from 'styled-components';
import 'styled-components/macro';
import WithRouter from 'components/WithRouter';
import FlatButton from './FlatButton';
import MediaQueryView, { LandscapeView, PortraitView } from './MediaQueryView';

const auth = firebase.auth();

const LogoutButton: React.FunctionComponent<
  React.ComponentProps<typeof FlatButton>
> = props => (
  <WithRouter>
    {({ history }) => (
      <FlatButton
        css={css`
          white-space: nowrap;
          overflow: hidden;

          > svg {
            flex-shrink: 0;
          }
        `}
        {...props}
        onClick={async () => {
          await auth.signOut();
          history.push('/login');
        }}
      >
        <LandscapeView>
          <MediaQueryView minWidth={1000}>Log Out</MediaQueryView>
        </LandscapeView>
        <PortraitView>Log Out</PortraitView>
      </FlatButton>
    )}
  </WithRouter>
);

export default LogoutButton;
