import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import useCurrentUser from 'hooks/useCurrentUser';
import LogoutButton from 'components/LogoutButton';

const Profile: React.FunctionComponent<Partial<RouteComponentProps>> = ({
  location,
}) => {
  const [currentUser] = useCurrentUser();
  return (
    <div style={{ width: '100%' }}>
      <h1>Welcome {currentUser.displayName}</h1>
      {location.state.uploadSucceeded && <p>Upload Succeeded!</p>}
      <p>Coming soon: A list of all your uploaded sgfs</p>
      <LogoutButton
        style={{
          position: 'absolute',
          bottom: '1rem',
          right: '1rem',
        }}
      />
    </div>
  );
};

export default Profile;
