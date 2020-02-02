import parseSgf from './parseSgf';
import normalizeGameTree from './normalizeGameTree';
import createSgfFromGameTree from './createSgfFromGameTree';

const test1 = `
(
  ;GM[1]FF[4]
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
  ;GM[1]FF[4]
  ;B[aa]
  ;W[ab]
  ;B[aa]C[Hey man, how's it going?
I didn't see you at the thing yesterday.]
  ;W[ab]C[I know, I was having trouble with these escape characters \\[\\]]
)`.trim();

describe('createSgfFromGameTre', () => {
  it('should reproduce sgf with variations', () => {
    const tree = normalizeGameTree(parseSgf(test1)[0]);
    expect(createSgfFromGameTree(tree)).toEqual(test1);
  });

  it('should reproduce sgf with comment shenanigans', () => {
    const tree = normalizeGameTree(parseSgf(test2)[0]);
    expect(createSgfFromGameTree(tree)).toEqual(test2);
  });
});
