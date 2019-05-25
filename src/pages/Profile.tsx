import React from 'react';
import useCurrentUser from 'hooks/useCurrentUser';

const Profile = () => {
  const [currentUser] = useCurrentUser();
  return (
    <div style={{ width: '100%' }}>
      <h1>Welcome {currentUser.displayName}</h1>
      <p>Coming soon: A list of all your uploaded sgfs</p>
    </div>
  );
};

export default Profile;
