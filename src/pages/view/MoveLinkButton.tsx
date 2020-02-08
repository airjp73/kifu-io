import React from 'react';
import { Share2 } from 'react-feather';
import SpeedDialOption from 'components/SpeedDialOption';
import { useGoGameContext } from 'goban/GoGameContext';
import constructMoveLinkString from './constructMoveLinkString';
import { toast } from 'react-toastify';

type MoveLinkButtonProps = Omit<
  React.ComponentProps<typeof SpeedDialOption>,
  'label' | 'onClick'
>;

const MoveLinkButton: React.FC<MoveLinkButtonProps> = props => {
  const { gameState, gameTree } = useGoGameContext();

  const copyMoveLink = () => {
    try {
      const moveLink = constructMoveLinkString(gameTree, gameState.node);
      toast.success(moveLink, { containerId: 'game-view' });
    } catch (error) {
      toast.error('Failed to create link to move', {
        containerId: 'game-view',
      });
    }
  };

  return (
    <SpeedDialOption label="Share move" onClick={copyMoveLink} {...props}>
      <Share2 />
    </SpeedDialOption>
  );
};

export default MoveLinkButton;
