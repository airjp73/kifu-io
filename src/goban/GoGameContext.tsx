import React, { useContext, useEffect, useCallback } from 'react';
import { GameTree, GameTreeNode } from 'goban/parseSgf/normalizeGameTree';
import useThunkReducer, { ThunkDispatch } from 'hooks/useThunkReducer';
import gameStateReducer, { GameStateWithHistory } from './gameStateReducer';
import { pushHistory, setNode, popHistory, init } from './actions';
import processNodeProperties from './processNode';

// Interfaces
export interface GameContext {
  back: (numMoves: number) => void;
  forward: (numMoves: number) => void;
  gameState: GameStateWithHistory;
  gameTree: GameTree;
  getNode: (nodeId: string) => GameTreeNode;
  goToNode: (node: string) => void;
  dispatch: ThunkDispatch<GameStateWithHistory>;
}

export interface Action {
  type: string;
}

// Context
const GoGameContext = React.createContext<GameContext | null>(null);

// Context Consumer hook
export const useGoGameContext = (): GameContext => {
  const contextValue = useContext(GoGameContext);
  if (!contextValue)
    throw new Error(
      'Attempted to access go game context but it was not found.'
    );
  return contextValue;
};

// Context Provider component
interface GoGameContextProviderProps {
  gameTree: GameTree;
}
export const GoGameContextProvider: React.FunctionComponent<GoGameContextProviderProps> = ({
  children,
  gameTree: passedGameTree,
}) => {
  const [gameState, dispatch] = useThunkReducer(
    gameStateReducer,
    gameStateReducer(undefined, init(passedGameTree)) // TODO: tweak hook to allow an init function
  );
  const gameTree = gameState.gameTree;

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
      processNodeProperties(gameTree.nodes[nodeId].properties, dispatch);
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
      else dispatch(init(gameTree));
      nextMove(nodeId);
    },
    [nextMove, dispatch, getNode, gameTree]
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
        gameTree: gameState.gameTree,
        getNode,
        goToNode,
        dispatch,
      }}
    >
      {gameState.node && children}
    </GoGameContext.Provider>
  );
};
