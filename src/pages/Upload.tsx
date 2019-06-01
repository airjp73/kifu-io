import React from 'react';
import useCurrentUser from 'hooks/useCurrentUser';

const Upload = () => {
  const [currentUser] = useCurrentUser();
  return (
    <div style={{ width: '100%' }}>
      <h1>Let's upload! {currentUser.displayName}</h1>
    </div>
  );
};

export default Upload;
