import {
  BoardState,
  GameStateWithHistory,
  GameStateProperties,
} from './reducers';
import { ThunkDispatch } from 'hooks/useThunkReducer';
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
  const affectedStones = getLiberties(addedStone, properties.boardSize).filter(
    liberty => !!boardState[liberty]
  );
  affectedStones.push(addedStone); // Include addedStone to account for self-capture

  const capturedStones: string[] = [];
  const selfCapturedStones: string[] = [];
  const safeStones: string[] = [];

  affectedStones.forEach(point => {
    // If stone has already been captured, or is already safe, abort
    if (
      capturedStones.includes(point) ||
      selfCapturedStones.includes(point) ||
      safeStones.includes(point)
    ) {
      return;
    }

    const color = boardState[point];
    const stonesInGroup: string[] = [point];

    for (let i = 0; i < stonesInGroup.length; ++i) {
      const liberties = getLiberties(stonesInGroup[i], properties.boardSize);
      for (let liberty of liberties) {
        if (!boardState[liberty]) {
          // Empty liberty, don't capture this group
          safeStones.push(...stonesInGroup);
          return;
        } else if (boardState[liberty] === color) {
          // If this stone is safe already, then we know this group has liberties
          if (safeStones.includes(liberty)) return;
          // Same color means it's part of the group we're currently checking
          if (!stonesInGroup.includes(liberty)) {
            stonesInGroup.push(liberty);
          }
        }
        // Different color, do nothing
      }
    }

    // There are rule-sets that allow suicide moves so we have to check
    if (stonesInGroup.includes(addedStone)) {
      selfCapturedStones.push(...stonesInGroup);
    } else {
      capturedStones.push(...stonesInGroup);
    }
  });

  // If a move is only a suicide if it doesn't capture other stones
  return capturedStones.length ? capturedStones : selfCapturedStones;
};

const placeStone = (
  point: string,
  value: Point,
  dispatch: ThunkDispatch<GameStateWithHistory>
) => {
  dispatch(setPoint([point], value));
  dispatch((dispatch, gameState) => {
    const capturedStones = checkForCaptures(
      point,
      gameState.boardState,
      gameState.properties
    );
    capturedStones && dispatch(captureStones(capturedStones));
  });
};

export default placeStone;
