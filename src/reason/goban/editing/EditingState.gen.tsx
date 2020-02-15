/* TypeScript file generated from EditingState.re by genType. */
/* eslint-disable import/first */


const $$toJS383455976: { [key: string]: any } = {"0": "AddMove"};

const $$toRE383455976: { [key: string]: any } = {"AddMove": 0};

const $$toJS447283240: { [key: string]: any } = {"0": "Black", "1": "White"};

const $$toRE447283240: { [key: string]: any } = {"Black": 0, "White": 1};

// tslint:disable-next-line:no-var-requires
const CreateBucklescriptBlock = require('bs-platform/lib/es6/block.js');

// tslint:disable-next-line:no-var-requires
const Curry = require('bs-platform/lib/es6/curry.js');

// tslint:disable-next-line:no-var-requires
const EditingStateBS = require('./EditingState.bs');

// tslint:disable-next-line:interface-over-type-literal
export type stoneColor = "Black" | "White";

// tslint:disable-next-line:interface-over-type-literal
export type tool = 
    "AddMove"
  | { tag: "AddStone"; value: stoneColor };

// tslint:disable-next-line:interface-over-type-literal
export type stateType = { readonly tool: tool };

// tslint:disable-next-line:interface-over-type-literal
export type actionType = { tag: "SetTool"; value: tool };

// tslint:disable-next-line:interface-over-type-literal
export type dispatchType = (_1:actionType) => void;

export const reducer: (state:stateType, action:actionType) => stateType = function (Arg1: any, Arg2: any) {
  const result = Curry._2(EditingStateBS.reducer, {tool:typeof(Arg1.tool) === 'object'
    ? CreateBucklescriptBlock.__(0, [$$toRE447283240[Arg1.tool.value]])
    : $$toRE383455976[Arg1.tool]}, CreateBucklescriptBlock.__(0, [typeof(Arg2.value) === 'object'
    ? CreateBucklescriptBlock.__(0, [$$toRE447283240[Arg2.value.value]])
    : $$toRE383455976[Arg2.value]]));
  return {tool:typeof(result.tool) === 'object'
    ? {tag:"AddStone", value:$$toJS447283240[result.tool[0]]}
    : $$toJS383455976[result.tool]}
};
