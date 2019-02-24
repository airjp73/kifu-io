import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import styled from 'styled-components';

const Board = styled.div`
  background-color: brown;
  padding: 1rem;
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

const Space = styled.div`
  background-color: tan;
`;

interface PieceProps {
  type: 'b' | 'w';
}
const Piece = styled.div`
  background-color: ${(props: PieceProps) => props.type === 'b' ? 'black' : 'white'};
  border-radius: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
  width: 100%;
`;

type Point = 'b' | 'w' | null;
const Goban = () => {
  // Temporary state
  // keying an object by point my be a good approach
  const gameState: { [key: string]: Point } = {
    dd: 'b',
    qq: 'w',
  };
  const [height, boardRef] = useBoardHeight();

  const a = 'a'.charCodeAt(0);
  const spaces: Array<Point> = [];
  for (let y = 0; y < 19; ++y) {
    for (let x = 0; x < 19; ++x) {
      const yChar = String.fromCharCode(y + a);
      const xChar = String.fromCharCode(x + a);
      const stateKey = `${yChar}${xChar}`;
      spaces.push(gameState[stateKey]);
    }
  }
  return (
    <Board ref={boardRef} style={{ height }}>
      {spaces.map(space => (
        <Space>
          {space && <Piece type={space} />}
        </Space>
      ))}
    </Board>
  );
};

export default Goban;
