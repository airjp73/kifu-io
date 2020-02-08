import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useGoGameContext } from 'goban/GoGameContext';
import getLinkedNode from './getLinkedNode';
import { toast } from 'react-toastify';

// Setting the move based on query params
// really should only be done when the page is first loaded.
// Handling this in the reducer is also not right
// since this involves a side-effect in error cases
// TODO: This could probably be moved into the actual context init
// if the context is reworked to init as a sided-effect
function useInit(func: () => void) {
  const initFunc = useRef(func);
  useEffect(() => initFunc.current(), [initFunc]);
}

const LinkedMoveHandler: React.FC = () => {
  const { gameTree, goToNode } = useGoGameContext();
  const location = useLocation();

  useInit(() => {
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
  });

  return null;
};

export default LinkedMoveHandler;
