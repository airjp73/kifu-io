import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import styled from 'styled-components';
import { useGoGameContext } from 'contexts/GoGameContext';

export type Point = 'b' | 'w' | null;

class GobanCanvas {
  size: [number, number];
  canvas: HTMLCanvasElement;

  private spritePadding = 2;
  private unit: number;
  private stoneRadius: number;
  private blackStone: HTMLCanvasElement;
  private whiteStone: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    canvas.getContext('2d').imageSmoothingEnabled = false;
    this.init();
  }

  public init = () => {
    this.calculateDimensions();
    this.initSprites();
    this.drawBoard();
  };

  private calculateDimensions = () => {
    this.size = [19, 19]; // TODO: Make this dynamic
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientWidth;
    this.unit = this.canvas.width / 20; // 19 points + edges
    this.stoneRadius = (this.unit - 2) / 2;
  };

  private initSprites = () => {
    this.blackStone = this.createStoneSprite('#000');
    this.whiteStone = this.createStoneSprite('#fff');
  };

  private createStoneSprite = (color: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = this.stoneRadius * 2 + this.spritePadding + 10;
    canvas.height = this.stoneRadius * 2 + this.spritePadding + 10;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(this.stoneRadius + this.spritePadding, this.spritePadding);
    ctx.arc(
      this.stoneRadius + this.spritePadding,
      this.stoneRadius + this.spritePadding,
      this.stoneRadius,
      0,
      Math.PI * 2
    );
    ctx.fill();
    return canvas;
  };

  public drawStone = (x: number, y: number, color: Point) => {
    const ctx = this.canvas.getContext('2d');

    // We want the center of the stone sprite on the point, so subtract the radius and sprite padding
    const xCoord = this.getCoord(x) - this.stoneRadius - this.spritePadding;
    const yCoord = this.getCoord(y) - this.stoneRadius - this.spritePadding;
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
    ctx.stroke();
    ctx.closePath();
  };

  private getCoord = (coord: number) => coord * this.unit + this.unit;
}

const Board = styled.canvas`
  width: 100%;
`;

const Goban = () => {
  const { gameState } = useGoGameContext();
  const { boardState } = gameState;
  const boardRef: React.Ref<HTMLCanvasElement> = useRef(null);
  const goban: React.MutableRefObject<GobanCanvas> = useRef(null);

  const drawBoardState = () => {
    if (!goban.current) goban.current = new GobanCanvas(boardRef.current);
    else goban.current.drawBoard();

    Object.entries(boardState).forEach(([point, color]) => {
      const A = 'a'.charCodeAt(0);
      const x = point.charCodeAt(0) - A;
      const y = point.charCodeAt(1) - A;
      goban.current.drawStone(x, y, color);
    });
  };

  useEffect(() => drawBoardState(), [boardState]);

  const handleResize = () => {
    goban.current.init();
    drawBoardState();
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  return <Board ref={boardRef}>Go board not supported on your browser</Board>;
};

export default Goban;
