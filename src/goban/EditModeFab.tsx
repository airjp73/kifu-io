import React from 'react';
import { Edit, Save } from 'react-feather';
import Fab from 'components/Fab';
import { useGoGameContext } from './GoGameContext';
import { startEditing } from './actions';

const EditModeFab: React.FC = () => {
  const {
    gameState: { editMode },
    dispatch,
  } = useGoGameContext();

  return (
    <Fab highlighted={editMode} onClick={() => dispatch(startEditing())}>
      {editMode ? <Save /> : <Edit />}
    </Fab>
  );
};

export default EditModeFab;
