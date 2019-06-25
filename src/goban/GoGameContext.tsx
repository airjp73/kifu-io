import React, { useContext, useEffect, useCallback } from 'react';
import { GameTree, GameTreeNode } from 'goban/parseSgf/normalizeGameTree';
import useThunkReducer from 'hooks/useThunkReducer';
import gameStateReducer, { GameStateWithHistory } from './gameStateReducer';
import { pushHistory, setNode, popHistory, init } from './actions';
import processNode from './processNode';

// Interfaces
export interface GameContext {
  back: (numMoves: number) => void;
  forward: (numMoves: number) => void;
  gameState: GameStateWithHistory;
  gameTree: GameTree;
  getNode: (nodeId: string) => GameTreeNode;
  goToNode: (node: string) => void;
}

export interface Action {
  type: string;
}

// Context
const GoGameContext = React.createContext<GameContext>(null);

// Context Consumer hook
export const useGoGameContext = () => useContext(GoGameContext);

// Context Provider component
interface GoGameContextProviderProps {
  gameTree: GameTree;
}
export const GoGameContextProvider: React.FunctionComponent<
  GoGameContextProviderProps
> = ({ children, gameTree }) => {
  const [gameState, dispatch] = useThunkReducer(
    gameStateReducer,
    gameStateReducer(undefined, init()) // TODO: tweak hook to allow an init function
  );

  const getNode = useCallback((nodeId: string) => gameTree.nodes[nodeId], [
    gameTree.nodes,
  ]);

  const getNodeChild = useCallback(
    (nodeId: string, index: number) =>
      gameTree.nodes[nodeId].children && gameTree.nodes[nodeId].children[index],
    [gameTree.nodes]
  );

  const nextMove = useCallback(
    (nodeId: string) => {
      dispatch(pushHistory());
      dispatch(setNode(nodeId));
      processNode(gameTree.nodes[nodeId], dispatch);
    },
    [dispatch, gameTree.nodes]
  );

  const previousMove = useCallback(() => dispatch(popHistory()), [dispatch]);

  const forward = useCallback(
    (numMoves: number) => {
      let nextNode = getNodeChild(gameState.node, 0);
      for (let i = 0; (i < numMoves || numMoves === -1) && nextNode; ++i) {
        nextMove(nextNode);
        nextNode = getNodeChild(nextNode, 0);
      }
    },
    [getNodeChild, gameState.node, nextMove]
  );

  const back = useCallback(
    (numMoves: number) => {
      const targetMove =
        numMoves === -1 ? 1 : Math.max(gameState.history.length - numMoves, 1);
      for (let i = gameState.history.length; i > targetMove; --i) {
        previousMove();
      }
    },
    [previousMove, gameState.history.length]
  );

  const goToNode = useCallback(
    (nodeId: string) => {
      if (getNode(nodeId).parent) goToNode(getNode(nodeId).parent);
      else dispatch(init());
      nextMove(nodeId);
    },
    [nextMove, dispatch, getNode]
  );

  // Go to first move on mount
  // eslint-disable-next-line
  useEffect(() => nextMove(gameTree.rootNode), []);

  return (
    <GoGameContext.Provider
      value={{
        back,
        forward,
        gameState,
        gameTree,
        getNode,
        goToNode,
      }}
    >
      {gameState.node && children}
    </GoGameContext.Provider>
  );
};
