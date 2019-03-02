import React, { useContext, useMemo, useReducer, useEffect } from 'react';
import parseSgf from 'parseSgf';
import omit from 'lodash/omit';
import { Point } from 'components/Goban';
import { GameNode } from 'parseSgf/parseSgf';
import useThunkReducer, { ThunkAction } from 'hooks/useThunkReducer';

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
  node: GameNode;
}

interface GameStateWithHistory extends GameState {
  history: GameState[];
}

interface Action {
  type: string;
}

// Action constants
const CAPTURE = 'CAPTURE';
const SET_NODE = 'SET_NODE';
const SET_POINT = 'SET_POINT';
const POP_HISTORY = 'POP_HISTORY';
const PUSH_HISTORY = 'PUSH_HISTORY';

// Actions
interface SetPointAction extends Action {
  type: typeof SET_POINT;
  points: string[];
  value: Point;
}
const setPoint = (points: string[], value: Point | null): SetPointAction => ({
  type: SET_POINT,
  points,
  value,
});
const setPoints = (state: BoardState, action: SetPointAction) => {
  const nextState = { ...state };
  action.points.forEach(point => (nextState[point] = action.value));
  return nextState;
};

interface CaptureAction extends Action {
  type: typeof CAPTURE;
  points: string[];
}
const captureStones = (points: string[]): CaptureAction => ({
  type: CAPTURE,
  points,
});
const charAdd = (char: string, num: number): string =>
  String.fromCharCode(char.charCodeAt(0) + num);
const getContactPointsForPoint = (point: string): string[] => {
  const xChar = point.charAt(0);
  const yChar = point.charAt(1);
  // TODO: filter on board size
  return [
    `${charAdd(xChar, 1)}${yChar}`,
    `${charAdd(xChar, -1)}${yChar}`,
    `${xChar}${charAdd(yChar, -1)}`,
    `${xChar}${charAdd(yChar, 1)}`,
  ];
};
const checkForCaptures = (
  addedStone: string,
  boardState: BoardState,
): string[] => {
  const contactedStones = getContactPointsForPoint(addedStone).filter(
    liberty => !!boardState[liberty]
  );
  const capturedStones: string[] = [];
  const selfCapturedStones: string[] = [];
  const safeStones: string[] = [];

  contactedStones.forEach(point => {
    // If stone has already been captured, or is already safe, abort
    if (capturedStones.includes(point) || safeStones.includes(point)) return;
    const color = boardState[point];
    const checkedStones: string[] = [];

    const stonesToCheck = [point];
    for (let i = 0; i < stonesToCheck.length; ++i) {
      checkedStones.push(stonesToCheck[i]);
      const liberties = getContactPointsForPoint(stonesToCheck[i]);
      for (let liberty of liberties) {
        if (!boardState[liberty] && liberty !== addedStone) {
          // Empty space, don't capture
          safeStones.push(...checkedStones);
          return;
        } else if (boardState[liberty] === color) {
          // If we've checked this stone already, then we know this group has liberties
          if (safeStones.includes(liberty)) return;
          // Same color, add to check list if we haven't checked it already
          if (!checkedStones.includes(liberty)) {
            stonesToCheck.push(liberty);
          }
        }
        // Different color, do nothing
      }
    }

    // There are rule-sets that allow suicide moves so we have to check
    if (checkedStones.includes(addedStone)) {
      selfCapturedStones.push(...checkedStones);
    } else {
      capturedStones.push(...checkedStones);
    }
  });

  // If a move is only a suicide if it doesn't capture other stones
  return capturedStones.length ? capturedStones : selfCapturedStones;
};

const placeStone = (point: string, value: Point) => {
  const actions: ThunkAction<GameStateWithHistory>[] = [
    setPoint([point], value),
  ];

  actions.push((dispatch, gameState) => {
    const capturedStones = checkForCaptures(point, gameState.boardState);
    capturedStones && dispatch(captureStones(capturedStones));
  });

  return actions;
};

interface SetNodeAction {
  type: typeof SET_NODE;
  node: GameNode;
}
const setNode = (node: GameNode): SetNodeAction => ({
  type: SET_NODE,
  node,
});

interface PushHistoryAction {
  type: typeof PUSH_HISTORY;
}
const pushHistory = (): PushHistoryAction => ({
  type: PUSH_HISTORY,
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
    case CAPTURE:
      return omit(state, (action as CaptureAction).points);
    default:
      return state;
  }
};

const propertiesReducer = (
  state: GameProperties,
  action: Action
): GameProperties => {
  return state;
};

const nodeReducer = (state: GameNode, action: Action): GameNode => {
  if (action.type === SET_NODE) return (action as SetNodeAction).node;
  else return state;
};

const gameStateReducer = (
  state: GameStateWithHistory,
  action: Action
): GameStateWithHistory => {
  const { boardState, properties, node, history } = state;

  switch (action.type) {
    case POP_HISTORY:
      return {
        ...history[history.length - 1], // TODO: Fix state when undoing
        history: history.slice(0, history.length - 1),
      };
    case PUSH_HISTORY:
      return {
        ...state,
        history: [...history, { boardState, properties, node }],
      };
    default:
      return {
        boardState: boardStateReducer(boardState, action),
        properties: propertiesReducer(properties, action),
        node: nodeReducer(node, action),
        history: history,
      };
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
  const [gameState, dispatch] = useThunkReducer(gameStateReducer, {
    boardState: {},
    properties: {},
    node: {},
    history: [],
  });

  const nextMove = (node: GameNode) => {
    const nextNode = node || gameState.node.children[0];
    const properties = nextNode.properties || {};
    dispatch(pushHistory());
    dispatch(setNode(node));

    if (properties.B) {
      placeStone(properties.B[0], 'b').forEach(dispatch);
    }
    if (properties.W) {
      placeStone(properties.W[0], 'w').forEach(dispatch);
    }
    if (properties.AB) {
      dispatch(setPoint(properties.AB, 'b'));
    }
    if (properties.AW) {
      dispatch(setPoint(properties.AW, 'w'));
    }
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
