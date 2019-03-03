import omit from 'lodash/omit';
import { BoardState, Action, GameStateProperties, GameStateWithHistory } from "./GoGameContext";
import { SetPointAction, SET_POINT, CAPTURE, CaptureAction, SET_NODE, SetNodeAction, POP_HISTORY, PUSH_HISTORY } from "./actions";
import { GameNode } from 'parseSgf/parseSgf';

const setPoints = (state: BoardState, action: SetPointAction) => {
  const nextState = { ...state };
  action.points.forEach(point => (nextState[point] = action.value));
  return nextState;
};
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
  state: GameStateProperties,
  action: Action
): GameStateProperties => {
  return state;
};

const nodeReducer = (state: GameNode, action: Action): GameNode => {
  if (action.type === SET_NODE) return (action as SetNodeAction).node;
  else return state;
};

const defaultState: GameStateWithHistory = {
  boardState: {},
  properties: {},
  node: {},
  history: [],
};
const gameStateReducer = (
  state: GameStateWithHistory = defaultState,
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

export default gameStateReducer;