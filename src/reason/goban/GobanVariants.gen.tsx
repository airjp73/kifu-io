/* TypeScript file generated from GobanVariants.re by genType. */
/* eslint-disable import/first */


const $$toRE447283240: { [key: string]: any } = {"Black": 0, "White": 1};

// tslint:disable-next-line:no-var-requires
const GobanVariantsBS = require('./GobanVariants.bs');

// tslint:disable-next-line:interface-over-type-literal
export type stoneColor = "Black" | "White";

export const stoneColorString: (color:stoneColor) => string = function (Arg1: any) {
  const result = GobanVariantsBS.stoneColorString($$toRE447283240[Arg1]);
  return result
};
