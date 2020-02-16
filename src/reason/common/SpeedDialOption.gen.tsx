/* TypeScript file generated from SpeedDialOption.re by genType. */
/* eslint-disable import/first */


import * as React from 'react';

const $$toRE222696848: { [key: string]: any } = {"Medium": 0, "Small": 1};

// tslint:disable-next-line:no-var-requires
const SpeedDialOptionBS = require('./SpeedDialOption.bs');

// tslint:disable-next-line:interface-over-type-literal
export type size = "Medium" | "Small";

// tslint:disable-next-line:interface-over-type-literal
export type Props = {
  readonly children: React.ReactNode; 
  readonly highlighted?: boolean; 
  readonly label: string; 
  readonly labelAbove?: boolean; 
  readonly size?: size
};

export const make: React.ComponentType<{
  readonly children: React.ReactNode; 
  readonly highlighted?: boolean; 
  readonly label: string; 
  readonly labelAbove?: boolean; 
  readonly size?: size
}> = function SpeedDialOption(Arg1: any) {
  const $props = {children:Arg1.children, highlighted:Arg1.highlighted, label:Arg1.label, labelAbove:Arg1.labelAbove, size:(Arg1.size == null ? undefined : $$toRE222696848[Arg1.size])};
  const result = React.createElement(SpeedDialOptionBS.make, $props);
  return result
};
