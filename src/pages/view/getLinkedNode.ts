import { GameTree } from 'goban/parseSgf/normalizeGameTree';
import GameTreeTraverser from 'goban/util/GameTreeTraverser';

function getLinkedNode(
  gameTree: GameTree,
  nodeLink: string
): string | undefined {
  const rootNode = new GameTreeTraverser(gameTree).root();

  return nodeLink
    .split(',')
    .map(ins => ins.split(':'))
    .map(ins => ins.map(val => parseInt(val)))
    .map(ins => (ins.length === 1 ? [0, ins[0]] : ins))
    .reduce((node, [branch, moveNumber]) => {
      let currentNode = node?.children?.[branch];
      while (currentNode && currentNode.moveNumber < moveNumber)
        currentNode = currentNode.children?.[0];
      return currentNode;
    }, rootNode)?.id;
}

export default getLinkedNode;
