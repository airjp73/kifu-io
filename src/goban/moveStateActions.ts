import { MoveState, MoveQualityType } from './gameStateReducer';
import { StoneColor } from 'goban/Goban';

export const SET_MOVE_STATE = 'SET_MOVE_STATE';

type MoveStateActionPayload = Partial<MoveState>;
export interface SetMoveStateAction {
  type: typeof SET_MOVE_STATE;
  moveState: MoveStateActionPayload;
}

const setMoveState = (
  moveState: MoveStateActionPayload
): SetMoveStateAction => ({
  type: SET_MOVE_STATE,
  moveState,
});

export const addCircles = (circles: string[]) => setMoveState({ circles });

export const addComment = (comment: string[]) =>
  setMoveState({ comment: comment[0] });

export const addLines = (lines: string[]) =>
  setMoveState({
    lines: lines.map(line => line.split(':') as [string, string]),
  });

export const addName = (name: string[]) => setMoveState({ name: name[0] });

export const addSquares = (squares: string[]) => setMoveState({ squares });

export const addTriangles = (triangles: string[]) =>
  setMoveState({ triangles });

export const addXMarks = (xMarks: string[]) => setMoveState({ xMarks });

export const addLabels = (labelValues: string[]) =>
  setMoveState({
    labels: labelValues.map(labelValue => {
      const [point, label] = labelValue.split(':');
      return { point, label };
    }),
  });

export const setPlayerToPlay = (playerToPlay: string[]) =>
  setMoveState({
    playerToPlay: playerToPlay[0].toLowerCase() as StoneColor,
  });

export const setPositionStatus = (
  favoredPlayer: StoneColor | 'even' | 'unclear',
  magnitude: string[]
) =>
  setMoveState({
    positionStatus: { favoredPlayer, magnitude: parseInt(magnitude[0]) },
  });

export const setMoveAsHotspot = () => setMoveState({ hotspot: true });

export const setMoveQuality = (
  quality: MoveQualityType,
  magnitude?: string[]
) =>
  setMoveState({
    moveQuality: {
      quality,
      magnitude: magnitude ? parseInt(magnitude[0]) : null,
    },
  });

export const setEstimatedScore = (score: string[]) =>
  setMoveState({ estimatedScore: parseFloat(score[0]) });
