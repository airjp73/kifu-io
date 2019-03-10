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
} from './actions';
import { GameNode } from 'parseSgf/parseSgf';
import { Point } from 'components/Goban';

export type GameStateAction =
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
  [key: string]: Point;
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

export interface GameState {
  properties: GameStateProperties;
  boardState: BoardState;
  node: GameNode;
}
export interface GameStateWithHistory extends GameState {
  history: GameState[];
}
const defaultState: GameStateWithHistory = {
  boardState: {},
  properties: {},
  node: {},
  history: [],
};
const gameStateReducer = (
  state: GameStateWithHistory = defaultState,
  action: GameStateAction
): GameStateWithHistory => {
  const { boardState, properties, node, history } = state;

  switch (action.type) {
    case POP_HISTORY:
      return {
        ...history[history.length - 1],
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

export default gameStateReducer;
