import {
  BoardState,
  GameStateWithHistory,
  GameStateProperties,
} from './GoGameContext';
import { ThunkAction } from 'hooks/useThunkReducer';
import { setPoint, captureStones } from './actions';
import { Point } from 'components/Goban';

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
  const contactedStones = getLiberties(addedStone, properties.boardSize).filter(
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
      const liberties = getLiberties(stonesToCheck[i], properties.boardSize);
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

const placeStone = (point: string, value: Point) => {
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

export default placeStone;