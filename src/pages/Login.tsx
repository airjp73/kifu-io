import React from 'react';
import LoginForm from 'forms/LoginForm';
import { RouteComponentProps } from 'react-router-dom';

const Login: React.FunctionComponent<Partial<RouteComponentProps>> = ({
  history,
}) => (
  <LoginForm onAuthSuccess={() => history.push('/profile')} header="Log In" />
);

export default Login;
