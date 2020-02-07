import React from 'react';
import { Share2 } from 'react-feather';
import SpeedDialOption from 'components/SpeedDialOption';
import { useGoGameContext } from 'goban/GoGameContext';
import { GameTree, GameTreeNode } from 'goban/parseSgf/normalizeGameTree';

type MoveLinkButtonProps = Omit<
  React.ComponentProps<typeof SpeedDialOption>,
  'label' | 'onClick'
>;

// TODO: Move this to some common place
interface TraversableGameTreeNode
  extends Omit<GameTreeNode, 'parent' | 'children'> {
  parent?: TraversableGameTreeNode;
  children?: TraversableGameTreeNode[];
}

// TODO: Move this to some common place
class TreeTraverser {
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
}

const MoveLinkButton: React.FC<MoveLinkButtonProps> = props => {
  const { gameState, gameTree } = useGoGameContext();

  // TODO: test this
  const copyMoveLink = () => {
    let targetNode = new TreeTraverser(gameTree).get(gameState.node);
    let currentNode = targetNode;
    const moves: string[] = [];

    while (currentNode) {
      const parent = currentNode.parent;
      const childIndex = parent?.children?.findIndex(
        child => child.id === currentNode.id
      );

      if (childIndex === -1) {
        console.error('Unable to determine variation of child node');
        return;
      }

      if (childIndex !== 0) {
        // If the move number is undefined, that's probably the first move
        const branchIndex = childIndex ?? 0;
        const moveNumber = targetNode.moveNumber ?? 0;
        const str =
          branchIndex === 0 ? `${moveNumber}` : `${branchIndex}:${moveNumber}`;
        moves.unshift(str);
        targetNode = parent;
      }

      currentNode = parent;
    }

    console.log(moves.join(','));
  };

  return (
    <SpeedDialOption label="Share move" onClick={copyMoveLink} {...props}>
      <Share2 />
    </SpeedDialOption>
  );
};

export default MoveLinkButton;
