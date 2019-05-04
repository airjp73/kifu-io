import React from 'react';
import Layout from 'components/Layout';
import SimpleContent from 'components/SimpleContent';
import Input from 'components/Input';

const Home = () => (
  <Layout>
    <SimpleContent>
      <h1>Welcome!</h1>
      <p>
        This website is currently under construction. You can view a sample sgf
        by choosing "View Sample Sgf" from the menu
      </p>
      <Input label="Username" icon="person" />
      <Input
        label="Password"
        icon="lock"
        type="password"
        hint="You so sneaky"
      />
    </SimpleContent>
  </Layout>
);
export default Home;
