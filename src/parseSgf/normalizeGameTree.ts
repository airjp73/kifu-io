import { GameNode, NodeProperties } from './parseSgf';

interface GameTreeNode {
  id: string;
  parent?: string;
  children?: string[];
  properties?: NodeProperties;
}

interface GameTree {
  generateId: () => string;
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
  normalizeNode(root);

  return gameTree;
};

export default normalizeGameTree;
