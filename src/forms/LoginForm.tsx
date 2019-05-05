import React, { useState } from 'react';
import styled from 'styled-components';
import firebase from 'api/firebase';
import Input from 'components/Input';
import useCurrentUser from 'hooks/useCurrentUser';

/**
 * This form purposefully does not use a form library.
 * It's generally not a bad idea to hand-roll login forms
 * because the library _could_ theoretically be a point of vulnerability
 */
const auth = firebase.auth();

function useFormState() {
  const [state, setState] = useState(null);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setState(event.target.value);
  return [state, onChange];
}

const Form = styled.form`
  max-width: 500px;
  margin: 0 auto;
`;

const LoginForm = () => {
  const currentUser = useCurrentUser();
  const [username, onUsernameChange] = useFormState();
  const [password, onPasswordChange] = useFormState();

  return (
    <Form onSubmit={e => e.preventDefault()}>
      {currentUser && <h1>{currentUser.email}</h1>}
      <Input
        label="Username"
        icon="person"
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
