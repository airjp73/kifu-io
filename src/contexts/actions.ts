import { Action, BoardState, GameStateWithHistory } from "./GoGameContext";
import { Point } from "components/Goban";
import { ThunkAction } from "hooks/useThunkReducer";
import { GameNode } from "parseSgf/parseSgf";

export const CAPTURE = 'CAPTURE';
export const SET_NODE = 'SET_NODE';
export const SET_POINT = 'SET_POINT';
export const POP_HISTORY = 'POP_HISTORY';
export const PUSH_HISTORY = 'PUSH_HISTORY';

export interface SetPointAction extends Action {
  type: typeof SET_POINT;
  points: string[];
  value: Point;
}
export const setPoint = (points: string[], value: Point | null): SetPointAction => ({
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

//// placeStone action
const charAdd = (char: string, num: number): string =>
  String.fromCharCode(char.charCodeAt(0) + num);

const getLibertiesForPoint = (point: string): string[] => {
  const xChar = point.charAt(0);
  const yChar = point.charAt(1);
  // TODO: filter on board size
  return [
    `${charAdd(xChar, 1)}${yChar}`,
    `${charAdd(xChar, -1)}${yChar}`,
    `${xChar}${charAdd(yChar, -1)}`,
    `${xChar}${charAdd(yChar, 1)}`,
  ];
};

const checkForCaptures = (
  addedStone: string,
  boardState: BoardState,
): string[] => {
  const contactedStones = getLibertiesForPoint(addedStone).filter(
    liberty => !!boardState[liberty]
  );
  const capturedStones: string[] = [];
  const selfCapturedStones: string[] = [];
  const safeStones: string[] = [];

  contactedStones.forEach(point => {
    // If stone has already been captured, or is already safe, abort
    if (capturedStones.includes(point) || safeStones.includes(point)) return;
    const color = boardState[point];
    const checkedStones: string[] = [];

    const stonesToCheck = [point];
    for (let i = 0; i < stonesToCheck.length; ++i) {
      checkedStones.push(stonesToCheck[i]);
      const liberties = getLibertiesForPoint(stonesToCheck[i]);
      for (let liberty of liberties) {
        if (!boardState[liberty] && liberty !== addedStone) {
          // Empty space, don't capture
          safeStones.push(...checkedStones);
          return;
        } else if (boardState[liberty] === color) {
          // If we've checked this stone already, then we know this group has liberties
          if (safeStones.includes(liberty)) return;
          // Same color, add to check list if we haven't checked it already
          if (!checkedStones.includes(liberty)) {
            stonesToCheck.push(liberty);
          }
        }
        // Different color, do nothing
      }
    }

    // There are rule-sets that allow suicide moves so we have to check
    if (checkedStones.includes(addedStone)) {
      selfCapturedStones.push(...checkedStones);
    } else {
      capturedStones.push(...checkedStones);
    }
  });

  // If a move is only a suicide if it doesn't capture other stones
  return capturedStones.length ? capturedStones : selfCapturedStones;
};

export const placeStone = (point: string, value: Point) => {
  const actions: ThunkAction<GameStateWithHistory>[] = [
    setPoint([point], value),
  ];

  actions.push((dispatch, gameState) => {
    const capturedStones = checkForCaptures(point, gameState.boardState);
    capturedStones && dispatch(captureStones(capturedStones));
  });

  return actions;
};

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
export const pushHistory = (): PushHistoryAction => ({ type: PUSH_HISTORY, });

export interface PopHistoryAction {
  type: typeof POP_HISTORY;
}
export const popHistory = (): PopHistoryAction => ({ type: POP_HISTORY });
