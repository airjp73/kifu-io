import { GameStateWithHistory } from './gameStateReducer';
import { ThunkAction } from 'hooks/useThunkReducer';
import { NodeProperties } from './parseSgf/parseSgf';
import processNodeProperties from './processNode';
import { pushHistory, setNode } from './actions';

export const ADD_NODE = 'game-tree/addNode';

export interface AddNodeAction {
  type: typeof ADD_NODE;
  payload: NodeProperties;
}

export const addMove = (point: string): ThunkAction<GameStateWithHistory> => (
  dispatch,
  state
) => {
  const playerToPlay = state.moveState.playerToPlay ?? 'b';
  const propName = playerToPlay.toUpperCase();

  dispatch(pushHistory());

  const existingBranch = state.gameTree.nodes[state.node].children
    ?.map(child => state.gameTree.nodes[child])
    .find(child => child?.properties[propName]?.[0] === point);
  if (existingBranch) {
    dispatch(setNode(existingBranch.id));
    processNodeProperties(existingBranch.properties, dispatch);
    return;
  }

  const properties: NodeProperties = {
    [propName]: [point],
  };
  dispatch({
    type: ADD_NODE,
    payload: properties,
  } as AddNodeAction);
  processNodeProperties(properties, dispatch);
};

export type GameTreeAction = AddNodeAction;
