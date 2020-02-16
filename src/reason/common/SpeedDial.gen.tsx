/* TypeScript file generated from SpeedDial.re by genType. */
/* eslint-disable import/first */


import * as React from 'react';

const $$toRE669918807: { [key: string]: any } = {"Up": 0, "Down": 1, "Left": 2};

// tslint:disable-next-line:no-var-requires
const SpeedDialBS = require('./SpeedDial.bs');

// tslint:disable-next-line:interface-over-type-literal
export type direction = "Up" | "Down" | "Left";

// tslint:disable-next-line:interface-over-type-literal
export type Props = { readonly children: React.ReactNode; readonly direction?: direction };

export const make: React.ComponentType<{ readonly children: React.ReactNode; readonly direction?: direction }> = function SpeedDial(Arg1: any) {
  const $props = {children:Arg1.children, direction:(Arg1.direction == null ? undefined : $$toRE669918807[Arg1.direction])};
  const result = React.createElement(SpeedDialBS.make, $props);
  return result
};
