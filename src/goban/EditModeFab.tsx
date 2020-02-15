import React from 'react';
import { Edit, Save } from 'react-feather';
import { toast } from 'react-toastify';
import Fab from 'components/Fab';
import { useGoGameContext } from './GoGameContext';
import { startEditing, sgfCopied } from './actions';
import { Prompt, useHistory } from 'react-router-dom';
import { Location } from 'history';
import createSgfFromGameTree from './parseSgf/createSgfFromGameTree';
import uploadSgf from 'forms/uploadSgf';
import useCurrentUser from 'hooks/useCurrentUser';

type LocationState = { afterSave: boolean };

const EditModeFab: React.FC = () => {
  const {
    gameState: { unsavedChanges, gameTree },
    dispatch,
  } = useGoGameContext();
  const history = useHistory<LocationState>();
  const [currentUser] = useCurrentUser();

  const handleEdit = () => dispatch(startEditing());

  const handleSave = async () => {
    const sgf = createSgfFromGameTree(gameTree);
    const docId = await uploadSgf(sgf, currentUser);
    if (docId) {
      toast.success('Sgf Copied and saved!', { containerId: 'game-view' });
      history.push(`/view/${docId}`, { afterSave: true });
      dispatch(sgfCopied());
    } else {
      toast.error('Error saving SGF', { containerId: 'game-view' });
    }
  };

  return (
    <>
      <Prompt
        when={unsavedChanges}
        message={(location: Location<LocationState>) =>
          location.state?.afterSave ||
          'You have unsaved changes, are you sure you want to leave?'
        }
      />
      <Fab
        highlighted={unsavedChanges}
        onClick={unsavedChanges ? handleSave : handleEdit}
      >
        {unsavedChanges ? <Save /> : <Edit />}
      </Fab>
    </>
  );
};

export default EditModeFab;
