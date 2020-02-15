/* TypeScript file generated from GobanMousePosition.re by genType. */
/* eslint-disable import/first */


// tslint:disable-next-line:no-var-requires
const Curry = require('bs-platform/lib/es6/curry.js');

// tslint:disable-next-line:no-var-requires
const GobanMousePositionBS = require('./GobanMousePosition.bs');

import {Mouse_t as ReactEvent_Mouse_t} from '../../../src/reason/shims/ReactEvent.shim';

// tslint:disable-next-line:interface-over-type-literal
export type mousePosition = { readonly x: number; readonly y: number };

// tslint:disable-next-line:interface-over-type-literal
export type mousePositionProps = {
  readonly onMouseMove: (_1:ReactEvent_Mouse_t) => void; 
  readonly onMouseLeave: (_1:ReactEvent_Mouse_t) => void; 
  readonly onClick: (_1:ReactEvent_Mouse_t) => void
};

export const useMousePosition: (coordToPointIndex:((_1:number) => number), onClick:((_1:mousePosition) => void)) => [(null | undefined | mousePosition), mousePositionProps] = function (Arg1: any, Arg2: any) {
  const result = Curry._2(GobanMousePositionBS.useMousePosition, Arg1, Arg2);
  return result
};
