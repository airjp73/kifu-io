import { GameStateWithHistory } from './gameStateReducer';
import { ThunkAction } from 'hooks/useThunkReducer';
import { NodeProperties } from './parseSgf/parseSgf';
import { GameTreeNode } from './parseSgf/normalizeGameTree'
import processNodeProperties from './processNode'
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
  const properties: NodeProperties = {
    [playerToPlay.toUpperCase()]: [point]
  };

  dispatch(pushHistory())
  dispatch({
    type: ADD_NODE,
    payload: properties
  } as AddNodeAction);

  processNodeProperties(properties, dispatch);
};

export type GameTreeAction = AddNodeAction;
