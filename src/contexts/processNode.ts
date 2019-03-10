import { GameNode } from 'parseSgf/parseSgf';
import { ThunkDispatch } from 'hooks/useThunkReducer';
import placeStone from './placeStone';
import { setPoint, setBoardSize } from './actions';
import { GameStateWithHistory } from './GoGameContext';

const processNode = (
  node: GameNode,
  dispatch: ThunkDispatch<GameStateWithHistory>
) => {
  const properties = node.properties || {};

  // Board State
  if (properties.B) {
    placeStone(properties.B[0], 'b', dispatch);
  }
  if (properties.W) {
    placeStone(properties.W[0], 'w', dispatch);
  }
  if (properties.AB) {
    dispatch(setPoint(properties.AB, 'b'));
  }
  if (properties.AW) {
    dispatch(setPoint(properties.AW, 'w'));
  }

  // Root only
  // TODO: Validate these -- they should only appear in root nodes
  if (properties.SZ) {
    dispatch(setBoardSize(properties.SZ));
  }
};

export default processNode;