import React from 'react';
import Layout from 'components/Layout';
import LoginForm from 'forms/LoginForm';
import { RouteComponentProps } from 'react-router-dom';

const Login: React.FunctionComponent<Partial<RouteComponentProps>> = ({
  location,
  history,
}) => (
  <Layout>
    <LoginForm
      onAuthSuccess={() =>
        history.push(location.state ? location.state.from : '/')
      }
    />
  </Layout>
);

export default Login;
