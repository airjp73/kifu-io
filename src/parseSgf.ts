/*
  Collection - GameTree { GameTree }
  Sequence - Node { Node }
  GameTree - "(" Sequence { GameTree } ")"
  Node - ";" { Property }
  Property - PropIdent PropValue { PropValue }
  PropIdent = UcLetter { UcLetter }
  PropValue = "[" Value "]"

  ---- Types
  Stone / Point - [aa] (a = 1, z = 26)
    pass = [] or sometimes [tt] for boards <= 19x19
  Double - a number (e.g. GB[1] - good for black, GB[2] - very good for black)
  Simpletext - just some text?
  Text - Formatted text
  Real - Not quite sure
    Number ["." Digit { Digit }]
  Inherit - Should persist for subtree

  ---- Go-specific properties
  HA - handicap
    Generally should have AB (add black) if there is a handicap
  KM - kmoi
  TB - territory black (points must be unique)
  TW - territory white (points must be unique)

  ---- Moves should be executed even if technically illegal
  ---- We have to handle captures ourselves
  B - black move
  W - white move
  MN - specify move number
  KO - execute move even if it's illegal
    must be accompanied by a move

  ---- Setup
  ---- Stone/points in list smust be unique
  AB - add black - list of Stone
  AW - add white - list of Stone
  AE - erase - list of Point
  PL - whose turn it is to play

  ---- Node properties
  C - Comment text
  DM - Position is even - Double
  N - Name of the node - Simpletext
  V - Value of the node. - Real
    Positive is good for black, negative good for white. Usually estimated score
  -- These below should not be mixed
  GB - Good for black - Double
  GW - Good for white - Double
  HO - node is a 'hotspot' (something is interesting) - Double
  UC - Position is unclear

  ---- Move annotation properties
  BM - Move is bad - Double
  DO - Move is doubtful
  IT - Move is interesting
  TE - Move is a tesuji

  ---- Markup Properties
  AR - arrow from first point to second point - Point:Point
  CR - Circle - list of Point
  DO - Dim/Grey out points - list of Point - Inherit
    DD[] clears dim setting
  LB - Writes text on the board - Point:Simpletext
  LN - Draw line from one point to the other - Point:Point
  MA - Mark points with an X - list of Point
  SL - Selects points - list of Point
    No mandated visual representation
  SQ - Marks with Square - list of Point
  TR - Marks with triangle - list of Point

  ---- Root Properties
  AP - Name nad version of application that created the sgf - Simpletext:Simpletext
    Example: [CGoban:1.6.2]
  CA - Charset used for Simpletext and Text type
  FF - File format version
  GM - Defines game type
    Go is GM[1] and other types should throw an error
  ST - Defines how variations are shown. - number
    0 - Variations of successor node with auto-markup
    1 - Variations of current node with auto-markup
    2 - Variations of successor node NO auto-markup
    3 - Variations of current node NO auto-markup
  SZ - Size of the board - number | number:number
    SZ[19] = 19x19, SZ[10,5] = 10x5
  
  ---- Game info properties
  AN - Name of the person who made the annotations - Simpletext
  BR - Rank of black - Simpletext
  BT - Name of black team (if team match) - Simpletext
  CP - Copyright info for annotations - Simpletext
  DT - Date the game was played - YYYY-MM-DD
  EV - Name of event (e.g. tournament) - Simpletext
  GN - Name for the game - Simpletext
  GC - Some info about the game - Text
  ON - Info about opening (e.g. san-ren-sei) - Simpletext
  OT - Overtime method - Simpletext
  PB - Name of black player - Simpletext
  PC - Place game was played - Simpletext
  PW - Name of white player - Simpletext
  RE - Result - Simpletext
    0 = draw
    B+4.5 / W+65 = winner + score
    B+R / B+Resign = winner by resignation
    B+T / B+Time = winner by time
    B+F / B+Forfeit = winner by forfeit
    Void = no result
    ? = unknown result
  RO = Round number and type of round - Simpletext
    RO[01 (playoff)]
  RU = Rules - Simpletext
    AGA, GOE, Japanese, NZ
  TM - Time limits in secods - Real
  US - Name of user who entered the game - Simpletext
  WR - Rank of White
  WT - Name of white team

  ---- Timing Properties - times are in seconds
  BL - Time left for black after move was made - real
  OB - Number of black moves left to play in this byo-yomi period - number
  OW - White moves left (see OB)
  WL - time left for white (see BL)

  ---- Miscellaneous
  FG - Figures - can probably ignore
  PM - How move numbers should be printed
  VW - View only part of the board - elist of Point
    Points that are visible
    VW[] clears this

*/

export type Point = 'b' | 'w' | null;
export interface GameProperties {
  [key: string]: Array<string>,
}
export interface GameNode {
  children?: GameCollection;
  properties?: GameProperties;
}
export type GameTree = Array<GameNode>;
export type GameCollection = Array<GameTree>;

interface SgfParser {
  sgf: string;
  currentChar: number;
  peek: (ignoreWhitespace?: boolean) => string;
  next: (ignoreWhitespace?: boolean) => string;
  done: () => boolean;
  assertNotDone: () => void;
}
class SgfParser {
  constructor(sgf: string) {
    this.sgf = sgf;
    this.currentChar = 0;
    this.peek = (ignoreWhitespace = true) => {
      let nextChar = this.sgf.charAt(this.currentChar);
      while (ignoreWhitespace && /\s/.test(nextChar)) {
        ++this.currentChar;
        nextChar = this.sgf.charAt(this.currentChar);
      }
      return nextChar;
    };
    this.next = (ignoreWhitespace = true) => {
      let nextChar = this.peek(ignoreWhitespace);
      ++this.currentChar;
      return nextChar;
    }
    this.done = () => this.currentChar >= this.sgf.length;
    this.assertNotDone = () => {
      if (this.done()) {
        throw "Unexpected end of sgf file.";
      }
    }
  }
}

const parseSgf = (sgfString: string): GameCollection => {
  const parser = new SgfParser(sgfString.trim());

  function processGameCollection(): GameCollection {
    const gameCollection: GameCollection = [];
    while (!parser.done()) {
      gameCollection.push(processGameTree());
    }
    return gameCollection;
  }

  function processGameTree(): GameTree {
    const gameTree: GameTree = [];

    // A game tree starts with an open paren, if that's not what we get, throw
    const startOfTree = parser.next();
    if (startOfTree !== '(') {
      throw `Unexpected token "${startOfTree}". Expected start of game tree.`;
    }

    // Loop terminated by return or throw
    while (true) {
      parser.assertNotDone();

      const token = parser.peek();
      if (token === ';') {
        gameTree.push(processGameNode());
      } else if (token === ')') {
        parser.next();
        return gameTree;
      } else {
        throw `Unexpected token "${token}". Expected node or end of GameTree.`;
      }
    }
  }

  function processGameNode(): GameNode {
    const gameNode: GameNode = {};

    // A node starts with a semi-colon
    // This function is currently only called when the current char _is_ a semi-colon
    // but having it here will be useful to guard against future whoopsies
    const startOfNode = parser.next();
    if (startOfNode !== ';') {
      throw `Unexpected token "${startOfNode}". Expected start of node.`;
    }

    // Loop terminated by return or throw
    while (true) {
      const token = parser.peek();
      if (token === ';' || token === ')') {
        return gameNode;
      } else if (token === '(') {
        gameNode.children = gameNode.children || [];
        gameNode.children.push(processGameTree());
      } else {
        const property = processPropertyName();
        const values = [];
        while (parser.peek() === '[') {
          values.push(processPropertyValue());
        }

        // TODO: Do something nice with that info
        gameNode.properties = gameNode.properties || {};
        gameNode.properties[property] = values;
      }
    }
  }

  function processPropertyName(): string {
    // The spec technically allows for custom properties and properties longer than 2 chars
    let propertyName = '';
    while (parser.peek() !== '[') {
      parser.assertNotDone();
      propertyName += parser.next();
    }
    return propertyName;
  }

  function processPropertyValue(): string {
    let propertyValue = '';
    const startOfPropertyValue = parser.next();
    if (startOfPropertyValue !== '[') {
      throw `Unexpected token "${startOfPropertyValue}". Expected start of property value.`;
    }

    while (parser.peek(false) !== ']') {
      propertyValue += parser.next(false);
    }
    parser.next();
    return propertyValue;
  }

  return processGameCollection();
}

export default parseSgf;