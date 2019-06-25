import React, { useMemo } from 'react';
import firebaseApp from 'api/firebase';
import useCurrentUser from 'hooks/useCurrentUser';
import LogoutButton from 'components/LogoutButton';
import useQuery from 'api/useQuery';
import Spinner from 'components/Spinner';
import { SgfFile } from 'api/apiDataTypes';

const firestore = firebaseApp.firestore();

const Profile: React.FunctionComponent = () => {
  const [currentUser] = useCurrentUser();
  const query = useMemo(
    () =>
      firestore.collection('sgfFiles').where('userId', '==', currentUser.uid),
    [currentUser.uid]
  );
  const [data, loading] = useQuery<SgfFile>(query);

  if (loading) return <Spinner />;

  return (
    <div style={{ width: '100%' }}>
      <h1>Welcome {currentUser.displayName}</h1>
      {data.map(game => (
        <p>{game.userDisplayName}</p>
      ))}
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
