import { GameTree } from 'goban/parseSgf/normalizeGameTree';
import GameTreeTraverser from '../GameTreeTraverser';

describe('GameTreeTraverser', () => {
  const tree: GameTree = {
    rootNode: '1',
    nodes: {
      '1': {
        id: '1',
        children: ['2', '3'],
      },
      '2': {
        id: '2',
        children: ['4'],
        parent: '1',
      },
      '3': {
        id: '3',
        parent: '1',
      },
      '4': {
        id: '4',
        parent: '2',
      },
    },
  };

  it('should allow traversing up a game tree in a natural way', () => {
    const node = new GameTreeTraverser(tree).get('4');
    expect(node.parent.parent.id).toEqual('1');
  });

  it('should allow traversing down a game tree in a natural way', () => {
    const node = new GameTreeTraverser(tree).root();
    expect(node.children[0].children[0].id).toEqual('4');
    expect(node.children[1].id).toEqual('3');
  });
});
