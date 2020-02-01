import { GameStateWithHistory } from './gameStateReducer';
import { ThunkAction } from 'hooks/useThunkReducer';
import { NodeProperties } from './parseSgf/parseSgf';
import placeStone from './placeStone'
import { pushHistory } from './actions';

export const ADD_NODE = 'game-tree/addNode';

export interface AddNodeAction {
  type: typeof ADD_NODE;
  payload: NodeProperties
}

export const addMove = (point: string): ThunkAction<GameStateWithHistory> => (
  dispatch,
  state
) => {
  const playerToPlay = state.moveState.playerToPlay ?? 'b';
  dispatch(pushHistory())
  dispatch({
    type: ADD_NODE,
    payload: {
      [playerToPlay.toUpperCase()]: [point]
    }
  } as AddNodeAction);
  placeStone(point, playerToPlay, dispatch);
};

export type GameTreeAction = AddNodeAction;
