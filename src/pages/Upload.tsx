import React from 'react';
import useCurrentUser from 'hooks/useCurrentUser';
import UploadSgfForm from 'forms/UploadSgfForm';
import SimpleContent from 'components/SimpleContent';

const Upload = () => {
  const [currentUser] = useCurrentUser();
  return (
    <div style={{ width: '100%' }}>
      <h1>Let's upload! {currentUser.displayName}</h1>
      <SimpleContent>
        <UploadSgfForm />
      </SimpleContent>
    </div>
  );
};

export default Upload;
