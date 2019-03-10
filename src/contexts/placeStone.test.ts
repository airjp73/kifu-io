import { GameStateWithHistory } from './reducers';
import each from 'jest-each';
import gameStateReducer from './reducers';
import placeStone from './placeStone';
import { createBoardStateFromString } from './boardStateTestHelpers';

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
    ],
    [
      'Upper right corner capture',
      { da: 'b', ea: 'w' },
      [5, 3],
      ['eb', 'b'],
      { da: 'b', eb: 'b' },
    ],
    [
      'Lower right corner capture',
      { ji: 'b', jj: 'w' },
      [10, 10],
      ['ij', 'b'],
      { ji: 'b', ij: 'b' },
    ],
    [
      'Lower left corner capture',
      { ar: 'b', as: 'w' },
      [19, 19],
      ['bs', 'b'],
      { ar: 'b', bs: 'b' },
    ],

    // Edge captures
    [
      'Left edge capture',
      { aa: 'b', bb: 'b', ab: 'w' },
      [19, 19],
      ['ac', 'b'],
      { aa: 'b', bb: 'b', ac: 'b' },
    ],
    [
      'Top edge capture',
      { aa: 'b', bb: 'b', ba: 'w' },
      [19, 19],
      ['ca', 'b'],
      { aa: 'b', bb: 'b', ca: 'b' },
    ],
    [
      'Right edge capture',
      { ea: 'b', db: 'b', eb: 'w' },
      [5, 5],
      ['ec', 'b'],
      { ea: 'b', db: 'b', ec: 'b' },
    ],
    [
      'Bottom edge capture',
      { ee: 'b', dd: 'b', de: 'w' },
      [5, 5],
      ['ce', 'b'],
      { ee: 'b', dd: 'b', ce: 'b' },
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
      `
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
      `
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
    ]
  ]).test(
    'should correctly handle %s',
    (description, initialBoard, boardSize, newStone, expectedBoard) => {
      const initialBoardState =
        typeof initialBoard === 'string'
          ? createBoardStateFromString(initialBoard, boardSize)
          : initialBoard;

      const expectedBoardState =
        typeof expectedBoard === 'string'
          ? createBoardStateFromString(expectedBoard, boardSize)
          : expectedBoard;

      const state: GameStateWithHistory = {
        boardState: initialBoardState,
        properties: { boardSize },
        node: {},
        history: [],
      };

      let newState = state;
      const dispatch = jest.fn(action => {
        if (typeof action === 'function') {
          action(dispatch, newState);
        } else {
          newState = gameStateReducer(newState, action);
        }
      });

      placeStone(newStone[0], newStone[1], dispatch);
      expect(newState).toEqual({
        boardState: expectedBoardState,
        properties: { boardSize },
        node: {},
        history: [],
      });
    }
  );
});
