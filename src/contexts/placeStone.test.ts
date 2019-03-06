import { GameStateWithHistory } from './GoGameContext';
import each from 'jest-each';
import gameStateReducer from './reducers';
import { ThunkDispatch } from 'hooks/useThunkReducer';
import placeStone from './placeStone';

describe('placeStone', () => {
  each([
    // No capture
    [{ aa: 'b' }, [19, 19], ['kk', 'w'], { aa: 'b', kk: 'w' }],

    // Corner captures
    [{ aa: 'b', ab: 'w' }, [19, 19], ['ba', 'w'], { ab: 'w', ba: 'w' }],
    [{ da: 'b', ea: 'w' }, [5, 3], ['eb', 'b'], { da: 'b', eb: 'b' }],
    [{ ji: 'b', jj: 'w' }, [10, 10], ['ij', 'b'], { ji: 'b', ij: 'b' }],
    [{ ar: 'b', as: 'w' }, [19, 19], ['bs', 'b'], { ar: 'b', bs: 'b' }],

    // Edge captures
    [
      { aa: 'b', bb: 'b', ab: 'w' },
      [19, 19],
      ['ac', 'b'],
      { aa: 'b', bb: 'b', ac: 'b' },
    ],
    [
      { aa: 'b', bb: 'b', ba: 'w' },
      [19, 19],
      ['ca', 'b'],
      { aa: 'b', bb: 'b', ca: 'b' },
    ],
    [
      { ea: 'b', db: 'b', eb: 'w' },
      [5, 5],
      ['ec', 'b'],
      { ea: 'b', db: 'b', ec: 'b' },
    ],
    [
      { ee: 'b', dd: 'b', de: 'w' },
      [5, 5],
      ['ce', 'b'],
      { ee: 'b', dd: 'b', ce: 'b' },
    ],

    // Bulk captures
    [
      {
        aa: 'b',
        ab: 'b',
        ac: 'b',
        ba: 'b',
        bc: 'b',
        ca: 'b',
        cb: 'b',
        cc: 'b',
      },
      [3, 3],
      ['bb', 'w'],
      { bb: 'w' },
    ],
  ]).test(
    'should place a stone and correctly handle captures',
    (initialBoard, boardSize, newStone, expectedBoard) => {
      // TODO: each this to test every corner
      const state: GameStateWithHistory = {
        boardState: initialBoard,
        properties: { boardSize },
        node: {},
        history: [],
      };

      let newState = state;
      const dispatch: ThunkDispatch<GameStateWithHistory> = jest.fn(action => {
        if (typeof action === 'function') {
          action(dispatch, state);
        } else {
          newState = gameStateReducer(newState, action);
        }
      });

      placeStone(newStone[0], newStone[1], dispatch);
      expect(newState).toEqual({
        boardState: expectedBoard,
        properties: { boardSize },
        node: {},
        history: [],
      });
    }
  );
});
