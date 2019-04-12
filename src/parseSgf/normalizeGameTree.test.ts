import each from 'jest-each';
import parseSgf from './parseSgf';
import normalizeGameTree from './normalizeGameTree';
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
          properties: { B: ['bb'] },
          children: [
            {
              properties: { W: ['aa'] },
            },
          ],
        },
      ],
    };
    const expected = {
      nodes: {
        '0': {
          properties: { GM: ['1'] },
          children: ['1', '5'],
        },
        '1': {
          properties: { B: ['aa'] },
          children: ['2'],
        },
        '2': {
          properties: { W: ['bb'] },
          children: ['3', '4'],
        },
        '3': {
          properties: { B: ['cc'] },
        },
        '4': {
          properties: { B: ['dd'] },
        },
        '5': {
          properties: { B: ['bb'] },
          children: ['6'],
        },
        '6': {
          properties: { W: ['aa'] },
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
