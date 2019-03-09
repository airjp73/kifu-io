import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import styled from 'styled-components';
import { useGoGameContext } from 'contexts/GoGameContext';
import { panelBackground } from 'style';

export type Point = 'b' | 'w' | null;

const Board = styled.canvas`
  background-color: ${panelBackground};
`;

type UseBoardWidth = () => number;
const useBoardWidth: UseBoardWidth = (boardRef: React.Ref<HTMLCanvasElement>) => {
  const [width, setWidth] = useState(0);
  const setSize = () => setWidth(boardRef.current.width);
  useLayoutEffect(setSize, []);
  useEffect(() => {
    window.addEventListener('resize', setSize);
    return () => window.removeEventListener('resize', setSize);
  });

  return [width, boardRef];
};

const Goban = () => {
  const { gameState } = useGoGameContext();
  const { boardState } = gameState;
  const boardRef: React.Ref<HTMLCanvasElement> = useRef(null);

  const stoneRadius = 10;
  const pointWidth = 25;

  const drawStone = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    const xPos = (x + 1) * pointWidth;
    const yPos = (y + 1) * pointWidth;

    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.moveTo(xPos + stoneRadius, yPos);
    ctx.arc(xPos, yPos, stoneRadius, 0, Math.PI * 2);
  };

  const drawBoard = () => {
    // getContext function not present on unsupported browsers
    const canvas = boardRef.current;
    if (!canvas.getContext) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();

    // Draw black stones
    drawStone(ctx, 0, 0);
    drawStone(ctx, 1, 1);
    ctx.fill();

    // Draw white stones
    drawStone(ctx, 1, 0);
    drawStone(ctx, 0, 1);
    ctx.stroke();
  }

  useEffect(() => {
    drawBoard();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', drawBoard);
    return () => window.removeEventListener('resize', drawBoard);
  }, []);

  return <Board ref={boardRef}>Go board not supported on your browser</Board>;
};

export default Goban;
