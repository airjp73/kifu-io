import React from 'react';
import Layout from 'components/Layout';
import LoginForm from 'forms/LoginForm';

const Login = () => (
  <Layout>
    <LoginForm signInSuccessUrl="/" />
  </Layout>
);

export default Login;
