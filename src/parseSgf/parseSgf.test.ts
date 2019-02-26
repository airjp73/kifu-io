import each from 'jest-each';
import parseSgf, { GameNode } from './parseSgf';
import snapshots from './snapshots';

const kgsCommentInput = `
(;W[ee]C[Koons [?\\]: but i hoped to use the thickness
AaronP [2d?\\]: hmm yeah
AaronP [2d?\\]: hard to say what's right
Koons [?\\]: i messed up the right side
Koons [?\\]: chimin will tell us :)
Koons [?\\]: thanks again
AaronP [2d?\\]: you too :)
])
`;

const kgsCommentOutput = `Koons [?]: but i hoped to use the thickness
AaronP [2d?]: hmm yeah
AaronP [2d?]: hard to say what's right
Koons [?]: i messed up the right side
Koons [?]: chimin will tell us :)
Koons [?]: thanks again
AaronP [2d?]: you too :)
`;

const LF = String.fromCharCode(10);
const CR = String.fromCharCode(13);

describe('parseSgf', () => {
  each([
    ['missing closing paren', '(;GM[1]'],
    ['missing open paren', ';GM[1])'],
    ['empty tree', '(;GM[1]()())'],
    ['extra parens', '((;GM[1]))'],
    ['no value for property', '(;GM)'],
  ]).describe('should throw an error', (description, sgf) => {
    test(description, () => {
      expect(() => parseSgf(sgf)).toThrow();
    });
  });

  each([
    [
      'Escaped characters in values',
      "(;TEST[Hi, I'm a string with some es\\]aped characters])",
      [
        {
          properties: {
            TEST: ["Hi, I'm a string with some es]aped characters"],
          },
        },
      ],
    ],
    [
      'Arrays of values',
      '(;TEST[a][b][c][d][e][f][g]TEST2[h][i][j][k];TEST3[l][m][n][o][p])',
      [
        {
          properties: {
            TEST: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
            TEST2: ['h', 'i', 'j', 'k'],
          },
          children: [
            {
              properties: { TEST3: ['l', 'm', 'n', 'o', 'p'] },
            },
          ],
        },
      ],
    ],
    [
      'Simple one-way street',
      '(;GM[1];TEST[1];TEST[2];TEST[3])',
      [
        {
          properties: { GM: ['1'] },
          children: [
            {
              properties: { TEST: ['1'] },
              children: [
                {
                  properties: {
                    TEST: ['2'],
                  },
                  children: [{ properties: { TEST: ['3'] } }],
                },
              ],
            },
          ],
        },
      ],
    ],
    [
      'Some variations',
      '(;GM[1](;B[aa];W[bb](;B[cc])(;B[dd]))(;B[bb];W[aa]))',
      [
        {
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
        },
      ],
    ],
    [
      'KGS style comments',
      kgsCommentInput,
      [
        {
          properties: {
            W: ['ee'],
            C: [kgsCommentOutput],
          },
        },
      ],
      [
        'Soft linebreaks',
        `(;C[a\\${LF}b\\${CR}c\\${LF}${CR}d\\${CR}${LF}e])`,
        [
          {
            properties: {
              C: 'abcde',
            },
          },
        ],
      ],
    ],
  ]).describe('should successfully parse sgf', (description, sgf, expected) => {
    test(description, () => {
      const actual = parseSgf(sgf);
      compareChildren(actual, expected);
    });
  });

  each(
    snapshots.map((snapshot, index) => [`Snopshot ${index + 1}`, snapshot])
  ).describe('Real game snapshots', (description, snapshotSgf) => {
    test(description, () => {
      expect(parseSgf(snapshotSgf)).toMatchSnapshot();
    });
  });
});

function compareNodes(actual: GameNode, expected: GameNode) {
  expect(actual.properties).toMatchObject(expected.properties);
  compareChildren(actual.children, expected.children);
}

function compareChildren(
  actualChildren: Array<GameNode>,
  expectedChildren: Array<GameNode>
) {
  if (!actualChildren) {
    expect(expectedChildren).toBeFalsy();
    return;
  }

  expect(actualChildren.length).toBe(expectedChildren.length);
  for (let c = 0; c < actualChildren.length; ++c) {
    compareNodes(actualChildren[c], expectedChildren[c]);
  }
}
