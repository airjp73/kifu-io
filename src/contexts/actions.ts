import { Point } from 'components/Goban';
import { GameNode } from 'parseSgf/parseSgf';

export const CAPTURE = 'CAPTURE';
export const INIT = 'INIT';
export const SET_APPLICATION = 'SET_APPLICATION';
export const SET_BOARD_SIZE = 'SET_BOARD_SIZE';
export const SET_NODE = 'SET_NODE';
export const SET_POINT = 'SET_POINT';
export const SET_VARIATION_DISPLAY_SETTINGS = 'SET_VARIATION_DISPLAY_SETTINGS';
export const POP_HISTORY = 'POP_HISTORY';
export const PUSH_HISTORY = 'PUSH_HISTORY';

// Board state
export interface SetPointAction {
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

export interface CaptureAction {
  type: typeof CAPTURE;
  points: string[];
}
export const captureStones = (points: string[]): CaptureAction => ({
  type: CAPTURE,
  points,
});

// Root Properties
export interface SetApplicationAction {
  type: typeof SET_APPLICATION;
  application: { name: string; version: string };
}
export const setApplication = (
  applicationProperty: string[]
): SetApplicationAction => {
  const property = applicationProperty[0].split(':');
  return {
    type: SET_APPLICATION,
    application: {
      name: property[0],
      version: property[1],
    },
  };
};

export interface SetVariationDisplaySettingsAction {
  type: typeof SET_VARIATION_DISPLAY_SETTINGS;
  variationDisplay: {
    showFor: 'CURRENT_MOVE' | 'NEXT_MOVE';
    show: boolean;
  };
}
export const SetVariationDisplaySettings = (
  property: string[]
): SetVariationDisplaySettingsAction => {
  const value = parseInt(property[0]);
  return {
    type: SET_VARIATION_DISPLAY_SETTINGS,
    variationDisplay: {
      show: value - 2 >= 0,
      showFor: value % 2 === 1 ? 'CURRENT_MOVE' : 'NEXT_MOVE',
    },
  };
};

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
