import React from 'react';
import Layout from 'components/Layout';
import useCurrentUser from 'hooks/useCurrentUser';

const Profile = () => {
  const currentUser = useCurrentUser();
  return (
    <Layout>
      <h1>Welcome {currentUser.displayName}</h1>
    </Layout>
  );
};

export default Profile;
