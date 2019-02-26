/*
  `parseSgf` takes the raw sgf text and converts it into a js object.
  It doesn't know anything about what the properties do --
  It's up to external code to discern the meaning of a property.

  Collection - GameTree { GameTree }
  Sequence - Node { Node }
  GameTree - "(" Sequence { GameTree } ")"
  Node - ";" { Property }
  Property - PropIdent PropValue { PropValue }
  PropIdent = UcLetter { UcLetter }
  PropValue = "[" Value "]"
*/

// User facing types
export interface GameNode {
  parent?: GameNode;
  children?: Array<GameNode>;
  properties?: GameProperties;
}
export interface GameProperties {
  [key: string]: Array<string>;
}
export type GameNodeCollection = Array<GameNode>;

// Primary export
const parseSgf = (sgfString: string): GameNode =>
  new SgfParser(sgfString.trim()).parse();

// Internal SgfParser type
interface SgfParser {
  sgf: string;
  currentChar: number;
  parse: () => GameNode;
  peek: (ignoreWhitespace?: boolean) => string;
  next: (ignoreWhitespace?: boolean) => string;
  done: () => boolean;
  assertNotDone: () => void;
  processGameNode: (parent: GameNode) => void;
  processPropertyName: () => string;
  processPropertyValue: () => string;
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
    };

    this.done = () => this.currentChar >= this.sgf.length;

    this.assertNotDone = () => {
      if (this.done()) {
        throw 'Unexpected end of sgf file.';
      }
    };

    this.parse = () => {
      // At this level, the next token should always be the start of a new tree
      const startOfTree = this.next();
      if (startOfTree !== '(') {
        throw `Unexpected token "${startOfTree}". Expected start of game tree.`;
      }
      return processGameTree();
    };

    this.processGameTree = () => {
      const gameTree: GameTree = [];

      // Every tree must contain at least one node
      const startOfNode = this.peek();
      if (startOfNode !== ';') {
        throw `Unexpected token "${startOfNode}". Expected start of node.`;
      }

      // Loop terminated by return or throw
      while (true) {
        this.assertNotDone();

        const token = this.next();
        if (token === ';') {
          gameTree.push(this.processGameNode());
        } else if (token === ')') {
          return gameTree;
        } else {
          throw `Unexpected token "${token}". Expected node or end of GameTree.`;
        }
      }
    };

    this.processGameNode = (parent) => {
      const gameNode: GameNode = { parent };

      // A node starts with a semi-colon
      // This function is currently only called when the current char _is_ a semi-colon
      // but having it here will be useful to guard against future whoopsies
      // const startOfNode = this.next();
      // if (startOfNode !== ';') {
      //   throw `Unexpected token "${startOfNode}". Expected start of node.`;
      // }

      // Loop terminated by return or throw
      while (true) {
        const token = this.next();
        if (token === ';') {
          gameNode.children = [this.processGameNode(gameNode)];
          return gameNode;
        } else if (token === ')') {
          return gameNode;
        } else if (token === '(') {
          gameNode.children = gameNode.children || [];
          gameNode.children = this.processGameTree(gameNode);
        } else {
          const property = this.processPropertyName();
          const values = [];
          while (this.peek() === '[') {
            values.push(this.processPropertyValue());
          }

          // TODO: Do something nice with that info
          gameNode.properties = gameNode.properties || {};
          gameNode.properties[property] = values;
        }
      }
    };

    this.processPropertyName = () => {
      // The spec technically allows for custom properties and properties longer than 2 chars
      let propertyName = '';
      while (this.peek() !== '[') {
        this.assertNotDone();
        propertyName += this.next();
      }
      return propertyName;
    };

    this.processPropertyValue = () => {
      let propertyValue = '';
      const startOfPropertyValue = this.next();
      if (startOfPropertyValue !== '[') {
        throw `Unexpected token "${startOfPropertyValue}". Expected start of property value.`;
      }

      while (this.peek(false) !== ']') {
        propertyValue += this.next(false);
      }
      this.next();
      return propertyValue;
    };
  }
}

export default parseSgf;
