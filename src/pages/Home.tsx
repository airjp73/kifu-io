import React from 'react';
import Layout from 'components/Layout';
import SimpleContent from 'components/SimpleContent';

const Home = () => (
  <Layout>
    <SimpleContent>
      <h1>Welcome!</h1>
      <p>
        This website is currently under construction. You can view a sample sgf
        by choosing "View Sample Sgf" from the menu. You can also sign up on the
        login page, though you won't get anything for it yet!
      </p>
    </SimpleContent>
  </Layout>
);

export default Home;
