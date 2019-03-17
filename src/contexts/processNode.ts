import { GameNode } from 'parseSgf/parseSgf';
import { ThunkDispatch } from 'hooks/useThunkReducer';
import placeStone from './placeStone';
import {
  setPoint,
  setBoardSize,
  setApplication,
  SetVariationDisplaySettings,
} from './actions';
import { GameStateWithHistory } from './gameStateReducer';
import { addCircles, addTriangles, addSquares, addLines } from './moveStateActions';

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
const defaultLog = (message: string) => console.log(message); // eslint-disable-line no-console

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

  // Markup properties
  // Validation TODO -- a single point may not have more than one of CR, MA, SL, SQ, TR
  if (properties.AR) {
    // TODO
    // point:point
    // draw an arror from first point to the second point
  }
  if (properties.CR) {
    dispatch(addCircles(properties.CR));
  }
  if (properties.DD) {
    // TODO
    // Dim the points
    // inherited
  }
  if (properties.LB) {
    // TODO: Tackle at the same time as coordinates
    // Text label centered on point
  }
  if (properties.LN) {
    dispatch(addLines(properties.LN));
  }
  if (properties.MA) {
    // TODO: Same as LB
    // Mark with X
  }
  if (properties.SL) {
    // TODO
    // 'select' points -- exact markup not specified
    // Maybe highlight or something
  }
  if (properties.SQ) {
    dispatch(addSquares(properties.SQ));
  }
  if (properties.TR) {
    dispatch(addTriangles(properties.TR));
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
  if (properties.GM && properties.GM[0] !== '1') {
    // IGNORE: This will always be 1
    throw 'Games other than Go or not supported';
  }
  if (properties.ST) {
    dispatch(SetVariationDisplaySettings(properties.ST));
  }
  if (properties.SZ) {
    dispatch(setBoardSize(properties.SZ));
  }
};

export default processNode;
