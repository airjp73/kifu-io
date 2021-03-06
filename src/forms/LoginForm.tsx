import React from 'react';
import styled from 'styled-components';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebaseNamespace from 'firebase/app';
import firebaseApp from 'api/firebase';

interface LoginFormProps {
  onAuthSuccess?: () => void;
  header?: string;
}

const auth = firebaseApp.auth();

const Form = styled.div`
  max-width: 800px;
  margin: 0 auto;
  overflow: auto;
  height: 100%;

  h1 {
    min-width: 300px;
  }
`;

const LoginForm: React.FunctionComponent<LoginFormProps> = ({
  onAuthSuccess,
  header = 'You must have an account to continue',
}) => (
  <Form>
    {!!header && <h1>{header}</h1>}
    <StyledFirebaseAuth
      uiConfig={{
        signInFlow: 'popup', // Only does a popup for third-party auth providers
        callbacks: {
          signInSuccessWithAuthResult: () => {
            // We want to return before we call the callback
            // That way firebase updates the auth state before we update ours
            onAuthSuccess && setTimeout(() => onAuthSuccess(), 0);
            return false;
          },
        },
        signInOptions: [
          firebaseNamespace.auth.EmailAuthProvider.PROVIDER_ID,
          firebaseNamespace.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        credentialHelper: 'none',
      }}
      firebaseAuth={auth}
    />
  </Form>
);

export default LoginForm;
