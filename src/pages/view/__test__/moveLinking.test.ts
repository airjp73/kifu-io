import constructMoveLinkString from '../constructMoveLinkString';
import normalizeGameTree, { GameTree } from 'goban/parseSgf/normalizeGameTree';
import parseSgf from 'goban/parseSgf/parseSgf';
import getLinkedNode from '../getLinkedNode';

describe('constructMoveLinkString', () => {
  // Using a fake ID property to help choose a node
  const moveId = 'target';
  const cases: [string, string, string][] = [
    [
      'single-branch trees',
      '(;GM[1];B[aa];W[ab];B[ac];W[ad];B[ae]ID[target])',
      '5',
    ],
    [
      'main branch on a multi-branch tree',
      '(;GM[1];B[aa];W[ab](;B[ac];W[ad];B[ae]ID[target])(;B[ba];W[bb];B[bc]))',
      '5',
    ],
    [
      'secondary branch',
      '(;GM[1];B[aa];W[ab](;B[ac];W[ad];B[ae])(;B[ba];W[bb];B[bc]ID[target]))',
      '2,1:5',
    ],
    [
      'nested branches',
      '(;GM[1];B[aa];W[ab](;B[ac];W[ad];B[ae])(;B[ba];W[bb];B[bc](;W[bd])(;W[ca]ID[target])))',
      '2,1:5,1:6',
    ],
    [
      'nested choosing the main branch the second time',
      '(;GM[1];B[aa];W[ab](;B[ac];W[ad];B[ae])(;B[ba];W[bb];B[bc](;W[bd]ID[target])(;W[ca])))',
      '2,1:6',
    ],
    [
      'branches on the first move',
      '(;GM[1](;B[aa])(;B[ba];W[bb]ID[target]))',
      '1:2',
    ],
  ];

  it.each(cases)(
    'should create a move string for %s',
    (description, sgf, expected) => {
      const tree: GameTree = normalizeGameTree(parseSgf(sgf)[0]);

      const nodeId = Object.values(tree.nodes).find(
        node => node.properties?.ID?.[0] === moveId
      )?.id;
      expect(nodeId).not.toBeNull();

      const result = constructMoveLinkString(tree, nodeId);
      expect(result).toEqual(expected);
    }
  );

  it.each(cases)(
    'should navigate to the correct move for %s',
    (description, sgf, nodeLink) => {
      const tree: GameTree = normalizeGameTree(parseSgf(sgf)[0]);

      const expectedNodeId = Object.values(tree.nodes).find(
        node => node.properties?.ID?.[0] === moveId
      )?.id;
      expect(expectedNodeId).not.toBeNull();

      const result = getLinkedNode(tree, nodeLink);
      expect(result).toEqual(expectedNodeId);
    }
  );
});
