import each from 'jest-each';
import gameStateReducer, { GameStateWithHistory } from '../gameStateReducer';
import placeStone from '../placeStone';
import { createBoardStateFromString } from '../boardStateTestHelpers';
import { init } from '../actions';

describe('placeStone', () => {
  each([
    // No capture
    [
      'Simple - No capture',
      { aa: 'b' },
      [19, 19],
      ['kk', 'w'],
      { aa: 'b', kk: 'w' },
    ],
    [
      'Touching move - no capture',
      { aa: 'b' },
      [3, 3],
      ['ab', 'w'],
      { aa: 'b', ab: 'w' },
    ],
    [
      'Self atari - no capture',
      `
        . . .
        b . b
        . b .
      `,
      [3, 3],
      ['bb', 'w'],
      `
        . . .
        b w b
        . b .
      `,
    ],
    [
      'Self atari - bulk - no capture',
      `
        b b b b
        b w . b
        b . b b
        b b b b
      `,
      [4, 4],
      ['cb', 'w'],
      `
        b b b b
        b w w b
        b . b b
        b b b b
      `,
    ],

    // Corner captures
    [
      'Upper left corner capture',
      { aa: 'b', ab: 'w' },
      [19, 19],
      ['ba', 'w'],
      { ab: 'w', ba: 'w' },
      { w: 1, b: 0 },
    ],
    [
      'Upper right corner capture',
      { da: 'b', ea: 'w' },
      [5, 3],
      ['eb', 'b'],
      { da: 'b', eb: 'b' },
      { w: 0, b: 1 },
    ],
    [
      'Lower right corner capture',
      { ji: 'b', jj: 'w' },
      [10, 10],
      ['ij', 'b'],
      { ji: 'b', ij: 'b' },
      { w: 0, b: 1 },
    ],
    [
      'Lower left corner capture',
      { ar: 'b', as: 'w' },
      [19, 19],
      ['bs', 'b'],
      { ar: 'b', bs: 'b' },
      { w: 0, b: 1 },
    ],

    // Edge captures
    [
      'Left edge capture',
      { aa: 'b', bb: 'b', ab: 'w' },
      [19, 19],
      ['ac', 'b'],
      { aa: 'b', bb: 'b', ac: 'b' },
      { w: 0, b: 1 },
    ],
    [
      'Top edge capture',
      { aa: 'b', bb: 'b', ba: 'w' },
      [19, 19],
      ['ca', 'b'],
      { aa: 'b', bb: 'b', ca: 'b' },
      { w: 0, b: 1 },
    ],
    [
      'Right edge capture',
      { ea: 'b', db: 'b', eb: 'w' },
      [5, 5],
      ['ec', 'b'],
      { ea: 'b', db: 'b', ec: 'b' },
      { w: 0, b: 1 },
    ],
    [
      'Bottom edge capture',
      { ee: 'b', dd: 'b', de: 'w' },
      [5, 5],
      ['ce', 'b'],
      { ee: 'b', dd: 'b', ce: 'b' },
      { w: 0, b: 1 },
    ],

    // Bulk captures
    [
      'Capture every other stone on the board',
      `
        b b b
        b . b
        b b b
      `,
      [3, 3],
      ['bb', 'w'],
      { bb: 'w' },
      { w: 8, b: 0 },
    ],
    [
      'Ladder capture',
      `
        . . . . .
        b w . . .
        b b w . .
        w b b w .
        . w b b w
        . . w b w
      `,
      [5, 6],
      ['aa', 'w'],
      `
        w . . . .
        . w . . .
        . . w . .
        w . . w .
        . w . . w
        . . w . w
      `,
      { w: 8, b: 0 },
    ],

    // Suicide
    [
      'Suicide moves',
      `
        . b .
        b . b
        . b .
      `,
      [3, 3],
      ['bb', 'w'],
      `
        . b .
        b . b
        . b .
      `,
      { w: 0, b: 1 },
    ],
    [
      'Suicide moves - bulk',
      `
        . b b .
        b . w b
        b w b .
        . b . .
      `,
      [4, 4],
      ['bb', 'w'],
      `
        . b b .
        b . . b
        b . b .
        . b . .
      `,
      { w: 0, b: 3 },
    ],
    [
      'Suicide Moves - corner',
      `
        . b
        b .
      `,
      [2, 2],
      ['aa', 'w'],
      `
        . b
        b .
      `,
      { w: 0, b: 1 },
    ],
    [
      'Suicide Moves - whole board',
      `
        b b
        b .
      `,
      [2, 2],
      ['bb', 'b'],
      `
        . .
        . .
      `,
      { w: 4, b: 0 },
    ],

    // Ko
    [
      'Ko',
      `
        . b .
        b . b
        w b w
        . w .
      `,
      [3, 4],
      ['bb', 'w'],
      `
        . b .
        b w b
        w . w
        . w .
      `,
      { w: 1, b: 0 },
    ],

    // Multi group captures
    [
      'Multi-group capture',
      `
        . . b b .
        . b w w b
        b w . w b
        . b w b .
        . . b . .
      `,
      [5, 5],
      ['cc', 'b'],
      `
        . . b b .
        . b . . b
        b . b . b
        . b . b .
        . . b . .
      `,
      { w: 0, b: 5 },
    ],
  ]).test(
    'should correctly handle %s',
    (
      description,
      initialBoard,
      boardSize,
      newStone,
      expectedBoard,
      expectedCaptureCounts = { b: 0, w: 0 }
    ) => {
      const initialBoardState =
        typeof initialBoard === 'string'
          ? createBoardStateFromString(initialBoard, boardSize)
          : initialBoard;

      const expectedBoardState =
        typeof expectedBoard === 'string'
          ? createBoardStateFromString(expectedBoard, boardSize)
          : expectedBoard;

      const state: GameStateWithHistory = {
        ...gameStateReducer(undefined, init(null)),
        boardState: initialBoardState,
        properties: { boardSize },
      };

      let newState = state;
      const dispatch = jest.fn(action => {
        if (typeof action === 'function') {
          action(dispatch, () => newState);
        } else {
          newState = gameStateReducer(newState, action);
        }
      });

      placeStone(newStone[0], newStone[1], dispatch);
      expect(newState).toEqual({
        ...state,
        boardState: expectedBoardState,
        captureCounts: expectedCaptureCounts,
        properties: { boardSize },
      });
    }
  );
});
