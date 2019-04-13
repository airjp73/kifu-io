import { GameNode, NodeProperties } from './parseSgf';

export interface GameTreeNode {
  id: string;
  parent?: string;
  children?: string[];
  properties?: NodeProperties;
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

  const normalizeNode = (node: GameNode, parent?: string): string => {
    const id = gameTree.generateId();
    const normalizedNode: GameTreeNode = {
      id,
      parent,
      children:
        node.children && node.children.map(child => normalizeNode(child, id)),
      properties: node.properties,
    };
    gameTree.nodes[id] = normalizedNode;
    return id;
  };
  gameTree.rootNode = normalizeNode(root);

  return gameTree;
};

export default normalizeGameTree;
