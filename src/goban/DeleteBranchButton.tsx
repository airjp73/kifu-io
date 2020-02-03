import React from 'react';
import { useGoGameContext } from './GoGameContext';
import FlatButton from 'components/FlatButton';
import { Trash2 } from 'react-feather';
import { purple } from 'style';
import styled, { css } from 'styled-components';
import { deleteBranch } from './gameTreeActions';

const DeleteButton = styled(FlatButton)`
  position: sticky;
  top: 95%;
  left: 95%;
`;

const DeleteBranchButton: React.FC = () => {
  const { gameState, goToNode, getNode, dispatch } = useGoGameContext();
  const { editMode, node } = gameState;

  if (!editMode) return null;

  return (
    <DeleteButton
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
