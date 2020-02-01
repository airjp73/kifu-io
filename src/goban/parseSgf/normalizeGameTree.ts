import { GameNode, NodeProperties } from './parseSgf';
import uuid from 'uuid/v4';

export interface GameTreeNode {
  id: string;
  parent?: string;
  children?: string[];
  properties?: NodeProperties;
  moveNumber?: number;
}

export interface GameTree {
  rootNode: string;
  nodes: {
    [key: string]: GameTreeNode;
  };
}

const normalizeGameTree = (root: GameNode): GameTree => {
  const gameTree: GameTree = {
    rootNode: '',
    nodes: {},
  };

  const normalizeNode = (
    node: GameNode,
    parent?: string,
    currentMoveNumber: number = 1
  ): string => {
    const id = uuid();
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
