import { StoneColor } from 'components/Goban';

export const CAPTURE = 'CAPTURE';
export const INIT = 'INIT';
export const SET_NODE = 'SET_NODE';
export const SET_POINT = 'SET_POINT';
export const POP_HISTORY = 'POP_HISTORY';
export const PUSH_HISTORY = 'PUSH_HISTORY';

// Board state
export interface SetPointAction {
  type: typeof SET_POINT;
  points: string[];
  value: StoneColor | null;
}
export const setPoint = (
  points: string[],
  value: StoneColor | null
): SetPointAction => ({
  type: SET_POINT,
  points,
  value,
});

export interface CaptureAction {
  type: typeof CAPTURE;
  points: string[];
  color: StoneColor;
}
export const captureStones = (
  points: string[],
  color: StoneColor
): CaptureAction => ({
  type: CAPTURE,
  points,
  color,
});

export interface SetNodeAction {
  type: typeof SET_NODE;
  node: string;
}
export const setNode = (node: string): SetNodeAction => ({
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
