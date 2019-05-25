import React from 'react';
import styled from 'styled-components';
import { highlightFaded, panelBackground } from 'style';
import FontIcon from './FontIcon';

interface UserAvatarProps {
  photoURL: string;
}

const AvatarCircle = styled.object`
  height: 2rem;
  width: 2rem;
  border-radius: 50%;

  /* Styles that are visible when no image is available */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${highlightFaded};
  color: ${panelBackground};
`;

const UserAvatar: React.FunctionComponent<UserAvatarProps> = ({ photoURL }) => (
  <AvatarCircle data={photoURL} type="image/png">
    <FontIcon icon="person" size="SMALL" />
  </AvatarCircle>
);

export default UserAvatar;
