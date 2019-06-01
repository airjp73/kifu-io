import React from 'react';
import 'styled-components/macro';
import useCurrentUser from 'hooks/useCurrentUser';
import LogoutButton from 'components/LogoutButton';

const Profile = () => {
  const [currentUser] = useCurrentUser();
  return (
    <div style={{ width: '100%' }}>
      <h1>Welcome {currentUser.displayName}</h1>
      <p>Coming soon: A list of all your uploaded sgfs</p>
      <LogoutButton
        css={`
          position: 'absolute';
          bottom: '1rem';
          right: '1rem';
        `}
      />
    </div>
  );
};

export default Profile;
