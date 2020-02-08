import { GameTreeNode, GameTree } from 'goban/parseSgf/normalizeGameTree';

export interface TraversableGameTreeNode
  extends Omit<GameTreeNode, 'parent' | 'children'> {
  parent?: TraversableGameTreeNode;
  children?: TraversableGameTreeNode[];
}

class GameTreeTraverser {
  tree: GameTree;

  constructor(tree: GameTree) {
    this.tree = tree;
  }

  get(id: string): TraversableGameTreeNode | undefined {
    const node = this.tree.nodes[id];
    if (!node) return;

    const traverser = this;
    return {
      ...node,
      get parent() {
        return traverser.get(node.parent);
      },
      get children() {
        return node.children?.map(child => traverser.get(child));
      },
    };
  }

  root(): TraversableGameTreeNode | undefined {
    return this.get(this.tree.rootNode);
  }
}

export default GameTreeTraverser;
