import uuid from 'uuid/v4';
import omit from 'lodash/omit';
import { produce } from 'immer';
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
import { StoneColor } from 'goban/Goban';
import { SET_MOVE_STATE, SetMoveStateAction } from './moveStateActions';
import { GameTree } from './parseSgf/normalizeGameTree';
import { ADD_NODE, GameTreeAction } from './gameTreeActions';

export type GameStateAction =
  | CaptureAction
  | InitAction
  | PopHistoryAction
  | PushHistoryAction
  | SetMoveStateAction
  | SetNodeAction
  | SetPointAction
  | SetPropertyAction
  | GameTreeAction;

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

export interface PlayedOnDates {
  [key: string]: {
    [key: string]: number[];
  };
}
export interface GameStateProperties {
  annotatorName?: string;
  application?: { name: string; version: string };
  boardSize?: [number, number];
  copyright?: string;
  eventName?: string;
  gameComment?: string;
  gameName?: string;
  opening?: string;
  overtime?: string;
  placePlayed?: string;
  playedOn?: PlayedOnDates;
  playerBlack?: string;
  playerWhite?: string;
  rankBlack?: string;
  rankWhite?: string;
  result?: string;
  round?: string; // something?
  ruleSet?: string;
  source?: string;
  teamBlack?: string;
  teamWhite?: string;
  timeLimit?: number;
  userEnteringGameRecord?: string;
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

export interface PositionStatus {
  favoredPlayer: StoneColor | 'even' | 'unclear';
  magnitude: number;
}

export type MoveQualityType = 'bad' | 'doubtful' | 'interesting' | 'tesuji';
export interface MoveQuality {
  quality: MoveQualityType;
  magnitude?: number;
}
export interface MoveState {
  circles: string[];
  comment?: string;
  estimatedScore?: number;
  hotspot?: boolean;
  lines: [string, string][];
  moveQuality?: MoveQuality;
  name?: string;
  playerToPlay?: StoneColor;
  positionStatus?: PositionStatus;
  squares: string[];
  triangles: string[];
  xMarks: string[];
  labels: { point: string; label: string }[];
}
const defaultMoveState: MoveState = {
  circles: [],
  squares: [],
  triangles: [],
  lines: [],
  xMarks: [],
  labels: [],
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

const addNode = produce((draft: GameStateWithHistory) => {
  const parentNodeId = draft.node;
  const newNodeId = uuid();

  draft.node = newNodeId;
  draft.gameTree.nodes[parentNodeId].children = draft.gameTree.nodes[parentNodeId].children ?? [];
  draft.gameTree.nodes[parentNodeId].children.push(newNodeId);
  draft.gameTree.nodes[newNodeId] = {
    id: newNodeId,
    parent: parentNodeId,
  };
});

export interface GameState {
  properties: GameStateProperties;
  boardState: BoardState;
  node: string;
  moveState: MoveState;
  captureCounts: CaptureCounts;
}
export interface GameStateWithHistory extends GameState {
  history: GameState[];
  gameTree: GameTree;
}
const defaultState: GameStateWithHistory = {
  boardState: {},
  properties: {},
  node: '',
  moveState: defaultMoveState,
  captureCounts: defaultCaptureCounts,
  history: [],
  gameTree: {
    rootNode: '',
    nodes: {},
  },
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
    gameTree,
  } = state;

  switch (action.type) {
    case INIT:
      return {
        ...defaultState,
        gameTree: action.payload,
      };
    case POP_HISTORY:
      return {
        ...history[history.length - 1],
        history: history.slice(0, history.length - 1),
        gameTree,
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
    case SET_NODE:
      return { ...state, node: action.node };
    case ADD_NODE:
      return addNode(state);
    default:
      return {
        boardState: boardStateReducer(boardState, action),
        properties: propertiesReducer(properties, action),
        node,
        moveState: moveStateReducer(moveState, action),
        captureCounts: captureCountReducer(captureCounts, action),
        gameTree,
        history,
      };
  }
};

export default gameStateReducer;
