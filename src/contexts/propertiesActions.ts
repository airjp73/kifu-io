import { GameStateProperties } from './gameStateReducer';

export const SET_PROPERTY = 'SET_PROPERTY';

type SetPropertyActionPayload = Partial<GameStateProperties>;
export interface SetPropertyAction {
  type: typeof SET_PROPERTY;
  properties: SetPropertyActionPayload;
}

const setProperty = (
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
      show: value - 2 >= 0,
      showFor: value % 2 === 1 ? 'CURRENT_MOVE' : 'NEXT_MOVE',
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
