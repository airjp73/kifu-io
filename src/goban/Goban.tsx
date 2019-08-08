import React, { useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useRect } from '@reach/rect';
import { useGoGameContext } from 'goban/GoGameContext';
import { setCanvasDimensionsWithCorrectScaling } from 'canvas/util';
import useWindowResizeCallback from 'hooks/useWindowResizeCallback';
import ObservedCanvasContainer from './canvas/ObservedCanvasContainer';
import WindowResizableCanvasContainer from './canvas/WindowResizableCanvasContainer';
import StoneLayer from './StoneLayer';
import BoardLayer from './BoardLayer';

interface GobanProps {
  className?: string;
  smallBoard?: boolean;
  observeRect?: boolean;
}

export type StoneColor = 'b' | 'w';

class GobanCanvas {
  private size: [number, number];

  private markupLayer: HTMLCanvasElement;
  private container: HTMLDivElement;

  private unit: number;
  private stoneRadius: number;

  public constructor(
    markupLayer: HTMLCanvasElement,
    container: HTMLDivElement,
    boardSize: [number, number]
  ) {
    this.size = boardSize;
    this.markupLayer = markupLayer;
    this.container = container;
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
  };

  private calculateDimensions = () => {
    const canvasRect = this.container.getBoundingClientRect();

    const width = Math.round(canvasRect.right) - Math.round(canvasRect.left);
    const height = Math.round(canvasRect.bottom) - Math.round(canvasRect.top);
    const length = Math.max(Math.min(width, height), 100);

    this.unit = length / (this.size[0] + 1);
    this.stoneRadius = this.unit / 2.08;

    setCanvasDimensionsWithCorrectScaling(this.markupLayer, length, length);
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

    const ctx = this.markupLayer.getContext('2d');
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

    const ctx = this.markupLayer.getContext('2d');
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

    const ctx = this.markupLayer.getContext('2d');
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

    const ctx = this.markupLayer.getContext('2d');
    ctx.strokeStyle = '#000'; // Maybe try other colors?
    ctx.lineWidth = this.unit / 10;

    ctx.beginPath();
    ctx.moveTo(x1Coord, y1Coord);
    ctx.lineTo(x2Coord, y2Coord);
    ctx.stroke();
  };

  public drawLabel = (x: number, y: number, label: string, color: string) => {
    const ctx = this.markupLayer.getContext('2d');
    ctx.font = `${this.unit * 0.7}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color;
    ctx.fillText(label, this.getCoord(x), this.getCoord(y) + 0.7);
  };

  public resetMarkup = () => {
    const ctx = this.markupLayer.getContext('2d');
    ctx.clearRect(0, 0, this.markupLayer.width, this.markupLayer.height);
  };

  private getCoord = (coord: number) => coord * this.unit + this.unit - 0.5;
}

const Board = styled.canvas`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`;

const Goban: React.FunctionComponent<GobanProps> = ({
  children,
  className,
  smallBoard = false,
  observeRect = true,
}) => {
  const { gameState, getNode } = useGoGameContext();
  const { boardState, properties, node } = gameState;
  const containerRef = useRef(null);
  const markupLayerRef = useRef(null);
  const goban: React.MutableRefObject<GobanCanvas> = useRef(null);

  const drawBoardState = useCallback(() => {
    const boardSize = properties.boardSize || [19, 19];
    if (goban.current) goban.current.setSize(boardSize);
    else
      goban.current = new GobanCanvas(
        markupLayerRef.current,
        containerRef.current,
        boardSize
      );

    const pointToXY = (point: string): [number, number] => {
      const A = 'a'.charCodeAt(0);
      const x = point.charCodeAt(0) - A;
      const y = point.charCodeAt(1) - A;
      return [x, y];
    };

    const getMarkupColor = (point: string) =>
      boardState[point] === 'b' ? '#fff' : '#000';

    // Erase layers that need to be redrawn
    goban.current.resetMarkup();

    const currentNode = getNode(node);
    const currentMove =
      currentNode &&
      currentNode.properties &&
      (currentNode.properties.B || currentNode.properties.W);
    const currentPoint = currentMove && currentMove[0];
    let highlightCurrentMove = !!currentMove;

    gameState.moveState.triangles.forEach(point => {
      const coord = pointToXY(point);
      const color = getMarkupColor(point);
      goban.current.drawTriangle(coord[0], coord[1], color);
      if (point === currentPoint) highlightCurrentMove = false;
    });

    gameState.moveState.squares.forEach(point => {
      const coord = pointToXY(point);
      const color = getMarkupColor(point);
      goban.current.drawSquare(coord[0], coord[1], color);
      if (point === currentPoint) highlightCurrentMove = false;
    });

    gameState.moveState.circles.forEach(point => {
      const coord = pointToXY(point);
      const color = getMarkupColor(point);
      goban.current.drawCircle(coord[0], coord[1], color);
      if (point === currentPoint) highlightCurrentMove = false;
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
      if (point === currentPoint) highlightCurrentMove = false;
    });

    gameState.moveState.labels.forEach(label => {
      const coord = pointToXY(label.point);
      const color = getMarkupColor(label.point);
      goban.current.drawLabel(coord[0], coord[1], label.label, color);
      if (label.point === currentPoint) highlightCurrentMove = false;
    });

    if (highlightCurrentMove) {
      const coord = pointToXY(currentPoint);
      goban.current.drawCircle(
        coord[0],
        coord[1],
        boardState[currentPoint] === 'b' ? '#fff' : '#000'
      );
    }
  }, [gameState, boardState, node, getNode, properties.boardSize, smallBoard]);

  useEffect(() => drawBoardState(), [
    drawBoardState,
    boardState,
    properties.boardSize,
  ]);

  // re-init and re-draw when board resizes
  const containerRect = useRect(containerRef, observeRect);
  const height = (containerRect && containerRect.height) || 100;
  const width = (containerRect && containerRect.height) || 100;
  useEffect(() => {
    goban.current.init();
    drawBoardState();
  }, [height, width, drawBoardState]);

  // re-init on window resize if observeRect is false
  useWindowResizeCallback(() => {
    if (!observeRect) {
      // The timeout helps ensure that the resize as actually finished
      setTimeout(() => {
        goban.current.init();
        drawBoardState();
      }, 250);
    }
  });

  const CanvasContainer = observeRect
    ? ObservedCanvasContainer
    : WindowResizableCanvasContainer;

  return (
    <CanvasContainer ref={containerRef} className={className}>
      <BoardLayer showCoords={!smallBoard} />
      <StoneLayer />
      <Board ref={markupLayerRef} />
      {children}
    </CanvasContainer>
  );
};

export default Goban;
