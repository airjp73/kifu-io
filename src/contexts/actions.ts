import { Action } from './GoGameContext';
import { Point } from 'components/Goban';
import { GameNode } from 'parseSgf/parseSgf';

export const CAPTURE = 'CAPTURE';
export const INIT = 'INIT';
export const SET_BOARD_SIZE = 'SET_BOARD_SIZE';
export const SET_NODE = 'SET_NODE';
export const SET_POINT = 'SET_POINT';
export const POP_HISTORY = 'POP_HISTORY';
export const PUSH_HISTORY = 'PUSH_HISTORY';

// Board state
export interface SetPointAction extends Action {
  type: typeof SET_POINT;
  points: string[];
  value: Point;
}
export const setPoint = (
  points: string[],
  value: Point | null
): SetPointAction => ({
  type: SET_POINT,
  points,
  value,
});

export interface CaptureAction extends Action {
  type: typeof CAPTURE;
  points: string[];
}
export const captureStones = (points: string[]): CaptureAction => ({
  type: CAPTURE,
  points,
});

// Properties
export interface SetBoardSizeAction {
  type: typeof SET_BOARD_SIZE;
  boardSize: [number, number];
}
export const setBoardSize = (sizeProperty: string[]): SetBoardSizeAction => {
  // One value (SZ[19]) means square board
  // Two values (SZ[19:10]) means rectangular board
  const value = sizeProperty[0].split(':');
  const x = parseInt(value[0]);
  const y = value[1] ? parseInt(value[1]) : x;
  return {
    type: SET_BOARD_SIZE,
    boardSize: [x, y],
  };
};

// State/history management
export interface SetNodeAction {
  type: typeof SET_NODE;
  node: GameNode;
}
export const setNode = (node: GameNode): SetNodeAction => ({
  type: SET_NODE,
  node,
});

export interface PushHistoryAction {
  type: typeof PUSH_HISTORY;
}
export const pushHistory = (): PushHistoryAction => ({ type: PUSH_HISTORY });

export interface PopHistoryAction {
  type: typeof POP_HISTORY;
}
export const popHistory = (): PopHistoryAction => ({ type: POP_HISTORY });

export interface InitAction {
  type: typeof INIT;
}
export const init = (): InitAction => ({ type: INIT });
