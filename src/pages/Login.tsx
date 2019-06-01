import React from 'react';
import LoginForm from 'forms/LoginForm';
import { RouteComponentProps } from 'react-router-dom';

const Login: React.FunctionComponent<Partial<RouteComponentProps>> = ({
  history,
}) => <LoginForm onAuthSuccess={() => history.push('/profile')} hideHeader />;

export default Login;
