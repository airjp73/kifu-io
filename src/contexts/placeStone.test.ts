import { GameStateWithHistory } from './GoGameContext';
import gameStateReducer from './reducers';
import { ThunkDispatch } from 'hooks/useThunkReducer';
import placeStone from './placeStone';

describe('placeStone', () => {
  test('should handle corner captures', () => {
    // TODO: each this to test every corner
    const state: GameStateWithHistory = {
      boardState: { aa: 'b', ab: 'w' },
      properties: {},
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

    placeStone('ba', 'w', dispatch);
    expect(newState).toEqual({
      boardState: { ab: 'w', ba: 'w' },
      properties: {},
      node: {},
      history: [],
    });
  });
});
