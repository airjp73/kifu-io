import React from 'react';
import useCurrentUser from 'hooks/useCurrentUser';
import LogoutButton from 'components/LogoutButton';

const Profile = () => {
  const [currentUser] = useCurrentUser();
  return (
    <div style={{ width: '100%' }}>
      <h1>Welcome {currentUser.displayName}</h1>
      <p>Coming soon: A list of all your uploaded sgfs</p>
      <LogoutButton style={{ position: 'absolute', bottom: 0, right: 0 }} />
    </div>
  );
};

export default Profile;
