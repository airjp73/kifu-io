import React from 'react';
import firebase from 'api/firebase';
import { css } from 'styled-components';
import 'styled-components/macro';
import WithRouter from 'components/WithRouter';
import FlatButton from './FlatButton';
import MediaQueryView, { LandscapeView, PortraitView } from './MediaQueryView';
import { purple } from 'style';

const auth = firebase.auth();

const LogoutButton: React.FunctionComponent<React.ComponentProps<
  typeof FlatButton
>> = props => (
  <WithRouter>
    {({ history }) => (
      <FlatButton
        css={css`
          white-space: nowrap;
          overflow: hidden;

          > svg {
            flex-shrink: 0;
          }

          :not(:disabled) {
            &:hover,
            &:focus {
              background-color: ${purple[60]};
            }

            &:active {
              background-color: ${purple[80]};
            }
          }
        `}
        {...props}
        onClick={async () => {
          await auth.signOut();
          history.push('/login');
        }}
      >
        <LandscapeView>
          <MediaQueryView minWidth={1200}>Log Out</MediaQueryView>
        </LandscapeView>
        <PortraitView>Log Out</PortraitView>
      </FlatButton>
    )}
  </WithRouter>
);

export default LogoutButton;
