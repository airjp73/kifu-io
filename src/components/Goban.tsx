import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useGoGameContext } from 'contexts/GoGameContext';
import {
  createBlackStone,
  createWhiteStone,
  calculateStonePadding,
} from 'canvas/createStoneSprite';

export type StoneColor = 'b' | 'w';
type StarPoints = [number, number][];

const starPoints9: StarPoints = [[2, 2], [6, 2], [2, 6], [6, 6], [4, 4]];
const starPoints13: StarPoints = [[3, 3], [9, 3], [3, 9], [9, 9], [6, 6]];
const starPoints19: StarPoints = [
  [3, 3],
  [9, 3],
  [15, 3],
  [3, 9],
  [9, 9],
  [15, 9],
  [3, 15],
  [9, 15],
  [15, 15],
];

class GobanCanvas {
  private size: [number, number];

  private boardLayer: HTMLCanvasElement;
  private stoneLayer: HTMLCanvasElement;

  private unit: number;
  private stoneRadius: number;
  private blackStone: HTMLCanvasElement;
  private whiteStone: HTMLCanvasElement;

  public constructor(
    boardLayer: HTMLCanvasElement,
    stoneLayer: HTMLCanvasElement,
    boardSize: [number, number]
  ) {
    this.boardLayer = boardLayer;
    this.stoneLayer = stoneLayer;
    this.size = boardSize;
    boardLayer.getContext('2d').imageSmoothingEnabled = false;
    stoneLayer.getContext('2d').imageSmoothingEnabled = false;
    this.init();
  }

  public setSize = (boardSize: [number, number]) => {
    if (boardSize[0] !== this.size[0] || boardSize[1] !== this.size[1]) {
      this.size = boardSize;
      this.init();
    }
  };

  public init = () => {
    this.calculateDimensions();
    this.initSprites();
    this.drawBoard();
  };

  private calculateDimensions = () => {
    const pixelRatio = window.devicePixelRatio || 1;
    const canvasRect = this.boardLayer.getBoundingClientRect();

    const width =
      Math.round(canvasRect.right * pixelRatio) -
      Math.round(canvasRect.left * pixelRatio);
    this.unit = width / (this.size[0] + 1);
    this.stoneRadius = (this.unit - 2) / 2;
    const height = this.unit * (this.size[1] + 1);

    this.boardLayer.width = width;
    this.stoneLayer.width = width;
    this.boardLayer.height = height;
    this.stoneLayer.height = height;
  };

  private initSprites = () => {
    this.blackStone = createBlackStone(this.stoneRadius);
    this.whiteStone = createWhiteStone(this.stoneRadius);
  };

  public drawStone = (x: number, y: number, color: StoneColor) => {
    const stone = color === 'b' ? this.blackStone : this.whiteStone;

    // We want the center of the sprite on the point, so subtract the radius and sprite padding
    const ctx = this.stoneLayer.getContext('2d');
    const stonePadding = calculateStonePadding(this.stoneRadius);
    const xCoord = this.getCoord(x) - this.stoneRadius - stonePadding;
    const yCoord = this.getCoord(y) - this.stoneRadius - stonePadding;
    ctx.drawImage(stone, xCoord, yCoord);
  };

  public drawTriangle = (x: number, y: number, color: string) => {
    const triangleRadius = this.stoneRadius - this.stoneRadius / 6;
    const xCoord = this.getCoord(x);
    const yCoord = this.getCoord(y);
    const angle1 = Math.PI * 1.5;
    const angle2 = (2 * Math.PI) / 3 - 0.5 * Math.PI;
    const angle3 = (4 * Math.PI) / 3 - 0.5 * Math.PI;
    const point1 = [
      xCoord + triangleRadius * Math.cos(angle1),
      yCoord + triangleRadius * Math.sin(angle1),
    ];
    const point2 = [
      xCoord + triangleRadius * Math.cos(angle2),
      yCoord + triangleRadius * Math.sin(angle2),
    ];
    const point3 = [
      xCoord + triangleRadius * Math.cos(angle3),
      yCoord + triangleRadius * Math.sin(angle3),
    ];

    const ctx = this.stoneLayer.getContext('2d');
    ctx.strokeStyle = color;
    ctx.lineWidth = this.unit / 18;
    ctx.beginPath();
    ctx.moveTo(point1[0], point1[1]);
    ctx.lineTo(point2[0], point2[1]);
    ctx.lineTo(point3[0], point3[1]);
    ctx.lineTo(point1[0], point1[1]);
    ctx.closePath();
    ctx.stroke();
  };

  public drawSquare = (x: number, y: number, color: string) => {
    const squareWidth = this.stoneRadius * 1.25;
    const xCoord = this.getCoord(x);
    const yCoord = this.getCoord(y);

    const ctx = this.stoneLayer.getContext('2d');
    ctx.strokeStyle = color;
    ctx.lineWidth = this.unit / 18;

    ctx.beginPath();
    ctx.moveTo(xCoord - squareWidth / 2, yCoord - squareWidth / 2);
    ctx.lineTo(xCoord + squareWidth / 2, yCoord - squareWidth / 2);
    ctx.lineTo(xCoord + squareWidth / 2, yCoord + squareWidth / 2);
    ctx.lineTo(xCoord - squareWidth / 2, yCoord + squareWidth / 2);
    ctx.lineTo(xCoord - squareWidth / 2, yCoord - squareWidth / 2);
    ctx.closePath();
    ctx.stroke();
  };

  public drawCircle = (x: number, y: number, color: string) => {
    const circleRadius = this.stoneRadius * 0.55;
    const xCoord = this.getCoord(x);
    const yCoord = this.getCoord(y);

    const ctx = this.stoneLayer.getContext('2d');
    ctx.strokeStyle = color;
    ctx.lineWidth = this.unit / 18;

    ctx.beginPath();
    ctx.moveTo(xCoord + circleRadius, yCoord);
    ctx.arc(xCoord, yCoord, circleRadius, 0, Math.PI * 2);
    ctx.stroke();
  };

  public drawLine = (x1: number, y1: number, x2: number, y2: number) => {
    const x1Coord = this.getCoord(x1);
    const y1Coord = this.getCoord(y1);
    const x2Coord = this.getCoord(x2);
    const y2Coord = this.getCoord(y2);

    const ctx = this.stoneLayer.getContext('2d');
    ctx.strokeStyle = '#000'; // Maybe try other colors?
    ctx.lineWidth = this.unit / 10;

    ctx.beginPath();
    ctx.moveTo(x1Coord, y1Coord);
    ctx.lineTo(x2Coord, y2Coord);
    ctx.stroke();
  };

  public drawLabel = (x: number, y: number, label: string, color: string) => {
    const ctx = this.stoneLayer.getContext('2d');
    ctx.font = `${this.unit * 0.8}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color;
    ctx.fillText(label, this.getCoord(x), this.getCoord(y) + 0.7);
  };

  public resetBoard = () => {
    const ctx = this.stoneLayer.getContext('2d');
    ctx.clearRect(0, 0, this.stoneLayer.width, this.stoneLayer.height);
  };

  public drawBoard = () => {
    const ctx = this.boardLayer.getContext('2d');

    // Background color
    ctx.fillStyle = '#DDAE68';
    ctx.fillRect(0, 0, this.boardLayer.width, this.boardLayer.height);

    const start = this.getCoord(0);
    const xEnd = this.getCoord(this.size[0] - 1);
    const yEnd = this.getCoord(this.size[1] - 1);

    ctx.beginPath();
    ctx.lineWidth = this.unit / 30;
    ctx.strokeStyle = '#000';

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

    // Draw lines
    ctx.stroke();
    ctx.closePath();

    // Star points
    const starPointRadius = this.stoneRadius / 4;
    ctx.fillStyle = '#000';
    ctx.beginPath();

    let starPoints: StarPoints;
    if (this.size[0] !== this.size[1]) starPoints = [];
    else if (this.size[0] === 19) starPoints = starPoints19;
    else if (this.size[0] === 13) starPoints = starPoints13;
    else if (this.size[0] === 9) starPoints = starPoints9;
    else starPoints = [];

    starPoints.forEach(([x, y]) => {
      const xCoord = this.getCoord(x);
      const yCoord = this.getCoord(y);
      ctx.moveTo(xCoord - starPointRadius, yCoord - starPointRadius);
      ctx.arc(xCoord, yCoord, starPointRadius, 0, Math.PI * 2);
    });

    ctx.closePath();
    ctx.fill();

    // Coordinates
    ctx.font = `bold ${this.unit * 0.4}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const A = 'A'.charCodeAt(0);
    const I = 'I'.charCodeAt(0);
    const Z = 'Z'.charCodeAt(0);
    for (let x = 0; x < this.size[0]; ++x) {
      // The spec technically allows boards up to 52x52
      // Other sgf views don't seem to support this at all
      // so just appending a number like A1, A2 seems good enough
      let charCode = A + x;
      let number = 0;
      if (charCode >= I) charCode++;
      while (charCode > Z) {
        charCode -= Z - A + 1;
        ++number;
        if (charCode >= I) charCode++;
      }
      const coordString =
        number > 0
          ? String.fromCharCode(charCode) + (number + 1).toString()
          : String.fromCharCode(charCode);
      ctx.fillText(coordString, this.getCoord(x), this.getCoord(-0.5));
      ctx.fillText(
        coordString,
        this.getCoord(x),
        this.getCoord(this.size[1] - 0.5)
      );
    }

    for (let y = 0; y < this.size[1]; ++y) {
      const coordString = (this.size[1] - y).toString();
      ctx.fillText(coordString, this.getCoord(-0.5), this.getCoord(y));
      ctx.fillText(
        coordString,
        this.getCoord(this.size[0] - 0.5),
        this.getCoord(y)
      );
    }
  };

  private getCoord = (coord: number) => coord * this.unit + this.unit;
}

// Container with 1:1 aspect ratio
const BoardContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
`;

const Board = styled.canvas`
  position: absolute;
  width: 100%;
  top: 0;
`;

const Goban = () => {
  const { gameState } = useGoGameContext();
  const { boardState, properties, node } = gameState;
  const stoneLayerRef = useRef(null);
  const boardLayerRef = useRef(null);
  const goban: React.MutableRefObject<GobanCanvas> = useRef(null);

  const drawBoardState = () => {
    const boardSize = properties.boardSize || [19, 19];
    if (goban.current) goban.current.setSize(boardSize);
    else
      goban.current = new GobanCanvas(
        boardLayerRef.current,
        stoneLayerRef.current,
        boardSize
      );

    goban.current.setSize(properties.boardSize || [19, 19]);
    goban.current.resetBoard();

    const pointToXY = (point: string): [number, number] => {
      const A = 'a'.charCodeAt(0);
      const x = point.charCodeAt(0) - A;
      const y = point.charCodeAt(1) - A;
      return [x, y];
    };

    const getMarkupColor = (point: string) =>
      boardState[point] === 'b' ? '#fff' : '#000';

    Object.entries(boardState).forEach(([point, color]) => {
      const [x, y] = pointToXY(point);
      goban.current.drawStone(x, y, color);
    });

    const currentMove =
      node.properties && (node.properties.B || node.properties.W);
    if (currentMove) {
      const point = currentMove && currentMove[0];
      const coord = pointToXY(point);
      goban.current.drawCircle(
        coord[0],
        coord[1],
        boardState[point] === 'b' ? '#fff' : '#000'
      );
    }

    gameState.moveState.triangles.forEach(point => {
      const coord = pointToXY(point);
      const color = getMarkupColor(point);
      goban.current.drawTriangle(coord[0], coord[1], color);
    });

    gameState.moveState.squares.forEach(point => {
      const coord = pointToXY(point);
      const color = getMarkupColor(point);
      goban.current.drawSquare(coord[0], coord[1], color);
    });

    gameState.moveState.circles.forEach(point => {
      const coord = pointToXY(point);
      const color = getMarkupColor(point);
      goban.current.drawCircle(coord[0], coord[1], color);
    });

    gameState.moveState.lines.forEach(line => {
      const coord1 = pointToXY(line[0]);
      const coord2 = pointToXY(line[1]);
      goban.current.drawLine(coord1[0], coord1[1], coord2[0], coord2[1]);
    });

    gameState.moveState.xMarks.forEach(point => {
      const coord = pointToXY(point);
      const color = getMarkupColor(point);
      goban.current.drawLabel(coord[0], coord[1], 'X', color);
    });

    gameState.moveState.labels.forEach(label => {
      const coord = pointToXY(label.point);
      const color = getMarkupColor(label.point);
      goban.current.drawLabel(coord[0], coord[1], label.label, color);
    });
  };

  useEffect(() => drawBoardState(), [boardState, properties.boardSize]);

  const handleResize = () => {
    goban.current.init();
    drawBoardState();
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  return (
    <BoardContainer>
      <Board ref={boardLayerRef} />
      <Board ref={stoneLayerRef} />
    </BoardContainer>
  );
};

export default Goban;
