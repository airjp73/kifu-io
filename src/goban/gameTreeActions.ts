import { GameStateWithHistory } from './gameStateReducer';
import { ThunkAction } from 'hooks/useThunkReducer';
import { NodeProperties } from './parseSgf/parseSgf';
import processNodeProperties from './processNode';
import { pushHistory, setNode } from './actions';

export const ADD_NODE = 'game-tree/addNode';
export const DELETE_BRANCH = 'game-tree/deleteBranch';

export interface AddNodeAction {
  type: typeof ADD_NODE;
  payload: NodeProperties;
}

export const addMove = (point: string): ThunkAction<GameStateWithHistory> => (
  dispatch,
  getState
) => {
  const playerToPlay = getState().moveState.playerToPlay ?? 'b';
  const propName = playerToPlay.toUpperCase();

  dispatch(pushHistory());

  const existingBranch = getState()
    .gameTree.nodes[getState().node].children?.map(
      child => getState().gameTree.nodes[child]
    )
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

export interface DeleteBranchAction {
  type: typeof DELETE_BRANCH;
  payload: string;
}
export const deleteBranch = (nodeId: string) => ({
  type: DELETE_BRANCH,
  payload: nodeId,
});

export type GameTreeAction = AddNodeAction;
