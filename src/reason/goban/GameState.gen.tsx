/* TypeScript file generated from GameState.re by genType. */
/* eslint-disable import/first */


const $$toRE40962700: { [key: string]: any } = {"Init": 0, "PopHistory": 1, "PushHistory": 2, "SetMove": 3, "SetNode": 4, "SetPoint": 5, "SetProperty": 6, "StartEditing": 7, "SgfCopied": 8, "AddNode": 9, "DeleteBranch": 10};

const $$toRE447283240: { [key: string]: any } = {"Black": 0, "White": 1};

// tslint:disable-next-line:no-var-requires
const CreateBucklescriptBlock = require('bs-platform/lib/es6/block.js');

// tslint:disable-next-line:no-var-requires
const Curry = require('bs-platform/lib/es6/curry.js');

// tslint:disable-next-line:no-var-requires
const GameStateBS = require('./GameState.bs');

import {Dict_t as Js_Dict_t} from '../../../src/reason/shims/Js.shim';

import {list} from '../../../src/reason/shims/ReasonPervasives.shim';

// tslint:disable-next-line:interface-over-type-literal
export type stoneColor = "Black" | "White";

// tslint:disable-next-line:interface-over-type-literal
export type gameStateAction = 
    "Init"
  | "PopHistory"
  | "PushHistory"
  | "SetMove"
  | "SetNode"
  | "SetPoint"
  | "SetProperty"
  | "StartEditing"
  | "SgfCopied"
  | "AddNode"
  | "DeleteBranch"
  | [list<string>, stoneColor];

// tslint:disable-next-line:interface-over-type-literal
export type boardState = Js_Dict_t<stoneColor>;

// tslint:disable-next-line:interface-over-type-literal
export type playedOnDates = Js_Dict_t<Js_Dict_t<list<number>>>;

// tslint:disable-next-line:interface-over-type-literal
export type showFor = "NextMove" | "CurrentMove";

// tslint:disable-next-line:interface-over-type-literal
export type application = { readonly name: string; readonly version: string };

// tslint:disable-next-line:interface-over-type-literal
export type variationDisplay = { readonly show: boolean; readonly showFor: showFor };

// tslint:disable-next-line:interface-over-type-literal
export type gameStateProperties = {
  readonly annotatorName?: string; 
  readonly application?: application; 
  readonly boardSize?: [number, number]; 
  readonly copyright?: string; 
  readonly eventName?: string; 
  readonly gameComment?: string; 
  readonly gameName?: string; 
  readonly opening?: string; 
  readonly overtime?: string; 
  readonly placePlayed?: string; 
  readonly playedOn?: playedOnDates; 
  readonly playerBlack?: string; 
  readonly playerWhite?: string; 
  readonly rankBlack?: string; 
  readonly rankWhite?: string; 
  readonly result?: string; 
  readonly round?: string; 
  readonly ruleSet?: string; 
  readonly source?: string; 
  readonly teamBlack?: string; 
  readonly teamWhite?: string; 
  readonly timeLimit?: number; 
  readonly userEnteringGameRecord?: string; 
  readonly variationDisplay?: variationDisplay
};

// tslint:disable-next-line:interface-over-type-literal
export type favoredPlayer = "Black" | "White" | "Even" | "Unclear";

// tslint:disable-next-line:interface-over-type-literal
export type positionStatus = { readonly favoredPlayer: favoredPlayer; readonly magnitude: number };

// tslint:disable-next-line:interface-over-type-literal
export type moveQualityType = "Bad" | "Doubtful" | "Interesting" | "Tesuji";

// tslint:disable-next-line:interface-over-type-literal
export type moveQuality = { readonly quality: moveQualityType; readonly magnitude?: number };

// tslint:disable-next-line:interface-over-type-literal
export type label = { readonly point: string; readonly label: string };

// tslint:disable-next-line:interface-over-type-literal
export type moveState = {
  readonly circles: list<string>; 
  readonly comment?: string; 
  readonly estimatedScore?: number; 
  readonly hotspot?: boolean; 
  readonly lines: list<[string, string]>; 
  readonly moveQuality?: moveQuality; 
  readonly name?: string; 
  readonly playerToPlay?: stoneColor; 
  readonly positionStatus?: positionStatus; 
  readonly squares: list<string>; 
  readonly triangles: list<string>; 
  readonly xMarks: list<string>; 
  readonly labels: list<label>
};

// tslint:disable-next-line:interface-over-type-literal
export type gameTreeNode = {
  readonly id: string; 
  readonly parent?: string; 
  readonly children?: list<string>; 
  readonly properties?: Js_Dict_t<list<string>>; 
  readonly moveNumber?: number
};

// tslint:disable-next-line:interface-over-type-literal
export type gameTree = { readonly rootNode: string; readonly nodes: Js_Dict_t<gameTreeNode> };

// tslint:disable-next-line:interface-over-type-literal
export type captureCounts = { readonly b: number; readonly w: number };

// tslint:disable-next-line:interface-over-type-literal
export type gameState = {
  readonly properties: gameStateProperties; 
  readonly boardState: boardState; 
  readonly node: string; 
  readonly moveState: moveState; 
  readonly captureCounts: captureCounts
};

export const captureCountReducer: (state:captureCounts, action:gameStateAction) => captureCounts = function (Arg1: any, Arg2: any) {
  const result = Curry._2(GameStateBS.captureCountReducer, Arg1, typeof(Arg2) === 'object'
    ? CreateBucklescriptBlock.__(0, [Arg2[0], $$toRE447283240[Arg2[1]]])
    : $$toRE40962700[Arg2]);
  return result
};

export const updateCaptureCount: (state:captureCounts, points:list<string>, color:stoneColor) => captureCounts = function (Arg1: any, Arg2: any, Arg3: any) {
  const result = Curry._3(GameStateBS.updateCaptureCount, Arg1, Arg2, $$toRE447283240[Arg3]);
  return result
};
