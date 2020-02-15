/* TypeScript file generated from EditingContext.re by genType. */
/* eslint-disable import/first */


import * as React from 'react';

const $$toJS383455976: { [key: string]: any } = {"0": "AddMove"};

const $$toRE383455976: { [key: string]: any } = {"AddMove": 0};

const $$toJS447283240: { [key: string]: any } = {"0": "Black", "1": "White"};

const $$toRE447283240: { [key: string]: any } = {"Black": 0, "White": 1};

// tslint:disable-next-line:no-var-requires
const CreateBucklescriptBlock = require('bs-platform/lib/es6/block.js');

// tslint:disable-next-line:no-var-requires
const Curry = require('bs-platform/lib/es6/curry.js');

// tslint:disable-next-line:no-var-requires
const EditingContextBS = require('./EditingContext.bs');

import {dispatchType as EditingState_dispatchType} from './EditingState.gen';

import {stateType as EditingState_stateType} from './EditingState.gen';

// tslint:disable-next-line:interface-over-type-literal
export type contextType = [EditingState_stateType, EditingState_dispatchType];

export const context: React.Context<contextType> = EditingContextBS.context;

export const useEditingContext: () => contextType = function () {
  const result = EditingContextBS.useEditingContext();
  return [{tool:typeof(result[0].tool) === 'object'
    ? {tag:"AddStone", value:$$toJS447283240[result[0].tool[0]]}
    : $$toJS383455976[result[0].tool]}, function (Arg1: any) {
      const result1 = result[1](CreateBucklescriptBlock.__(0, [typeof(Arg1.value) === 'object'
        ? CreateBucklescriptBlock.__(0, [$$toRE447283240[Arg1.value.value]])
        : $$toRE383455976[Arg1.value]]));
      return result1
    }]
};

export const makeProps: <T1,T2>(_1:{ readonly value: T1; readonly children: T2 }, param:void) => { readonly children: T2; readonly value: T1 } = function <T1,T2>(Arg1: any, Arg2: any) {
  const result = Curry._3(EditingContextBS.makeProps, Arg1.value, Arg1.children, Arg2);
  return result
};

// tslint:disable-next-line:interface-over-type-literal
export type Props = { readonly children: React.ReactNode; readonly value: contextType };

export const make: React.ComponentType<{ readonly children: React.ReactNode; readonly value: contextType }> = function EditingContext(Arg1: any) {
  const $props = {children:Arg1.children, value:[{tool:typeof(Arg1.value[0].tool) === 'object'
    ? CreateBucklescriptBlock.__(0, [$$toRE447283240[Arg1.value[0].tool.value]])
    : $$toRE383455976[Arg1.value[0].tool]}, function (Arg11: any) {
      const result1 = Arg1.value[1]({tag:"SetTool", value:typeof(Arg11[0]) === 'object'
        ? {tag:"AddStone", value:$$toJS447283240[Arg11[0][0]]}
        : $$toJS383455976[Arg11[0]]});
      return result1
    }]};
  const result = React.createElement(EditingContextBS.make, $props);
  return result
};
