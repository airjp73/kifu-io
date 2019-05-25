import React from 'react';
import styled from 'styled-components';
import UserAvatar from './UserAvatar';
import { highlight } from 'style';

interface UserProps {
  photoURL: string;
  displayName: string;
}

const UserWrapper = styled.div`
  display: flex;
  align-items: center;

  > :first-child {
    margin-right: 0.5rem;
  }

  > span {
    color: ${highlight};
    overflow: hidden;
    line-height: 2rem;
    text-overflow: ellipsis;
  }
`;

const User: React.FunctionComponent<UserProps> = ({
  photoURL,
  displayName,
}) => (
  <UserWrapper>
    <UserAvatar photoURL={photoURL} />
    <span>{displayName}</span>
  </UserWrapper>
);

export default User;
