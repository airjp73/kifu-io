[@gentype]
type captureCounts = {
  b: int,
  w: int,
};

[@gentype]
let defaultCaptureCounts = {b: 0, w: 0};

[@gentype]
let updateCaptureCount =
    (state: captureCounts, points: array(string), color: string) => {
  let numCaptures = Array.length(points);
  switch (color) {
  | "b" => {...state, w: numCaptures + state.w}
  | "w" => {...state, b: numCaptures + state.b}
  | _ => state
  };
};

[@gentype]
type boardState = Js.Dict.t(string);
// TODO: make this right
// type boardState = Js.Dict.t(GobanVariants.stoneColor);

[@gentype]
type playedOnDates = Js.Dict.t(Js.Dict.t(list(int)));

[@gentype]
type showFor =
  | NEXT_MOVE
  | CURRENT_MOVE;

[@gentype]
type application = {
  name: string,
  version: string,
};

[@gentype]
type variationDisplay = {
  show: bool,
  showFor,
};

[@gentype]
type gameStateProperties = {
  annotatorName: option(string),
  application: option(application),
  boardSize: option((int, int)),
  copyright: option(string),
  eventName: option(string),
  gameComment: option(string),
  gameName: option(string),
  opening: option(string),
  overtime: option(string),
  placePlayed: option(string),
  playedOn: option(playedOnDates),
  playerBlack: option(string),
  playerWhite: option(string),
  rankBlack: option(string),
  rankWhite: option(string),
  result: option(string),
  round: option(string),
  ruleSet: option(string),
  source: option(string),
  teamBlack: option(string),
  teamWhite: option(string),
  timeLimit: option(int),
  userEnteringGameRecord: option(string),
  variationDisplay: option(variationDisplay),
};

// [@gentype]
// type favoredPlayer =
//   | Black
//   | White
//   | Even
//   | Unclear;

[@gentype]
type positionStatus = {
  // favoredPlayer,
  favoredPlayer: string,
  magnitude: int,
};

// [@gentype]
// type moveQualityType =
//   | Bad
//   | Doubtful
//   | Interesting
//   | Tesuji;

[@gentype]
type moveQuality = {
  // quality: moveQualityType,
  quality: string,
  magnitude: option(int),
};

[@gentype]
type label = {
  point: string,
  label: string,
};

[@gentype]
type moveState = {
  circles: list(string),
  comment: option(string),
  estimatedScore: option(int),
  hotspot: option(bool),
  lines: list((string, string)),
  moveQuality: option(moveQuality),
  name: option(string),
  // TODO: make this right
  // playerToPlay: option(GobanVariants.stoneColor),
  playerToPlay: option(string),
  positionStatus: option(positionStatus),
  squares: list(string),
  triangles: list(string),
  xMarks: list(string),
  labels: list(label),
};

[@gentype]
type nodeProperties = option(Js.Dict.t(array(string)));

[@gentype]
type gameTreeNode = {
  id: string,
  parent: option(string),
  children: option(list(string)),
  properties: nodeProperties,
  moveNumber: option(int),
};

[@gentype]
type gameTree = {
  rootNode: string,
  nodes: Js.Dict.t(gameTreeNode),
};

[@gentype]
type gameState = {
  properties: gameStateProperties,
  boardState,
  node: string,
  moveState,
  captureCounts,
};

type gameStateWithHistory = {
  properties: gameStateProperties,
  boardState,
  node: string,
  moveState,
  captureCounts,
  history: array(gameState),
  gameTree,
  unsavedChanges: bool,
};

[@gentype]
let addToNullableArray = (point: string, prop: option(array(string))) =>
  switch (prop) {
  | None => [|point|]
  | Some(arr) => Array.concat([arr, [|point|]])
  };
