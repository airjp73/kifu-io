import React from 'react';
import LoginForm from 'forms/LoginForm';
import { RouteComponentProps } from 'react-router-dom';

const Login: React.FunctionComponent<Partial<RouteComponentProps>> = ({
  location,
  history,
}) => <LoginForm onAuthSuccess={() => history.push('/profile')} />;

export default Login;
