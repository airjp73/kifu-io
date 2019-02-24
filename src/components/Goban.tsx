import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import styled from 'styled-components';

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
  ${(props: SpaceProps) => !props.invisible ? 'background-color: tan;' : 'blackground-color: blue;'};
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

type Point = 'b' | 'w' | null;
interface Space {
  point: Point;
  hidden: boolean;
}
const Goban = () => {
  // Temporary state
  // keying an object by point my be a good approach
  const gameState: { [key: string]: Point } = {
    dd: 'b',
    pp: 'w',
  };
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
    <Board ref={boardRef} style={{ height }}>
      {spaces.map(space => (
        <Space invisible={space.hidden}>
          {space.point && <Piece type={space.point} />}
        </Space>
      ))}
    </Board>
  );
};

export default Goban;
