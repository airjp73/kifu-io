type stoneColor =
  | Black
  | White;

type gameStateAction =
  | Capture(list(string), stoneColor)
  | Init
  | PopHistory
  | PushHistory
  | SetMove
  | SetNode
  | SetPoint
  | SetProperty
  | StartEditing
  | SgfCopied
  | AddNode
  | DeleteBranch;

[@gentype]
type boardState = Js.Dict.t(stoneColor);

[@gentype]
type playedOnDates = Js.Dict.t(Js.Dict.t(list(int)));

[@gentype]
type showFor =
  | NextMove
  | CurrentMove;

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

[@gentype]
type favoredPlayer =
  | Black
  | White
  | Even
  | Unclear;

[@gentype]
type positionStatus = {
  favoredPlayer,
  magnitude: int,
};

[@gentype]
type moveQualityType =
  | Bad
  | Doubtful
  | Interesting
  | Tesuji;

[@gentype]
type moveQuality = {
  quality: moveQualityType,
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
  playerToPlay: option(stoneColor),
  positionStatus: option(positionStatus),
  squares: list(string),
  triangles: list(string),
  xMarks: list(string),
  labels: list(label),
};

[@gentype]
type gameTreeNode = {
  id: string,
  parent: option(string),
  children: option(list(string)),
  properties: option(Js.Dict.t(list(string))),
  moveNumber: option(int),
};

[@gentype]
type gameTree = {
  rootNode: string,
  nodes: Js.Dict.t(gameTreeNode),
};

// type gameStateWithHistory(gameState) = {
//   history: list(gameState),
//   gameTree: gameTree,
//   editMode: bool

[@gentype]
type captureCounts = {
  b: int,
  w: int,
};

[@gentype]
type gameState = {
  properties: gameStateProperties,
  boardState,
  node: string,
  moveState,
  captureCounts,
};

[@gentype]
let captureCountReducer =
    (state: captureCounts, action: gameStateAction): captureCounts => {
  let newCount = (points, count) => count + List.length(points);
  switch (action) {
  | Capture(points, Black) => {...state, b: newCount(points, state.b)}
  | Capture(points, White) => {...state, w: newCount(points, state.w)}
  | _ => state
  };
};
