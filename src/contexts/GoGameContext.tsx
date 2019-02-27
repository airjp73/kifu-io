import React, { useContext, useMemo, useReducer, useEffect } from 'react';
import parseSgf from 'parseSgf';
import { Point } from 'components/Goban';

export interface GameState {
  [key: string]: Point;
}
export interface GameContext {
  gameState: GameState;
  properties: {};
}
const GoGameContext = React.createContext<GameContext>(null);
export const useGoGameContext = () => useContext(GoGameContext);

interface GameAction {
  type: string;
  point: string;
  color: 'b' | 'w';
}
const gameContextReducer = (
  state: GameContext,
  action: GameAction
): GameContext => {
  switch (action.type) {
    case 'add_stone':
      return {
        ...state,
        gameState: { ...state.gameState, [action.point]: action.color },
      };
    default:
      return state;
  }
};

interface GoGameContextProviderProps {
  sgf: string;
}
export const GoGameContextProvider: React.FunctionComponent<
  GoGameContextProviderProps
> = ({ children, sgf }) => {
  const gameTree = useMemo(() => parseSgf(sgf), [sgf]);
  console.log(sgf);
  console.log(gameTree);
  const [gameContext, dispatch] = useReducer(gameContextReducer, {
    gameState: {},
    properties: {},
  });

  // useEffect(() => {
  //   const state: GameState = {};
  //   let node = gameTree[0];
  //   while (node) {
  //     const properties = node.properties;
  //     if (!properties) {
  //       break;
  //     }

      // if (properties.B) {
      //   dispatch({ type: 'add_stone', point: properties.B[0], color: 'b' });
      // } else if (properties.W) {
      //   dispatch({ type: 'add_stone', point: properties.W[0], color: 'w' });
      // } else if (properties.AB) {
      //   properties.AB.forEach(property => {
      //     dispatch({ type: 'add_stone', point: property, color: 'b' });
      //   });
      // } else if (properties.AW) {
      //   properties.AW.forEach(property => {
      //     dispatch({ type: 'add_stone', point: property, color: 'w' });
      //   });
      // }

  //     node = node.children && node.children[0];
  //   }
  // }, [gameTree]);

  return (
    <GoGameContext.Provider value={gameContext}>
      {children}
    </GoGameContext.Provider>
  );
};
