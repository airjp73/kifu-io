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
  SetBoardSizeAction,
  SET_BOARD_SIZE,
  PushHistoryAction,
  PopHistoryAction,
  InitAction,
  SetApplicationAction,
  SetVariationDisplaySettingsAction,
  SET_APPLICATION,
  SET_VARIATION_DISPLAY_SETTINGS,
  INIT,
} from './actions';
import { GameNode } from 'parseSgf/parseSgf';
import { StoneColor } from 'components/Goban';
import {
  AddCirclesAction,
  AddSquaresAction,
  AddTrianglesAction,
  ADD_CIRCLES,
  ADD_SQUARES,
  ADD_TRIANGLES,
  ADD_LINES,
  AddLinesAction,
} from './moveStateActions';

export type GameStateAction =
  | AddCirclesAction
  | AddLinesAction
  | AddSquaresAction
  | AddTrianglesAction
  | CaptureAction
  | InitAction
  | PopHistoryAction
  | PushHistoryAction
  | SetApplicationAction
  | SetBoardSizeAction
  | SetNodeAction
  | SetPointAction
  | SetVariationDisplaySettingsAction;

export interface BoardState {
  [key: string]: StoneColor;
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
    case SET_BOARD_SIZE:
      return {
        ...state,
        boardSize: action.boardSize,
      };
    case SET_APPLICATION:
      return {
        ...state,
        application: action.application,
      };
    case SET_VARIATION_DISPLAY_SETTINGS:
      return {
        ...state,
        variationDisplay: action.variationDisplay,
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
    case ADD_CIRCLES:
      return {
        ...state,
        circles: action.circles,
      };
    case ADD_SQUARES:
      return {
        ...state,
        squares: action.squares,
      };
    case ADD_TRIANGLES:
      return {
        ...state,
        triangles: action.triangles,
      };
    case ADD_LINES:
      return {
        ...state,
        lines: action.lines,
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
