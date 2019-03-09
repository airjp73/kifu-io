import { BoardState } from "./GoGameContext";

/**
 * A test helper to allow for creating board states for tests in a visual way.
 * 
 * @param boardStateString A string representation of the board
 * @param size an array of 2 numbers representing the dimensions of the board
 */
export const createBoardStateFromString = (
  boardStateString: string,
  size: [number, number]
): BoardState => {
  const noWhitespace = boardStateString.replace(/\s/g, '');
  const A = 'a'.charCodeAt(0);

  const boardState: BoardState = {};
  for (let x = 0; x < size[0]; ++x) {
    for (let y = 0; y < size[1]; ++y) {
      const value = noWhitespace.charAt(y * size[0] + x);
      if (value === 'b' || value === 'w') {
        const point = String.fromCharCode(A + x) + String.fromCharCode(A + y);
        boardState[point] = value;
      }
    }
  }

  return boardState;
};

export const createStringFromBoardState = (
  boardState: BoardState,
  size: [number, number]
): string => {
  let boardString = '';
  const A = 'a'.charCodeAt(0);

  for (let y = 0; y < size[1]; ++y) {
    for (let x = 0; x < size[0]; ++x) {
      const point = String.fromCharCode(x + A) + String.fromCharCode(y + A);
      const value = boardState[point];
      if (value === 'b' || value === 'w') {
        boardString += value + ' ';
      } else {
        boardString += '. ';
      }
    }
  }

  return boardString;
}