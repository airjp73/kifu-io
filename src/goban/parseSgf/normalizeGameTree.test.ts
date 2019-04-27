import each from 'jest-each';
import parseSgf from './parseSgf';
import normalizeGameTree, { GameTree } from './normalizeGameTree';
import snapshots from './snapshots';

describe('normalizeGameTree', () => {
  test('should normalize parsed sgf tree', () => {
    // The result of 'Some Variation' in the parseSgf test
    const tree = {
      properties: { GM: ['1'] },
      children: [
        {
          properties: { B: ['aa'] },
          children: [
            {
              properties: { W: ['bb'] },
              children: [
                {
                  properties: { B: ['cc'] },
                },
                {
                  properties: { B: ['dd'] },
                },
              ],
            },
          ],
        },
        {
          properties: { AB: ['ff'] },
          children: [
            {
              properties: { B: ['bb'] },
              children: [
                {
                  properties: { W: ['aa'] },
                },
              ],
            },
          ],
        },
      ],
    };
    const expected: Partial<GameTree> = {
      rootNode: '0',
      nodes: {
        '0': {
          id: '0',
          properties: { GM: ['1'] },
          children: ['1', '5'],
          moveNumber: null,
        },
        '1': {
          id: '1',
          parent: '0',
          properties: { B: ['aa'] },
          children: ['2'],
          moveNumber: 1,
        },
        '2': {
          id: '2',
          parent: '1',
          properties: { W: ['bb'] },
          children: ['3', '4'],
          moveNumber: 2,
        },
        '3': {
          id: '3',
          parent: '2',
          properties: { B: ['cc'] },
          moveNumber: 3,
        },
        '4': {
          id: '4',
          parent: '2',
          properties: { B: ['dd'] },
          moveNumber: 3,
        },
        '5': {
          id: '5',
          parent: '0',
          properties: { AB: ['ff'] },
          children: ['6'],
          // skip move number because no move
        },
        '6': {
          id: '6',
          parent: '5',
          properties: { B: ['bb'] },
          children: ['7'],
          moveNumber: 1,
        },
        '7': {
          id: '7',
          parent: '6',
          properties: { W: ['aa'] },
          moveNumber: 2,
        },
      },
    };
    expect(normalizeGameTree(tree)).toMatchObject(expected);
  });

  each(
    snapshots.map((snapshot, index) => [`Snopshot ${index + 1}`, snapshot])
  ).describe('Real game snapshots', (description, snapshotSgf) => {
    test(description, () => {
      expect(normalizeGameTree(parseSgf(snapshotSgf)[0])).toMatchSnapshot();
    });
  });
});
