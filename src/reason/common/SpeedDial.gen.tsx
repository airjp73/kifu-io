/* TypeScript file generated from SpeedDial.re by genType. */
/* eslint-disable import/first */


import * as React from 'react';

const $$toRE525102405: { [key: string]: any } = {"Left": 847852583, "Up": 19067, "Down": 759637122};

// tslint:disable-next-line:no-var-requires
const SpeedDialBS = require('./SpeedDial.bs');

// tslint:disable-next-line:interface-over-type-literal
export type direction = "Left" | "Up" | "Down";

// tslint:disable-next-line:interface-over-type-literal
export type Props = { readonly children: React.ReactNode; readonly direction?: direction };

export const make: React.ComponentType<{ readonly children: React.ReactNode; readonly direction?: direction }> = function SpeedDial(Arg1: any) {
  const $props = {children:Arg1.children, direction:(Arg1.direction == null ? undefined : $$toRE525102405[Arg1.direction])};
  const result = React.createElement(SpeedDialBS.make, $props);
  return result
};
