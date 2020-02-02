import React from 'react';
import { Edit, Save } from 'react-feather';
import Fab from 'components/Fab';
import { useGoGameContext } from './GoGameContext';
import { startEditing } from './actions';
import { Prompt } from 'react-router-dom';

const EditModeFab: React.FC = () => {
  const {
    gameState: { editMode },
    dispatch,
  } = useGoGameContext();

  return (
    <>
      <Prompt
        when={editMode}
        message="You have unsaved changes, are you sure you want to leave?"
      />
      <Fab highlighted={editMode} onClick={() => dispatch(startEditing())}>
        {editMode ? <Save /> : <Edit />}
      </Fab>
    </>
  );
};

export default EditModeFab;
