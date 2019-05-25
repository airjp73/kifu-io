import React from 'react';
import styled from 'styled-components';
import firebase from 'api/firebase';
import useFormState from 'hooks/useFormState';
import useCurrentUser from 'hooks/useCurrentUser';
import Input from 'components/Input';

/**
 * This form purposefully does not use a form library.
 * It's generally not a bad idea to hand-roll login forms
 * because the library _could_ theoretically be a point of vulnerability
 */
const auth = firebase.auth();

const Form = styled.form`
  max-width: 800px;
  margin: 0 auto;
`;

const LoginForm = () => {
  const currentUser = useCurrentUser();
  const [username, onUsernameChange] = useFormState();
  const [password, onPasswordChange] = useFormState();

  return (
    <Form onSubmit={e => e.preventDefault()}>
      <h1>Log In</h1>
      {currentUser && (
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
      )}
      <Input
        label="Email"
        icon="email"
        value={username}
        onChange={onUsernameChange}
      />
      <Input
        label="Password"
        icon="lock"
        type="password"
        value={password}
        onChange={onPasswordChange}
      />
      <button
        type="submit"
        onClick={() => auth.signInWithEmailAndPassword(username, password)}
      >
        Login
      </button>
      <button
        type="submit"
        onClick={() => auth.createUserWithEmailAndPassword(username, password)}
      >
        Register
      </button>
      {currentUser && (
        <button type="submit" onClick={() => auth.signOut()}>
          Log Out
        </button>
      )}
    </Form>
  );
};

export default LoginForm;
