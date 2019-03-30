import { MoveState } from './gameStateReducer';

export const SET_MOVE_STATE = 'SET_MOVE_STATE';

type MoveStateActionPayload = Partial<MoveState>;
export interface SetMoveStateAction {
  type: typeof SET_MOVE_STATE;
  moveState: MoveStateActionPayload;
}

const setMoveState = (
  moveState: MoveStateActionPayload
): SetMoveStateAction => ({
  type: SET_MOVE_STATE,
  moveState,
});

export const addCircles = (circles: string[]) => setMoveState({ circles });
export const addComment = (comment: string) => setMoveState({ comment });
export const addLines = (lines: string[]) =>
  setMoveState({
    lines: lines.map(line => line.split(':') as [string, string]),
  });
export const addName = (name: string) => setMoveState({ name: name });
export const addSquares = (squares: string[]) => setMoveState({ squares });
export const addTriangles = (triangles: string[]) =>
  setMoveState({ triangles });
