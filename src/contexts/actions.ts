import {
  Action,
  BoardState,
  GameStateWithHistory,
  GameStateProperties,
} from './GoGameContext';
import { Point } from 'components/Goban';
import { ThunkAction } from 'hooks/useThunkReducer';
import { GameNode } from 'parseSgf/parseSgf';

export const CAPTURE = 'CAPTURE';
export const SET_BOARD_SIZE = 'SET_BOARD_SIZE';
export const SET_NODE = 'SET_NODE';
export const SET_POINT = 'SET_POINT';
export const POP_HISTORY = 'POP_HISTORY';
export const PUSH_HISTORY = 'PUSH_HISTORY';

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

//// placeStone action
const getLiberties = (
  point: string,
  boardSize: [number, number] = [19, 19]
): string[] => {
  const A = 'a'.charCodeAt(0);
  const x = point.charCodeAt(0) - A;
  const y = point.charCodeAt(1) - A;
  return [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]]
    .filter(
      ([xLib, yLib]) =>
        xLib < boardSize[0] && xLib >= 0 && yLib < boardSize[1] && yLib >= 0
    )
    .map(
      ([xLib, yLib]) =>
        `${String.fromCharCode(xLib + A)}${String.fromCharCode(yLib + A)}`
    );
};

const checkForCaptures = (
  addedStone: string,
  boardState: BoardState,
  properties: GameStateProperties
): string[] => {
  const contactedStones = getLiberties(
    addedStone,
    properties.boardSize
  ).filter(liberty => !!boardState[liberty]);
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
      const liberties = getLiberties(
        stonesToCheck[i],
        properties.boardSize
      );
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
    const capturedStones = checkForCaptures(
      point,
      gameState.boardState,
      gameState.properties
    );
    capturedStones && dispatch(captureStones(capturedStones));
  });

  return actions;
};

// Properties
//
export interface SetBoardSize {
  type: typeof SET_BOARD_SIZE;
  boardSize: [number, number];
}
export const setBoardSize = (sizeProperty: string[]) => {
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

// State management
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
