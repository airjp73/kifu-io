import React, { useState, useRef, useLayoutEffect, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import parseSgf from 'parseSgf';

export type Point = 'b' | 'w' | null;

const sgf = `
(;GM[1]FF[4]CA[UTF-8]AP[CGoban:3]ST[2]
RU[Japanese]SZ[19]KM[0.00]
PW[White]PB[Black]C[This is a test sgf file.]
;B[pd]
;W[dp]
;B[pp]
;W[dd]C[The purpose of this file is to see check my sgf parser]
;B[ed]
;W[ee]
;B[dc]
;W[ec]
;B[cd]
;W[fd]
;B[de]
;W[df]
;B[ed]
;W[ef]
;B[dd]TR[dc][cd][dd][ed][de]
;W[ge]
;B[fc]
;W[gc]
;B[eb]
;AB[qf][qi][ql][qn]
;W[nq]
;B[np])
`;

const Board = styled.div`
  background-color: brown;
  display: grid;
  grid-template-columns: repeat(19, 1fr);
  grid-template-rows: repeat(19, 1fr);
  grid-gap: 1px;
`;

type UseBoardHeight = () => [number, React.MutableRefObject<HTMLDivElement>];
const useBoardHeight: UseBoardHeight = () => {
  const [height, setHeight] = useState(0);
  const boardRef = useRef<HTMLDivElement>(null);
  const setSize = () => setHeight(boardRef.current.offsetWidth);
  useLayoutEffect(setSize, []);
  useEffect(() => {
    window.addEventListener('resize', setSize);
    return () => window.removeEventListener('resize', setSize);
  });

  return [height, boardRef];
};

interface SpaceProps {
  invisible: boolean;
}
const Space = styled.div`
  ${(props: SpaceProps) =>
    !props.invisible ? 'background-color: tan;' : 'blackground-color: blue;'};
  transform: translate(50%, 50%);
`;

interface PieceProps {
  type: 'b' | 'w';
}
const Piece = styled.div`
  background-color: ${(props: PieceProps) =>
    props.type === 'b' ? 'black' : 'white'};
  border-radius: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
  width: 100%;
`;

class ErrorBoundary extends React.Component {
  componentDidCatch(error: any) {
    console.log(error);
  }

  render() {
    return this.props.children;
  }
}

interface Space {
  point: Point;
  hidden: boolean;
}
const Goban = () => {
  // Temporary state
  // keying an object by point my be a good approach
  const gameCollection = useMemo(() => parseSgf(sgf), [sgf]);

  // TODO: This is temporary stuff
  console.log(gameCollection);
  const gameState: { [key: string]: Point } = useMemo(() => {
    const state: { [key: string]: Point } = {};
    const gameTree = gameCollection[0];
    for (let node of gameTree) {
      const properties = node.properties;
      if (!properties) {
        break;
      }

      if (properties.B) {
        state[properties.B[0]] = 'b';
      } else if (properties.W) {
        state[properties.W[0]] = 'w';
      } else if (properties.AB) {
        properties.AB.forEach(property => {
          state[property] = 'b';
        });
      } else if (properties.AW) {
        properties.AW.forEach(property => {
          state[property] = 'w';
        });
      }
    }
    return state;
  }, [gameCollection]);
  const [height, boardRef] = useBoardHeight();

  const a = 'a'.charCodeAt(0);
  const spaces: Array<Space> = [];
  for (let y = 0; y < 19; ++y) {
    for (let x = 0; x < 19; ++x) {
      const yChar = String.fromCharCode(y + a);
      const xChar = String.fromCharCode(x + a);
      const stateKey = `${yChar}${xChar}`;
      spaces.push({ point: gameState[stateKey], hidden: x === 18 || y === 18 });
    }
  }
  return (
    <ErrorBoundary>
      <Board ref={boardRef} style={{ height }}>
        {spaces.map(space => (
          <Space invisible={space.hidden}>
            {space.point && <Piece type={space.point} />}
          </Space>
        ))}
      </Board>
    </ErrorBoundary>
  );
};

export default Goban;
