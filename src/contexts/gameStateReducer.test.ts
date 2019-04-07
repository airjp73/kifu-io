import each from 'jest-each';
import {
  setPoint,
  captureStones,
  setNode,
  popHistory,
  pushHistory,
} from './actions';
import {
  setBoardSize,
  setApplication,
  SetVariationDisplaySettings,
  setPlayedOnDate,
} from './propertiesActions';
import gameStateReducer, {
  GameStateWithHistory,
  MoveState,
} from './gameStateReducer';
import {
  addCircles,
  addTriangles,
  addSquares,
  addLines,
  addName,
  addComment,
} from './moveStateActions';

const emptyMoveState: MoveState = {
  circles: [],
  squares: [],
  triangles: [],
  lines: [],
};
const emptyCaptureCounts = {
  b: 0,
  w: 0,
};
const emptyState: GameStateWithHistory = {
  boardState: {},
  properties: {},
  node: {},
  moveState: emptyMoveState,
  captureCounts: emptyCaptureCounts,
  history: [],
};

describe('GoGameContext reducer', () => {
  test('should handle setNode action', () => {
    const node = {};
    const result = gameStateReducer(emptyState, setNode(node));
    expect(result.node).toBe(node);
  });

  test('should handle popHistory action', () => {
    const state: GameStateWithHistory = {
      ...emptyState,
      history: [emptyState, { ...emptyState, boardState: { aa: 'b' } }],
    };
    const result = gameStateReducer(state, popHistory());
    expect(result.history).toEqual([emptyState]);
  });

  test('should handle pushHistory action', () => {
    const state: GameStateWithHistory = {
      ...emptyState,
      boardState: { aa: 'w' },
      properties: { boardSize: [19, 19] },
      history: [emptyState],
    };
    const result = gameStateReducer(state, pushHistory());
    expect(result.history).toEqual([
      emptyState,
      {
        boardState: { aa: 'w' },
        properties: { boardSize: [19, 19] },
        node: {},
        moveState: emptyMoveState,
        captureCounts: emptyCaptureCounts,
      },
    ]);
  });

  test('should handle setApplication action', () => {
    const result = gameStateReducer(
      emptyState,
      setApplication(['GoReviews:1.0'])
    );
    expect(result.properties).toEqual({
      application: {
        name: 'GoReviews',
        version: '1.0',
      },
    });
  });

  describe('setBoardSize action', () => {
    test('should treat single values as square sizes', () => {
      const result = gameStateReducer(emptyState, setBoardSize(['19']));
      expect(result.properties).toEqual({ boardSize: [19, 19] });
    });

    test('should treat multiple values as rectangular sizes', () => {
      const result = gameStateReducer(emptyState, setBoardSize(['19:20']));
      expect(result.properties).toEqual({ boardSize: [19, 20] });
    });
  });

  describe('setVariationDisplaySettings action', () => {
    each([
      [0, true, 'NEXT_MOVE'],
      [1, true, 'CURRENT_MOVE'],
      [2, false, 'NEXT_MOVE'], // type doesn't actually matter since they're not shown
    ]).test(
      'should handle setVariationDisplaySettings action',
      (value, show, showFor) => {
        const result = gameStateReducer(
          emptyState,
          SetVariationDisplaySettings([value])
        );
        expect(result.properties).toEqual({
          variationDisplay: { show, showFor },
        });
      }
    );
  });

  each([
    [
      'setPoint',
      { ...emptyState, boardState: { cc: 'w' } },
      setPoint(['aa', 'bb'], 'b'),
      { boardState: { aa: 'b', bb: 'b', cc: 'w' } },
    ],

    [
      'captureStones',
      {
        ...emptyState,
        captureCounts: { b: 2, w: 3 },
        boardState: { aa: 'b', bb: 'w', cc: 'b' },
      },
      captureStones(['aa', 'cc'], 'b'),
      {
        boardState: { bb: 'w' },
        captureCounts: {
          b: 2,
          w: 5,
        },
      },
    ],

    [
      'addTriangles',
      emptyState,
      addTriangles(['aa', 'bb']),
      { moveState: { triangles: ['aa', 'bb'] } },
    ],

    [
      'addCircles',
      emptyState,
      addCircles(['aa', 'bb']),
      { moveState: { circles: ['aa', 'bb'] } },
    ],

    [
      'addLines',
      emptyState,
      addLines(['aa:cc', 'bb:bd']),
      { moveState: { lines: [['aa', 'cc'], ['bb', 'bd']] } },
    ],

    [
      'addSquares',
      emptyState,
      addSquares(['aa', 'bb']),
      { moveState: { squares: ['aa', 'bb'] } },
    ],

    [
      'addComment',
      emptyState,
      addComment(['A comment']),
      { moveState: { comment: 'A comment' } },
    ],

    [
      'addName',
      emptyState,
      addName(['This is a move']),
      { moveState: { name: 'This is a move' } },
    ],

    [
      'setPlayedOnDate',
      emptyState,
      setPlayedOnDate(['2019-01-01,02,03,02-04,05,06-07,2020-01']),
      {
        properties: {
          playedOn: {
            '2019': {
              '01': [1, 2, 3],
              '02': [4, 5],
              '06': [7],
            },
            '2020': {
              '01': [],
            },
          },
        },
      },
    ],
  ]).test(
    'should correctly handle %s action',
    (description, startingState, action, expected) => {
      const result = gameStateReducer(startingState, action);
      expect(result).toMatchObject(expected);
    }
  );
});
