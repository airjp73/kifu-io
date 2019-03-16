import each from 'jest-each';
import {
  setPoint,
  captureStones,
  setNode,
  popHistory,
  pushHistory,
  setBoardSize,
  setApplication,
  SetVariationDisplaySettings,
} from './actions';
import gameStateReducer, {
  GameStateWithHistory,
  MoveState,
} from './gameStateReducer';
import {
  addCircles,
  addTriangles,
  addSquares,
  addLines,
} from './moveStateActions';

const emptyMoveState: MoveState = {
  circles: [],
  squares: [],
  triangles: [],
  lines: [],
};
const emptyState: GameStateWithHistory = {
  boardState: {},
  properties: {},
  node: {},
  moveState: emptyMoveState,
  history: [],
};

describe('GoGameContext reducer', () => {
  test('should handle setPoint action', () => {
    const state: GameStateWithHistory = {
      ...emptyState,
      boardState: { cc: 'w' },
    };
    const result = gameStateReducer(state, setPoint(['aa', 'bb'], 'b'));
    expect(result.boardState).toEqual({ aa: 'b', bb: 'b', cc: 'w' });
  });

  test('should handle captureStones action', () => {
    // TODO: test capture count update
    const state: GameStateWithHistory = {
      ...emptyState,
      boardState: { aa: 'b', bb: 'w', cc: 'b' },
    };
    const result = gameStateReducer(state, captureStones(['aa', 'bb']));
    expect(result.boardState).toEqual({ cc: 'b' });
  });

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

  test('should handle addCircles action', () => {
    const result = gameStateReducer(emptyState, addCircles(['aa', 'bb']));
    expect(result.moveState).toEqual({
      ...emptyMoveState,
      circles: ['aa', 'bb'],
    });
  });

  test('should handle addLines action', () => {
    const result = gameStateReducer(emptyState, addLines(['aa:cc', 'bb:bd']));
    expect(result.moveState).toEqual({
      ...emptyMoveState,
      lines: [['aa', 'cc'], ['bb', 'bd']],
    });
  });

  test('should handle addSquares action', () => {
    const result = gameStateReducer(emptyState, addSquares(['aa', 'bb']));
    expect(result.moveState).toEqual({
      ...emptyMoveState,
      squares: ['aa', 'bb'],
    });
  });

  test('should handle addTriangles action', () => {
    const result = gameStateReducer(emptyState, addTriangles(['aa', 'bb']));
    expect(result.moveState).toEqual({
      ...emptyMoveState,
      triangles: ['aa', 'bb'],
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
      [0, false, 'NEXT_MOVE'],
      [1, false, 'CURRENT_MOVE'],
      [2, true, 'NEXT_MOVE'],
      [3, true, 'CURRENT_MOVE'],
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
});
