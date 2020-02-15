import React from 'react';
import { Save } from 'react-feather';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import Fab from 'components/Fab';
import { useGoGameContext } from './GoGameContext';
import { sgfCopied } from './actions';
import { Prompt, useHistory } from 'react-router-dom';
import { Location } from 'history';
import createSgfFromGameTree from './parseSgf/createSgfFromGameTree';
import uploadSgf from 'forms/uploadSgf';
import useCurrentUser from 'hooks/useCurrentUser';

const MotionFab = motion.custom(Fab);

type LocationState = { afterSave: boolean };

const EditModeFab: React.FC = () => {
  const {
    gameState: { unsavedChanges, gameTree },
    dispatch,
  } = useGoGameContext();
  const history = useHistory<LocationState>();
  const [currentUser] = useCurrentUser();

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

  if (!unsavedChanges) return null;

  return (
    <>
      <Prompt
        when={unsavedChanges}
        message={(location: Location<LocationState>) =>
          location.state?.afterSave ||
          'You have unsaved changes, are you sure you want to leave?'
        }
      />
      <MotionFab
        highlighted
        onClick={handleSave}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'tween', duration: 0.1 }}
      >
        <Save />
      </MotionFab>
    </>
  );
};

export default EditModeFab;
