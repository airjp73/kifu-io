import { useMemo } from 'react';
import parseSgf from 'goban/parseSgf/parseSgf';
import normalizeGameTree, { GameTree } from 'goban/parseSgf/normalizeGameTree';

const useSgf = (sgf: string | null): [GameTree | null, Error | null] => {
  return useMemo(() => {
    if (!sgf) return [null, null];

    let gameTree: GameTree | null = null;
    let error: Error | null = null;

    try {
      gameTree = normalizeGameTree(parseSgf(sgf)[0]);
    } catch (err) {
      error = err;
    }
    return [gameTree, error];
  }, [sgf]);
};

export default useSgf;
