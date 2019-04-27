import { GameNode, NodeProperties } from './parseSgf';

export interface GameTreeNode {
  id: string;
  parent?: string;
  children?: string[];
  properties?: NodeProperties;
  moveNumber?: number;
}

export interface GameTree {
  generateId: () => string;
  rootNode: string;
  nodes: {
    [key: string]: GameTreeNode;
  };
}

let id = 0;
const generateId = () => {
  return `${id++}`;
};

const normalizeGameTree = (root: GameNode): GameTree => {
  const gameTree: GameTree = {
    generateId,
    rootNode: '',
    nodes: {},
  };

  const normalizeNode = (
    node: GameNode,
    parent?: string,
    currentMoveNumber: number = 1
  ): string => {
    const id = gameTree.generateId();
    const hasMoveNumber =
      node.properties && (node.properties.B || node.properties.W);
    const normalizedNode: GameTreeNode = {
      id,
      parent,
      children:
        node.children &&
        node.children.map(child =>
          normalizeNode(
            child,
            id,
            hasMoveNumber ? currentMoveNumber + 1 : currentMoveNumber
          )
        ),
      properties: node.properties,
      moveNumber: hasMoveNumber ? currentMoveNumber : null,
    };
    gameTree.nodes[id] = normalizedNode;
    return id;
  };
  gameTree.rootNode = normalizeNode(root);

  return gameTree;
};

export default normalizeGameTree;
