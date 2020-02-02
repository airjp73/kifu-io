import React from 'react';
import { Edit, Save } from 'react-feather';
import Fab from 'components/Fab';
import { useGoGameContext } from './GoGameContext';
import { startEditing, stopEditing } from './actions';
import { Prompt, useHistory } from 'react-router-dom';
import { Location } from 'history';
import createSgfFromGameTree from './parseSgf/createSgfFromGameTree';
import uploadSgf from 'forms/uploadSgf';
import useCurrentUser from 'hooks/useCurrentUser';

type LocationState = { afterSave: boolean };

const EditModeFab: React.FC = () => {
  const {
    gameState: { editMode, gameTree },
    dispatch,
  } = useGoGameContext();
  const history = useHistory<LocationState>();
  const [currentUser] = useCurrentUser();

  const handleEdit = () => dispatch(startEditing());

  const handleSave = async () => {
    const sgf = createSgfFromGameTree(gameTree);
    const docId = await uploadSgf(sgf, currentUser);
    if (docId) {
      history.push(`/view/${docId}`, { afterSave: true });
      dispatch(stopEditing());
    }
  };

  return (
    <>
      <Prompt
        when={editMode}
        message={(location: Location<LocationState>) =>
          location.state?.afterSave ||
          'You have unsaved changes, are you sure you want to leave?'
        }
      />
      <Fab highlighted={editMode} onClick={editMode ? handleSave : handleEdit}>
        {editMode ? <Save /> : <Edit />}
      </Fab>
    </>
  );
};

export default EditModeFab;
