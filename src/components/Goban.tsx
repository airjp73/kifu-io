import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import styled from 'styled-components';
import { useGoGameContext } from 'contexts/GoGameContext';
import { panelBackground } from 'style';

export type Point = 'b' | 'w' | null;

const Board = styled.canvas`
  background-color: ${panelBackground};
  width: 100%;
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

class GobanCanvas {

  size: [number, number];
  canvas: HTMLCanvasElement;

  private unit: number;
  private stoneRadius: number;

  private blackStone: HTMLCanvasElement;
  private whiteStone: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientWidth;

    this.init();
    this.drawBoard();
  }

  init = () => {
    this.size = [19, 19];
    this.unit = this.canvas.width / 20; // 19 points + edges
    this.stoneRadius = (this.unit - 2) / 2;

    // Create re-usable stones
    // TODO: Break out this logic into a function if adding any more stone sprites
    this.blackStone = document.createElement('canvas');
    this.blackStone.width = this.stoneRadius * 2;
    this.blackStone.height = this.stoneRadius * 2;
    const blackCtx = this.blackStone.getContext('2d');
    blackCtx.fillStyle = '#000000';
    blackCtx.beginPath();
    blackCtx.moveTo(this.stoneRadius, 0);
    blackCtx.arc(this.stoneRadius, this.stoneRadius, this.stoneRadius, 0, Math.PI * 2);
    blackCtx.fill();

    this.whiteStone = document.createElement('canvas');
    this.whiteStone.width = this.stoneRadius * 2;
    this.whiteStone.height = this.stoneRadius * 2;
    const whiteCtx = this.whiteStone.getContext('2d');
    whiteCtx.fillStyle = '#ffffff';
    whiteCtx.beginPath();
    whiteCtx.moveTo(this.stoneRadius, 0);
    whiteCtx.arc(this.stoneRadius, this.stoneRadius, this.stoneRadius, 0, Math.PI * 2);
    whiteCtx.fill();
  }

  drawStone = (x: number, y: number, color: Point) => {
    const ctx = this.canvas.getContext('2d');
    const xCoord = this.getCoord(x) - this.unit / 2 + 1;
    const yCoord = this.getCoord(y) - this.unit / 2 + 1;
    const stone = color === 'b' ? this.blackStone : this.whiteStone;
    ctx.drawImage(stone, xCoord, yCoord);
  };

  public drawBoard = () => {
    const ctx = this.canvas.getContext('2d');

    // Background color
    ctx.fillStyle = '#DDAE68';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const start = this.getCoord(0);
    const xEnd = this.getCoord(this.size[0] - 1);
    const yEnd = this.getCoord(this.size[1] - 1);

    ctx.beginPath();

    // Vertical lines
    for (let x = 0; x < this.size[0]; ++x) {
      const xCoord = this.getCoord(x);
      ctx.moveTo(xCoord, start);
      ctx.lineTo(xCoord, yEnd);
    }

    // Horizontal lines
    for (let y = 0; y < this.size[0]; ++y) {
      const yCoord = this.getCoord(y);
      ctx.moveTo(start, yCoord);
      ctx.lineTo(xEnd, yCoord);
    }

    // Draw
    ctx.stroke()
    ctx.closePath();
  }

  getCoord = (coord: number) => (coord * this.unit) + this.unit;

}

const Goban = () => {
  const { gameState } = useGoGameContext();
  const { boardState } = gameState;
  const boardRef: React.Ref<HTMLCanvasElement> = useRef(null);
  const goban: React.MutableRefObject<GobanCanvas> = useRef(null);

  const stoneRadius = 10;
  const pointWidth = 25;

  const drawBoard = () => {
    // getContext function not present on unsupported browsers
    const canvas = boardRef.current;
    if (!canvas.getContext) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  useEffect(() => {
    goban.current = new GobanCanvas(boardRef.current);

    goban.current.drawStone(4, 4, 'b');
    goban.current.drawStone(5, 4, 'w');
  }, []);

  // useEffect(() => {
  //   window.addEventListener('resize', drawBoard);
  //   return () => window.removeEventListener('resize', drawBoard);
  // }, []);

  return <Board ref={boardRef}>Go board not supported on your browser</Board>;
};

export default Goban;
