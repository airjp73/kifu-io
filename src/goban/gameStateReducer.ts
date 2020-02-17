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
  StartEditingAction,
  START_EDITING,
  SgfCopiedAction,
  SGF_COPIED,
} from './actions';
import { SET_PROPERTY, SetPropertyAction } from './propertiesActions';
import { StoneColor } from 'goban/Goban';
import { SET_MOVE_STATE, SetMoveStateAction } from './moveStateActions';
import { GameTree, GameTreeNode } from './parseSgf/normalizeGameTree';
import { NodeProperties } from './parseSgf/parseSgf';
import {
  ADD_NODE,
  GameTreeAction,
  DeleteBranchAction,
  DELETE_BRANCH,
  EditPointAction,
  EDIT_POINT,
} from './gameTreeActions';
import { APP_NAME, APP_VERSION } from './parseSgf/createSgfFromGameTree';
import {
  updateCaptureCount,
  handleEditPoint,
} from 'reason/goban/GameState.gen';
import {
  captureCounts,
  defaultCaptureCounts,
} from 'reason/goban/GameState.gen';

export type GameStateAction =
  | CaptureAction
  | InitAction
  | PopHistoryAction
  | PushHistoryAction
  | SetMoveStateAction
  | SetNodeAction
  | SetPointAction
  | SetPropertyAction
  | GameTreeAction
  | StartEditingAction
  | SgfCopiedAction
  | DeleteBranchAction
  | EditPointAction;

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

const addNode = (state: GameStateWithHistory, properties: NodeProperties) => {
  return produce(state, draft => {
    const parentNodeId = draft.node;
    const newNodeId = uuid();

    draft.node = newNodeId;
    draft.gameTree.nodes[parentNodeId].children =
      draft.gameTree.nodes[parentNodeId].children ?? [];
    draft.gameTree.nodes[parentNodeId].children.push(newNodeId);
    draft.gameTree.nodes[newNodeId] = {
      id: newNodeId,
      parent: parentNodeId,
      properties,
      // We have a few dummy nodes at the start
      moveNumber: draft.history.length - 1,
    };
    draft.unsavedChanges = true;
  });
};

const deleteBranch = (state: GameStateWithHistory, nodeId: string) => {
  return produce(state, draft => {
    const deletedNode = draft.gameTree.nodes[nodeId];
    const nodes: GameTreeNode[] = [deletedNode];

    while (nodes.length) {
      const node = nodes.pop();
      node.children?.forEach(childId => {
        nodes.push(draft.gameTree.nodes[childId]);
      });
      delete draft.gameTree.nodes[nodeId];
    }

    const parent =
      deletedNode.parent && draft.gameTree.nodes[deletedNode.parent];
    if (parent) {
      const updatedChildren = parent.children?.filter(
        child => child !== nodeId
      );
      if (updatedChildren) parent.children = updatedChildren;
    }
  });
};

export interface GameState {
  properties: GameStateProperties;
  boardState: BoardState;
  node: string;
  moveState: MoveState;
  captureCounts: captureCounts;
}
export interface GameStateWithHistory extends GameState {
  history: GameState[];
  gameTree: GameTree;
  unsavedChanges: boolean;
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
  unsavedChanges: false,
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
      return {
        ...defaultState,
        unsavedChanges: state.unsavedChanges,
        gameTree: action.payload,
      };
    case POP_HISTORY:
      return {
        ...state,
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
    case SET_NODE:
      return { ...state, node: action.node };
    case ADD_NODE:
      return addNode(state, action.payload);
    case DELETE_BRANCH:
      return deleteBranch(state, action.payload);
    case START_EDITING:
      return {
        ...state,
        unsavedChanges: true,
      };
    case SGF_COPIED:
      return {
        ...state,
        properties: {
          ...properties,
          application: { name: APP_NAME, version: APP_VERSION },
        },
        unsavedChanges: false,
      };
    case CAPTURE:
      return {
        ...state,
        boardState: boardStateReducer(boardState, action),
        captureCounts: updateCaptureCount(
          state.captureCounts,
          action.points,
          action.color
        ),
      };
    case EDIT_POINT:
      return handleEditPoint(state, action.payload.point, action.payload.color);
    default:
      return {
        ...state,
        boardState: boardStateReducer(boardState, action),
        properties: propertiesReducer(properties, action),
        moveState: moveStateReducer(moveState, action),
      };
  }
};

export default gameStateReducer;
