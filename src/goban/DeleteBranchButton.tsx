import React from 'react';
import { useGoGameContext } from './GoGameContext';
import FlatButton from 'components/FlatButton';
import { Trash2 } from 'react-feather';
import { purple } from 'style';
import styled from 'styled-components';
import { deleteBranch } from './gameTreeActions';

const DeleteButton = styled(FlatButton)`
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
`;

const DeleteBranchButton: React.FC = () => {
  const { gameState, goToNode, getNode, dispatch } = useGoGameContext();
  const { unsavedChanges, node } = gameState;

  if (!unsavedChanges) return null;

  return (
    <DeleteButton
      disabled={!getNode(node).parent}
      onClick={() => {
        goToNode(getNode(node).parent);
        dispatch(deleteBranch(node));
      }}
    >
      <Trash2 stroke={purple[90]} />
    </DeleteButton>
  );
};

export default DeleteBranchButton;
