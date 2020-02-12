/* TypeScript file generated from GameState.re by genType. */
/* eslint-disable import/first */


// tslint:disable-next-line:no-var-requires
const Curry = require('bs-platform/lib/es6/curry.js');

// tslint:disable-next-line:no-var-requires
const GameStateBS = require('./GameState.bs');

// tslint:disable-next-line:interface-over-type-literal
export type captureCounts = { readonly b: number; readonly w: number };

export const defaultCaptureCounts: captureCounts = GameStateBS.defaultCaptureCounts;

export const updateCaptureCount: (state:captureCounts, points:string[], color:string) => captureCounts = function (Arg1: any, Arg2: any, Arg3: any) {
  const result = Curry._3(GameStateBS.updateCaptureCount, Arg1, Arg2, Arg3);
  return result
};
