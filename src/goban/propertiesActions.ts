import { GameStateProperties, PlayedOnDates } from './gameStateReducer';

export const SET_PROPERTY = 'SET_PROPERTY';

type SetPropertyActionPayload = Partial<GameStateProperties>;
export interface SetPropertyAction {
  type: typeof SET_PROPERTY;
  properties: SetPropertyActionPayload;
}

export const setProperty = (
  properties: SetPropertyActionPayload
): SetPropertyAction => ({
  type: SET_PROPERTY,
  properties,
});

export const setApplication = (applicationProperty: string[]) => {
  const property = applicationProperty[0].split(':');
  return setProperty({
    application: {
      name: property[0],
      version: property[1],
    },
  });
};

export const SetVariationDisplaySettings = (property: string[]) => {
  const value = parseInt(property[0]);
  return setProperty({
    variationDisplay: {
      show: value < 2,
      showFor: value === 1 || value === 3 ? 'CURRENT_MOVE' : 'NEXT_MOVE',
    },
  });
};

export const setBoardSize = (sizeProperty: string[]) => {
  // One value (SZ[19]) means square board
  // Two values (SZ[19:10]) means rectangular board
  const value = sizeProperty[0].split(':');
  const x = parseInt(value[0]);
  const y = value[1] ? parseInt(value[1]) : x;
  return setProperty({ boardSize: [x, y] });
};

export const setAnnotatorName = (annotatorValue: string[]) =>
  setProperty({ annotatorName: annotatorValue[0] });

export const setPlayedOnDate = (dateValue: string[]) => {
  // This could probably be smarter, but it's not worthing investing too much time in
  const dateStrings = dateValue[0].split(',');
  const results: PlayedOnDates = {};
  let currentYear: string, currentMonth: string, currentDay: number;
  dateStrings.forEach(dateString => {
    // The SGF spec is strict about using dashes instead of slashes
    // but I've seen at least one example of an sgf using slashes
    const pieces = dateString.split(/-|\//);
    pieces.forEach((piece, index) => {
      if (piece.length === 4) {
        currentYear = piece;
        currentMonth = null;
        currentDay = null;
      } else if (
        (index === 1 && pieces[0].length === 4) ||
        (index === 0 && pieces.length === 2)
      ) {
        currentMonth = piece;
        currentDay = null;
      } else currentDay = parseInt(piece);
    });
    results[currentYear] = results[currentYear] || {};
    if (currentMonth) {
      results[currentYear][currentMonth] =
        results[currentYear][currentMonth] || [];
      if (currentDay) results[currentYear][currentMonth].push(currentDay);
    }
  });

  return setProperty({ playedOn: results });
};
