import { GameNode } from 'parseSgf/parseSgf';
import { ThunkDispatch } from 'hooks/useThunkReducer';
import placeStone from './placeStone';
import { setPoint } from './actions';
import {
  setBoardSize,
  setApplication,
  setPlayedOnDate,
  setProperty,
  SetVariationDisplaySettings,
} from './propertiesActions';
import { GameStateWithHistory } from './gameStateReducer';
import {
  addCircles,
  addTriangles,
  addSquares,
  addLines,
  addComment,
  addName,
  setPlayerToPlay,
  setPositionStatus,
  setMoveAsHotspot,
  setMoveQuality,
  setEstimatedScore,
} from './moveStateActions';

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
    dispatch(setPlayerToPlay(properties.PL));
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
    dispatch(addComment(properties.C));
  }

  if (properties.N) {
    dispatch(addName(properties.N));
  }

  if (properties.DM) {
    dispatch(setPositionStatus('even', properties.DM));
  }

  if (properties.GB) {
    dispatch(setPositionStatus('b', properties.GB));
  }

  if (properties.GW) {
    dispatch(setPositionStatus('w', properties.GW));
  }

  if (properties.UC) {
    dispatch(setPositionStatus('unclear', properties.UC));
  }

  if (properties.HO) {
    dispatch(setMoveAsHotspot());
  }

  if (properties.V) {
    dispatch(setEstimatedScore(properties.V));
  }

  // Move annotation properties
  if (properties.BM) {
    dispatch(setMoveQuality('bad', properties.BM));
  }

  if (properties.DO) {
    dispatch(setMoveQuality('doubtful'));
  }

  if (properties.IT) {
    dispatch(setMoveQuality('interesting'));
  }

  if (properties.TE) {
    dispatch(setMoveQuality('tesuji', properties.TE));
  }

  // Markup properties
  // Validation TODO -- a single point may not have more than one of CR, MA, SL, SQ, TR
  if (properties.AR) {
    // TODO
    // point:point
    // draw an arror from first point to the second point
    // Not common in go applications so it can wait
  }

  if (properties.CR) {
    dispatch(addCircles(properties.CR));
  }

  if (properties.DD) {
    // TODO
    // Dim the points
    // inherited
    // Not common in go applications so it can wait
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
    // Not common in go applications so it can wait
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

  // Game info properties
  if (properties.AN) {
    dispatch(setProperty({ annotatorName: properties.AN[0] }));
  }

  if (properties.BR) {
    dispatch(setProperty({ rankBlack: properties.BR[0] }));
  }

  if (properties.BT) {
    dispatch(setProperty({ teamBlack: properties.BT[0] }));
  }

  if (properties.CP) {
    dispatch(setProperty({ copyright: properties.CP[0] }));
  }

  if (properties.DT) {
    dispatch(setPlayedOnDate(properties.DT));
  }

  if (properties.EV) {
    dispatch(setProperty({ eventName: properties.EV[0] }));
  }

  if (properties.GN) {
    dispatch(setProperty({ gameName: properties.GN[0] }));
  }

  if (properties.GC) {
    dispatch(setProperty({ gameComment: properties.GC[0] }));
  }

  if (properties.ON) {
    dispatch(setProperty({ opening: properties.ON[0] }));
  }

  if (properties.OT) {
    dispatch(setProperty({ overtime: properties.OT[0] }));
  }

  if (properties.PB) {
    dispatch(setProperty({ playerBlack: properties.PB[0] }));
  }

  if (properties.PW) {
    dispatch(setProperty({ playerWhite: properties.PW[0] }));
  }

  if (properties.PC) {
    dispatch(setProperty({ placePlayed: properties.PC[0] }));
  }

  if (properties.RE) {
    dispatch(setProperty({ result: properties.RE[0] }));
  }

  if (properties.RO) {
    // something
  }

  if (properties.RU) {
    dispatch(setProperty({ ruleSet: properties.RU[0] }));
  }

  if (properties.SO) {
    dispatch(setProperty({ source: properties.SO[0] }));
  }

  if (properties.TM) {
    dispatch(setProperty({ timeLimit: parseInt(properties.TM[0]) }));
  }

  if (properties.US) {
    dispatch(setProperty({ userEnteringGameRecord: properties.US[0] }));
  }

  if (properties.WR) {
    dispatch(setProperty({ rankWhite: properties.WR[0] }));
  }

  if (properties.WT) {
    dispatch(setProperty({ teamWhite: properties.WT[0] }));
  }

  // Miscelleaneous properties
  // FG, PR, VW all IGNORED
  // Primarily used for printing
};

export default processNode;
