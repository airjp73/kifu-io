import React from 'react';
import { Share2 } from 'react-feather';
import SpeedDialOption from 'components/SpeedDialOption';
import { useGoGameContext } from 'goban/GoGameContext';
import constructMoveLinkString from './constructMoveLinkString';
import { toast } from 'react-toastify';
import copyToClipboard from './copyToClipboard';

type MoveLinkButtonProps = Omit<
  React.ComponentProps<typeof SpeedDialOption>,
  'label' | 'onClick'
>;

const withFullLink = (param: string): string => {
  const { origin, pathname } = document.location;
  return `${origin}${pathname}?move=${param}`;
};

const MoveLinkButton: React.FC<MoveLinkButtonProps> = props => {
  const { gameState, gameTree } = useGoGameContext();

  const copyMoveLink = () => {
    try {
      const moveParam = constructMoveLinkString(gameTree, gameState.node);
      const encodedParam = encodeURIComponent(moveParam);
      const moveLink = withFullLink(encodedParam);
      copyToClipboard(moveLink);

      toast.success('Link copied to clipboard', { containerId: 'game-view' });
    } catch {
      toast.error('Failed to construct link to current move', {
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
