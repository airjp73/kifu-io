import React from 'react';
import styled from 'styled-components';

interface UserAvatarProps {
  photoURL: string;
  displayName: string;
}

const AvatarCircle = styled.img`
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 50%;
`;

const UserAvatar: React.FunctionComponent<UserAvatarProps> = ({
  displayName,
  photoURL,
}) => <AvatarCircle src={photoURL} alt={displayName} />;

export default UserAvatar;
