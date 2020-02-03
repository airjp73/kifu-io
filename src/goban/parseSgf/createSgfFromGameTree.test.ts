import parseSgf from './parseSgf';
import normalizeGameTree from './normalizeGameTree';
import createSgfFromGameTree, { APP_STRING } from './createSgfFromGameTree';

const test1 = `
(
  ;GM[1]FF[4]AP[${APP_STRING}]
  ;B[aa]
  ;W[ab]
  (
    ;B[ac]
    ;W[ad]
  )
  (
    ;B[ba]
    ;W[bb]
    (
      ;B[bc]
    )
    (
      ;B[ca]
    )
  )
)`.trim();

const test2 = `
(
  ;GM[1]FF[4]AP[${APP_STRING}]
  ;B[aa]
  ;W[ab]
  ;B[aa]C[Hey man, how's it going?
I didn't see you at the thing yesterday.]
  ;W[ab]C[I know, I was having trouble with these escape characters \\[\\]]
)`.trim();

const test3 = test2.replace(APP_STRING, 'Cgoban:3');

describe('createSgfFromGameTre', () => {
  it('should reproduce sgf with variations', () => {
    const tree = normalizeGameTree(parseSgf(test1)[0]);
    expect(createSgfFromGameTree(tree)).toEqual(test1);
  });

  it('should reproduce sgf with comment shenanigans', () => {
    const tree = normalizeGameTree(parseSgf(test2)[0]);
    expect(createSgfFromGameTree(tree)).toEqual(test2);
  });

  it('should set the correct app version', () => {
    const tree = normalizeGameTree(parseSgf(test3)[0]);
    expect(createSgfFromGameTree(tree)).toEqual(test2);
  });
});
