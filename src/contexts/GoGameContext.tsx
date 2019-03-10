import React, { useContext, useMemo, useEffect } from 'react';
import parseSgf from 'parseSgf';
import { Point } from 'components/Goban';
import { GameNode } from 'parseSgf/parseSgf';
import useThunkReducer from 'hooks/useThunkReducer';
import gameStateReducer from './reducers';
import {
  pushHistory,
  setNode,
  setPoint,
  popHistory,
  setBoardSize,
  init,
} from './actions';
import placeStone from './placeStone';
import processNode from './processNode';

// Interfaces
export interface GameContext {
  forward: (numMoves: number) => void;
  back: (numMoves: number) => void;
  gameState: GameState;
}

export interface BoardState {
  [key: string]: Point;
}

export interface GameStateProperties {
  boardSize?: [number, number];
}

export interface GameState {
  properties: GameStateProperties;
  boardState: BoardState;
  node: GameNode;
}

export interface GameStateWithHistory extends GameState {
  history: GameState[];
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
  sgf: string;
}
export const GoGameContextProvider: React.FunctionComponent<
  GoGameContextProviderProps
> = ({ children, sgf }) => {
  const gameTree = useMemo(() => parseSgf(sgf), [sgf]);
  const [gameState, dispatch] = useThunkReducer(
    gameStateReducer,
    gameStateReducer(undefined, init()) // TODO: tweak hook to allow an init function
  );

  const nextMove = (node: GameNode) => {
    const nextNode = node || gameState.node.children[0];
    dispatch(pushHistory());
    dispatch(setNode(node));
    processNode(nextNode, dispatch);
  };

  const previousMove = () => dispatch(popHistory());

  const forward = (numMoves: number) => {
    let nextNode = gameState.node.children && gameState.node.children[0];
    for (let i = 0; (i < numMoves || numMoves === -1) && nextNode; ++i) {
      nextMove(nextNode);
      nextNode = nextNode.children && nextNode.children[0];
    }
  };

  const back = (numMoves: number) => {
    const targetMove =
      numMoves === -1 ? 1 : Math.max(gameState.history.length - numMoves, 1);
    for (let i = gameState.history.length; i > targetMove; --i) {
      previousMove();
    }
  };

  // Go to first move on mount
  useEffect(() => nextMove(gameTree[0]), []);

  return (
    <GoGameContext.Provider
      value={{
        forward,
        back,
        gameState,
      }}
    >
      {children}
    </GoGameContext.Provider>
  );
};
