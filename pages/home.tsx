import React from 'react';
import Layout from 'components/Layout';
import SimpleContent from 'components/SimpleContent';
import LoginForm from 'forms/LoginForm';

const Home = () => (
  <Layout>
    <SimpleContent>
      <h1>Welcome!</h1>
      <p>
        This website is currently under construction. You can view a sample sgf
        by choosing "View Sample Sgf" from the menu
      </p>
      <LoginForm />
    </SimpleContent>
  </Layout>
);

export default Home;
