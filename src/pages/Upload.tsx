import React from 'react';
import useCurrentUser from 'hooks/useCurrentUser';
import UploadSgfForm from 'forms/UploadSgfForm';

const Upload = () => {
  const [currentUser] = useCurrentUser();
  return (
    <div style={{ width: '100%' }}>
      <UploadSgfForm />
    </div>
  );
};

export default Upload;
