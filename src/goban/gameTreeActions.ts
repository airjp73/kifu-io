import { GameStateWithHistory } from './gameStateReducer';
import { ThunkAction } from 'hooks/useThunkReducer';
import { NodeProperties } from './parseSgf/parseSgf';
import processNodeProperties from './processNode';
import { pushHistory, setNode, setPoint } from './actions';
import { StoneColor } from './Goban';

export const ADD_NODE = 'game-tree/addNode';
export const DELETE_BRANCH = 'game-tree/deleteBranch';
export const EDIT_POINT = 'game-tree/editPoint';

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

  if (getState().boardState[point]) return;

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

export interface EditPointAction {
  type: typeof EDIT_POINT;
  payload: { point: string; color: StoneColor };
}
export const editPoint = (
  point: string,
  color: StoneColor
): ThunkAction<GameStateWithHistory> => (dispatch, getState) => {
  const currentNode = getState().gameTree.nodes[getState().node];
  if (currentNode.properties.B || currentNode.properties.W) {
    dispatch(pushHistory());
    dispatch({
      type: ADD_NODE,
      payload: color === 'b' ? { AB: [point] } : { AW: [point] },
    } as AddNodeAction);
    dispatch(setPoint([point], color));
  } else {
    dispatch({
      type: EDIT_POINT,
      payload: { point, color },
    } as EditPointAction);
  }
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
