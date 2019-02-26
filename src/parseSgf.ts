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

// Primary export
const parseSgf = (sgfString: string): Array<GameNode> =>
  new SgfParser(sgfString.trim()).parse();

// Internal SgfParser type
interface SgfParser {
  sgf: string;
  currentChar: number;
  assertNotDone: () => void;
  done: () => boolean;
  next: (ignoreWhitespace?: boolean) => string;
  parse: () => Array<GameNode>;
  peek: (ignoreWhitespace?: boolean) => string;
  processGameNode: (parent?: GameNode) => GameNode;
  processGameTree: (parent?: GameNode) => Array<GameNode>;
  processPropertyName: () => string;
  processPropertyValue: () => string;
  throw: (message: string) => void;
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

    this.done = () => this.currentChar >= this.sgf.length || !this.peek();

    this.assertNotDone = () => {
      if (this.done()) {
        this.throw('Unexpected end of sgf file.');
      }
    };

    this.throw = message => {
      const firstChar = Math.max(this.currentChar - 10, 0);
      const lastChar = Math.min(this.currentChar + 10, this.sgf.length - 1);

      throw new Error(message + ' ' + this.sgf.substr(firstChar, lastChar));
    };

    this.parse = () => this.processGameTree();

    this.processGameTree = parent => {
      const gameTree: Array<GameNode> = [];

      while (!this.done()) {
        const token = this.next();
        if (token === '(') {
          gameTree.push(this.processGameNode(parent));
          // Consume closing paren
          this.next();
        } else if (token === ')') {
          return gameTree;
        } else {
          this.throw(
            `Unexpected token "${token}". Expected start or end of sub-tree.`
          );
        }
      }

      return gameTree;
    };

    this.processGameNode = parent => {
      const gameNode: GameNode = { parent };

      // Consume node start so we can assume later that `;` means next node
      const startOfNode = this.next();
      if (startOfNode !== ';') {
        this.throw(
          `Unexpected token "${startOfNode}". Expected start of node.`
        );
      }

      while (true) {
        const token = this.peek();

        switch (token) {
          case ';':
            gameNode.children = [this.processGameNode(gameNode)];
            return gameNode;
          case ')':
            return gameNode;
          case '(':
            gameNode.children = this.processGameTree(gameNode);
            return gameNode;
          default:
            const property = this.processPropertyName();
            const values = [];
            while (this.peek() === '[') {
              values.push(this.processPropertyValue());
            }

            gameNode.properties = gameNode.properties || {};
            gameNode.properties[property] = values;
        }
      }
    };

    this.processPropertyName = () => {
      // Every property must have a value, so we can terminate the loop with the start of a value '['
      let propertyName = '';
      while (this.peek() !== '[') {
        propertyName += this.next();
      }
      return propertyName;
    };

    this.processPropertyValue = () => {
      // Consume opening '[' character
      this.next();

      // Property values should not skip over whitespace
      let propertyValue = '';
      while (this.peek(false) !== ']') {
        // Check for characters escaped with '\'
        let nextChar = this.next(false);
        if (nextChar === '\\') {
          nextChar === this.next(false);
        }
        propertyValue += nextChar;
      }

      // Consume close ']' character
      this.next();

      return propertyValue;
    };
  }
}

export default parseSgf;
