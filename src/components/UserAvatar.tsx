import React from 'react';
import styled from 'styled-components';
import { User } from 'react-feather';
import { highlightFaded, panelBackground } from 'style';

interface UserAvatarProps {
  photoURL: string;
}

const AvatarCircle = styled.div`
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  flex-shrink: 0;
  overflow: hidden;

  /* Styles that are visible when no image is available */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${highlightFaded};
  color: ${panelBackground};

  object {
    width: 2rem;
    height: 2rem;
  }
`;

const UserAvatar: React.FunctionComponent<UserAvatarProps> = ({ photoURL }) => (
  <AvatarCircle>
    {photoURL ? (
      <object type="image/png" data={photoURL}>
        <User />
      </object>
    ) : (
      <User />
    )}
  </AvatarCircle>
);

export default UserAvatar;
