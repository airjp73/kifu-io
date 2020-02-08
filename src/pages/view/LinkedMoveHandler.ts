import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGoGameContext } from 'goban/GoGameContext';
import getLinkedNode from './getLinkedNode';
import { toast } from 'react-toastify';

const LinkedMoveHandler: React.FC = () => {
  const { gameTree, goToNode } = useGoGameContext();
  const location = useLocation();

  useEffect(() => {
    const move = new URLSearchParams(decodeURIComponent(location.search)).get(
      'move'
    );
    if (!move) return;

    const nodeId = getLinkedNode(gameTree, move);
    if (nodeId) goToNode(nodeId);
    else
      toast.error('Invalid move specified in url', {
        containerId: 'game-view',
      });
  }, []);

  return null;
};

export default LinkedMoveHandler;
