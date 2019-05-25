import React from 'react';
import useCurrentUser from 'hooks/useCurrentUser';

const Profile = () => {
  const [currentUser] = useCurrentUser();
  return <h1>Welcome {currentUser.displayName}</h1>;
};

export default Profile;
