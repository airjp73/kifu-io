import omit from 'lodash/omit';
import {
  SetPointAction,
  SET_POINT,
  CAPTURE,
  CaptureAction,
  SET_NODE,
  SetNodeAction,
  POP_HISTORY,
  PUSH_HISTORY,
  PushHistoryAction,
  PopHistoryAction,
  InitAction,
  INIT,
} from './actions';
import { SET_PROPERTY, SetPropertyAction } from './propertiesActions';
import { GameNode } from 'parseSgf/parseSgf';
import { StoneColor } from 'components/Goban';
import { SET_MOVE_STATE, SetMoveStateAction } from './moveStateActions';

export type GameStateAction =
  | CaptureAction
  | InitAction
  | PopHistoryAction
  | PushHistoryAction
  | SetMoveStateAction
  | SetNodeAction
  | SetPointAction
  | SetPropertyAction;

export interface BoardState {
  [key: string]: StoneColor | null;
}
const setPoints = (state: BoardState, action: SetPointAction) => {
  const nextState = { ...state };
  action.points.forEach(point => (nextState[point] = action.value));
  return nextState;
};
const boardStateReducer = (
  state: BoardState,
  action: GameStateAction
): BoardState => {
  switch (action.type) {
    case SET_POINT:
      return setPoints(state, action);
    case CAPTURE:
      return omit(state, action.points);
    default:
      return state;
  }
};

export interface GameStateProperties {
  boardSize?: [number, number];
  application?: { name: string; version: string };
  variationDisplay?: { show: boolean; showFor: 'NEXT_MOVE' | 'CURRENT_MOVE' };
}
const propertiesReducer = (
  state: GameStateProperties,
  action: GameStateAction
): GameStateProperties => {
  switch (action.type) {
    case SET_PROPERTY:
      return {
        ...state,
        ...action.properties,
      };
    default:
      return state;
  }
};

const nodeReducer = (state: GameNode, action: GameStateAction): GameNode => {
  if (action.type === SET_NODE) {
    return action.node;
  } else {
    return state;
  }
};

export interface MoveState {
  circles: string[];
  squares: string[];
  triangles: string[];
  lines: [string, string][];
  comment?: string;
  name?: string;
}
const defaultMoveState: MoveState = {
  circles: [],
  squares: [],
  triangles: [],
  lines: [],
};
const moveStateReducer = (
  state: MoveState = defaultMoveState,
  action: GameStateAction
): MoveState => {
  switch (action.type) {
    case SET_MOVE_STATE:
      return {
        ...state,
        ...action.moveState,
      };
    default:
      return state;
  }
};

export interface CaptureCounts {
  b: number;
  w: number;
}
const defaultCaptureCounts: CaptureCounts = {
  b: 0,
  w: 0,
};
const captureCountReducer = (
  state: CaptureCounts = defaultCaptureCounts,
  action: GameStateAction
): CaptureCounts => {
  switch (action.type) {
    case CAPTURE: {
      // Increment captures for w if black stones captured
      const color = action.color === 'b' ? 'w' : 'b';
      return {
        ...state,
        [color]: state[color] + action.points.length,
      };
    }
    default:
      return state;
  }
};

export interface GameState {
  properties: GameStateProperties;
  boardState: BoardState;
  node: GameNode;
  moveState: MoveState;
  captureCounts: CaptureCounts;
}
export interface GameStateWithHistory extends GameState {
  history: GameState[];
}
const defaultState: GameStateWithHistory = {
  boardState: {},
  properties: {},
  node: {},
  moveState: defaultMoveState,
  captureCounts: defaultCaptureCounts,
  history: [],
};
const gameStateReducer = (
  state: GameStateWithHistory = defaultState,
  action: GameStateAction
): GameStateWithHistory => {
  const {
    boardState,
    properties,
    node,
    moveState,
    captureCounts,
    history,
  } = state;

  switch (action.type) {
    case INIT:
      return defaultState;
    case POP_HISTORY:
      return {
        ...history[history.length - 1],
        history: history.slice(0, history.length - 1),
      };
    case PUSH_HISTORY:
      return {
        ...state,
        moveState: defaultMoveState, // Wipe move state
        history: [
          ...history,
          { boardState, properties, node, moveState, captureCounts },
        ],
      };
    default:
      return {
        boardState: boardStateReducer(boardState, action),
        properties: propertiesReducer(properties, action),
        node: nodeReducer(node, action),
        moveState: moveStateReducer(moveState, action),
        captureCounts: captureCountReducer(captureCounts, action),
        history: history,
      };
  }
};

export default gameStateReducer;
