import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGoGameContext } from 'goban/GoGameContext';
import getLinkedNode from './getLinkedNode';
import { toast } from 'react-toastify';

const LinkedMoveHandler: React.FC = () => {
  const { gameTree, goToNode } = useGoGameContext();
  const location = useLocation();

  useEffect(() => {
    try {
      const decodedSearchParams = decodeURIComponent(location.search);
      const move = new URLSearchParams(decodedSearchParams).get('move');
      if (!move) return;

      const nodeId = getLinkedNode(gameTree, move);
      if (!nodeId) throw new Error('invalid path');

      goToNode(nodeId);
    } catch (err) {
      toast.error('Invalid move specified in url', {
        containerId: 'game-view',
      });
    }
  }, []);

  return null;
};

export default LinkedMoveHandler;
