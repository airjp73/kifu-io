import React from 'react';
import styled from 'styled-components';
import { highlightFaded } from 'style';
import FontIcon from './FontIcon';

interface UserAvatarProps {
  photoURL: string;
}

const AvatarCircle = styled.object`
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 50%;

  /* Styles that are visible when no image is available */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${highlightFaded};
`;

const UserAvatar: React.FunctionComponent<UserAvatarProps> = ({ photoURL }) => (
  <AvatarCircle data={photoURL} type="image/png">
    <FontIcon icon="person" size="MSMALL" />
  </AvatarCircle>
);

export default UserAvatar;
