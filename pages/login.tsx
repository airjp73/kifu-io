import React from 'react';
import Layout from 'components/Layout';
import SimpleContent from 'components/SimpleContent';
import LoginForm from 'forms/LoginForm';

const Login = () => (
  <Layout>
    <SimpleContent>
      <LoginForm />
    </SimpleContent>
  </Layout>
);

export default Login;
