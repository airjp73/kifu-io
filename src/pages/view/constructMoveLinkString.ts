import { GameTree } from 'goban/parseSgf/normalizeGameTree';
import GameTreeTraverser from 'goban/util/GameTreeTraverser';

function constructMoveLinkString(gameTree: GameTree, node: string): string {
  let targetNode = new GameTreeTraverser(gameTree).get(node);
  let currentNode = targetNode;
  const moves: string[] = [];

  while (currentNode) {
    const parent = currentNode.parent;
    const childIndex = parent?.children?.findIndex(
      child => child.id === currentNode.id
    );

    if (childIndex === -1) {
      throw new Error('Unable to determine variation of child node');
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

  return moves.join(',');
}

export default constructMoveLinkString;
