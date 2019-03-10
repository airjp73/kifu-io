import { GameNode } from 'parseSgf/parseSgf';
import { ThunkDispatch } from 'hooks/useThunkReducer';
import placeStone from './placeStone';
import { setPoint, setBoardSize, setApplication, SetVariationDisplaySettings } from './actions';
import { GameStateWithHistory } from './reducers';

/**
 * Some properties are not-yet-implemented or deliberately ignored.
 * These properties are marked with easily findable comments.
 *
 * Key:
 * IGNORED - Deliberately ignored
 * COMPARE - Check out other implementations to see what they did
 * TODO    - Just not done yet
 */

type LogMessage = (message: string, node: GameNode) => void;
const defaultLog = (message: string) => console.log(message);

const processNode = (
  node: GameNode,
  dispatch: ThunkDispatch<GameStateWithHistory>,
  logError: LogMessage = defaultLog
) => {
  const properties = node.properties || {};

  // Sections organized like the spec for easier reference
  // https://www.red-bean.com/sgf/properties.html

  //// Move Properties
  if (properties.B) {
    placeStone(properties.B[0], 'b', dispatch);
  }
  if (properties.KO) {
    if (!properties.B && !properties.W)
      logError('Cannot have KO property without a move property', node);
    // IGNORED
    // The spec says this means to execute a move even if it's illegal
    // but it also says to do that anyway so no behavior necessary
  }
  if (properties.MN) {
    // COMPARE
    // I _think_ this is a markup-type property?
    // Like to show move numbers on the stones themselves
  }
  if (properties.W) {
    placeStone(properties.W[0], 'w', dispatch);
  }

  //// Setup Properties
  if (properties.AB) {
    dispatch(setPoint(properties.AB, 'b'));
  }
  if (properties.AE) {
    dispatch(setPoint(properties.AE, null));
  }
  if (properties.AW) {
    dispatch(setPoint(properties.AW, 'w'));
  }
  if (properties.PL) {
    // TODO
  }

  if (
    (properties.AB || properties.AE || properties.AW || properties.PL) &&
    (properties.B || properties.KO || properties.MN || properties.W)
  ) {
    logError(
      'It is illegal to have setup properties and move properties in the same node',
      node
    );
  }

  // Node annotation properties
  if (properties.C) {
    // TODO
  }

  // Root Properties
  // TODO: Validate these -- they should only appear in root nodes
  if (properties.AP) {
    dispatch(setApplication(properties.AP));
  }
  if (properties.CA) {
    // TODO
    // COMPARE
  }
  if (properties.FF && properties.FF[0] !== '4') {
    // TODO: Support old versions of the spec
    throw 'Currently only version 4 of the sgf spec is supported';
  }
  if (properties.GM && properties.GM[1] !== '1') {
    // IGNORE: This will always be 1
    throw 'Games other than GO or not supported';
  }
  if (properties.ST) {
    dispatch(SetVariationDisplaySettings(properties.ST));
  }
  if (properties.SZ) {
    dispatch(setBoardSize(properties.SZ));
  }
};

export default processNode;
