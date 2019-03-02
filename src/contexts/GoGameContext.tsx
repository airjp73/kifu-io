import React, { useContext, useMemo, useReducer, useEffect } from 'react';
import parseSgf from 'parseSgf';
import { Point } from 'components/Goban';
import { GameNode } from 'parseSgf/parseSgf';

// Interfaces
interface GameContext {
  forward: (numMoves: number) => void;
  back: (numMoves: number) => void;
  gameState: GameState;
}

interface BoardState {
  [key: string]: Point;
}

interface GameProperties {
  [key: string]: string;
}

interface GameState {
  properties: GameProperties;
  boardState: BoardState;
}

interface GameHistoryEntry {
  node: GameNode;
  gameState: GameState;
}

interface Action {
  type: string;
}

// Action constants
const SET_POINT = 'SET_POINT';
const POP_HISTORY = 'POP_HISTORY';
const PUSH_HISTORY = 'PUSH_HISTORY';

// Actions
interface SetPointAction extends Action {
  type: typeof SET_POINT;
  points: string[];
  value: Point;
}
const setPoint = (points: string[], value: Point): SetPointAction => ({
  type: SET_POINT,
  points,
  value,
});
const setPoints = (state: BoardState, action: SetPointAction) => {
  const nextState = { ...state };
  action.points.forEach(point => (nextState[point] = action.value));
  return nextState;
};

interface PushHistoryAction {
  type: typeof PUSH_HISTORY;
  node: GameNode;
  moveActions: Action[];
}
const pushHistory = (
  node: GameNode,
  moveActions: Action[]
): PushHistoryAction => ({
  type: PUSH_HISTORY,
  node,
  moveActions,
});

interface PopHistoryAction {
  type: typeof POP_HISTORY;
}
const popHistory = (): PopHistoryAction => ({ type: POP_HISTORY });

// Reducers
const boardStateReducer = (state: BoardState, action: Action): BoardState => {
  switch (action.type) {
    case SET_POINT:
      return setPoints(state, action as SetPointAction);
    default:
      return state;
  }
};

const propertiesReducer = (
  state: GameProperties,
  action: Action
): GameProperties => {
  return {};
};

const gameStateReducer = (state: GameState, action: Action): GameState => {
  const { boardState, properties } = state;
  return {
    boardState: boardStateReducer(boardState, action),
    properties: propertiesReducer(properties, action),
  };
};

const gameReducer = (
  state: GameHistoryEntry[],
  action: PopHistoryAction | PushHistoryAction
) => {
  switch (action.type) {
    case POP_HISTORY:
      return state.slice(0, state.length - 1);
    case PUSH_HISTORY:
      return [
        ...state,
        {
          node: action.node,
          gameState: action.moveActions.reduce(
            (prev, next) => gameStateReducer(prev, next),
            state.length
              ? state[state.length - 1].gameState
              : { boardState: {}, properties: {} }
          ),
        },
      ];
    default:
      return state;
  }
};

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
  const [gameHistory, dispatch] = useReducer(gameReducer, []);
  const current = gameHistory.length
    ? gameHistory[gameHistory.length - 1]
    : null;

  const nextMove = (node: GameNode) => {
    const nextNode = node || current.node.children[0];
    const properties = nextNode.properties || {};
    const moveActions = [];

    if (properties.B) {
      moveActions.push(setPoint(properties.B, 'b'));
    }
    if (properties.W) {
      moveActions.push(setPoint(properties.W, 'w'));
    }
    if (properties.AB) {
      moveActions.push(setPoint(properties.AB, 'b'));
    }
    if (properties.AW) {
      moveActions.push(setPoint(properties.AW, 'w'));
    }

    dispatch(pushHistory(nextNode, moveActions));
  };

  const previousMove = () => dispatch(popHistory());

  const forward = (numMoves: number) => {
    let nextNode = current.node.children && current.node.children[0];
    for (let i = 0; (i < numMoves || numMoves === -1) && nextNode; ++i) {
      nextMove(nextNode);
      nextNode = nextNode.children && nextNode.children[0];
    }
  };

  const back = (numMoves: number) => {
    const targetMove = numMoves === -1 ? 1 : Math.max(gameHistory.length - numMoves, 1);
    for (let i = gameHistory.length; i > targetMove; --i) {
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
        gameState: current
          ? current.gameState
          : { boardState: {}, properties: {} },
      }}
    >
      {children}
    </GoGameContext.Provider>
  );
};
