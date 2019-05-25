import React from 'react';
import LoginForm from 'forms/LoginForm';
import { RouteComponentProps } from 'react-router-dom';

const Login: React.FunctionComponent<Partial<RouteComponentProps>> = ({
  location,
  history,
}) => (
  <LoginForm
    onAuthSuccess={() =>
      history.push(location.state ? location.state.from : '/profile')
    }
  />
);

export default Login;
