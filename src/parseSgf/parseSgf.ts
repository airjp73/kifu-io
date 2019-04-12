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
  children?: GameNode[];
  properties?: GameProperties;
}
export interface GameProperties {
  [key: string]: string[];
}

// Internal SgfParser type
interface SgfParser {
  sgf: string;
  currentChar: number;
  assertNotDone: (ignoreWhitespace?: boolean) => boolean;
  done: (ignoreWhitespace?: boolean) => boolean;
  next: (ignoreWhitespace?: boolean, testValue?: string) => string;
  parse: () => GameNode[];
  peek: (ignoreWhitespace?: boolean) => string;
  processGameNode: (parent?: GameNode) => GameNode;
  processGameTree: (parent?: GameNode) => GameNode[];
  processPropertyName: () => string;
  processPropertyValue: () => string;
  throw: (message: string) => void;
}

class SgfParser {
  public constructor(sgf: string) {
    this.sgf = sgf;
    this.currentChar = 0;

    /**
     * The entry point for outside usage.
     * Returns the fully processed game collection.
     */
    this.parse = () => this.processGameTree();

    /**
     * Peek looks at the next char but doesn't 'consume' it.
     * Technically this manipulates the state by skipping over whitespace.
     */
    this.peek = (ignoreWhitespace = true) => {
      let nextChar = this.sgf.charAt(this.currentChar);
      while (ignoreWhitespace && /\s/.test(nextChar)) {
        ++this.currentChar;
        nextChar = this.sgf.charAt(this.currentChar);
      }
      return nextChar;
    };

    /**
     * Consumes the next char and returns it.
     */
    this.next = (ignoreWhitespace = true) => {
      let nextChar = this.peek(ignoreWhitespace);
      ++this.currentChar;
      return nextChar;
    };

    /**
     * Checks if we've reached the end of the file.
     */
    this.done = ignoreWhitespace =>
      this.currentChar >= this.sgf.length || !this.peek(ignoreWhitespace);

    /**
     * Checks if we've reached the end of the file.
     * Throws an error if we have.
     * Returns true if we haven't.
     */
    this.assertNotDone = ignoreWhitespace => {
      if (this.done(ignoreWhitespace)) {
        this.throw('Unexpected end of sgf file.');
      }
      return true;
    };

    /**
     * Used for throwing an error with a nice message and a snippet of the offending part of the sgf.
     */
    this.throw = message => {
      const firstChar = Math.max(this.currentChar - 10, 0);
      const lastChar = Math.min(this.currentChar + 10, this.sgf.length - 1);

      throw new Error(
        message +
          ". Happened at: '" +
          this.sgf.substr(firstChar, lastChar) +
          "'"
      );
    };

    /**
     * Processess multiple sub-trees.
     *
     * Example: (;B[aa])(;B[bb])(;B[cc])
     */
    this.processGameTree = parent => {
      const gameTree: GameNode[] = [];

      while (!this.done()) {
        const token = this.peek();
        if (token === '(') {
          this.next(); // Consume open paren
          gameTree.push(this.processGameNode(parent));
          this.next(); // Consume close paren
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

    /**
     * Processes a single game node, and then continues down the tree.
     *
     * Example: ;B[aa]
     */
    this.processGameNode = parent => {
      const gameNode: GameNode = { parent };

      // Consume node start so we can assume later that `;` means next node
      const startOfNode = this.next();
      if (startOfNode !== ';') {
        this.throw(
          `Unexpected token "${startOfNode}". Expected start of node.`
        );
      }

      while (this.assertNotDone()) {
        const token = this.peek();

        if (token === ';') {
          gameNode.children = [this.processGameNode(gameNode)];
          return gameNode;
        } else if (token === ')') {
          return gameNode;
        } else if (token === '(') {
          gameNode.children = this.processGameTree(gameNode);
          return gameNode;
        } else {
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

    /**
     * Processes the name of the property.
     *
     * Example: B[aa]
     * In this example 'B' is the name of the property.
     */
    this.processPropertyName = () => {
      // Every property must have a value, so we can terminate the loop with the start of a value '['
      let propertyName = '';
      while (this.peek() !== '[' && this.assertNotDone()) {
        propertyName += this.next();
      }
      return propertyName;
    };

    /**
     * Processes the value of a property.
     *
     * Example: B[aa]
     * The value is everything between the square brackets '[aa]'
     */
    this.processPropertyValue = () => {
      // Consume opening '[' character
      this.next();

      // next and peek should not ignore whitespace while processing a value
      let propertyValue = '';
      while (this.peek(false) !== ']' && this.assertNotDone(false)) {
        let nextChar = this.next(false);

        // Check for characters escaped with '\'
        if (nextChar === '\\') {
          nextChar = this.next(false);

          // If the escape character is followed by a newline, we ignore the newline
          const charCode = nextChar.charCodeAt(0);
          const lookAheadCharCode = this.peek(false).charCodeAt(0);
          const LF_CODE = 10;
          const CR_CODE = 13;
          if (
            (charCode === LF_CODE && lookAheadCharCode === CR_CODE) ||
            (charCode === CR_CODE && lookAheadCharCode === LF_CODE)
          ) {
            // Combining a CR and an LF counts as one newline so we need to consume the extra
            this.next();
            continue;
          }
          if (charCode === LF_CODE || charCode === CR_CODE) {
            continue;
          }
        }

        propertyValue += nextChar;
      }

      // Consume close ']' character
      this.next();

      return propertyValue;
    };
  }
}

// Primary export
const parseSgf = (sgfString: string): GameNode[] =>
  new SgfParser(sgfString.trim()).parse();

export default parseSgf;
