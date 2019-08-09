import React, { useRef, useEffect } from 'react';
import CanvasLayer from './canvas/CanvasLayer';
import useGobanLayer from './useGobanLayer';
import { useGoGameContext } from './GoGameContext';
import pointToXY from './pointToXY';

const MarkupLayer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { height, width, getCoord, stoneRadius, unit } = useGobanLayer();
  const { getNode, gameState } = useGoGameContext();
  const { boardState, moveState, node } = gameState;

  const currentNode = getNode(node);
  const currentMove =
    currentNode &&
    currentNode.properties &&
    (currentNode.properties.B || currentNode.properties.W);
  const currentPoint = currentMove && currentMove[0];

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    let highlightCurrentMove = !!currentPoint;
    const getMarkupColor = (point: string): string =>
      boardState[point] === 'b' ? '#fff' : '#000';

    drawMarkup(moveState.triangles, drawTriangle);
    drawMarkup(moveState.squares, drawSquare);
    drawMarkup(moveState.circles, drawCircle);
    drawMarkup(moveState.xMarks, drawXMark);

    moveState.lines.forEach(line => {
      const coord1 = pointToXY(line[0]);
      const coord2 = pointToXY(line[1]);
      drawLine(coord1[0], coord1[1], coord2[0], coord2[1]);
    });

    moveState.labels.forEach(label => {
      const coord = pointToXY(label.point);
      const color = getMarkupColor(label.point);
      drawLabel(coord[0], coord[1], label.label, color);
      if (label.point === currentPoint) highlightCurrentMove = false;
    });

    if (highlightCurrentMove) {
      const coord = pointToXY(currentPoint);
      drawCircle(
        coord[0],
        coord[1],
        boardState[currentPoint] === 'b' ? '#fff' : '#000'
      );
    }

    function drawMarkup(
      points: string[],
      draw: (x: number, y: number, color: string) => void
    ) {
      points.forEach(point => {
        const coord = pointToXY(point);
        const color = getMarkupColor(point);
        draw(coord[0], coord[1], color);
        if (point === currentPoint) highlightCurrentMove = false;
      });
    }

    function drawTriangle(x: number, y: number, color: string) {
      const triangleRadius = stoneRadius - stoneRadius / 6;
      const xCoord = getCoord(x);
      const yCoord = getCoord(y);
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

      ctx.strokeStyle = color;
      ctx.lineWidth = unit / 18;
      ctx.beginPath();
      ctx.moveTo(point1[0], point1[1]);
      ctx.lineTo(point2[0], point2[1]);
      ctx.lineTo(point3[0], point3[1]);
      ctx.lineTo(point1[0], point1[1]);
      ctx.closePath();
      ctx.stroke();
    }

    function drawSquare(x: number, y: number, color: string) {
      const squareWidth = stoneRadius * 1.25;
      const xCoord = getCoord(x);
      const yCoord = getCoord(y);

      ctx.strokeStyle = color;
      ctx.lineWidth = unit / 18;

      ctx.beginPath();
      ctx.moveTo(xCoord - squareWidth / 2, yCoord - squareWidth / 2);
      ctx.lineTo(xCoord + squareWidth / 2, yCoord - squareWidth / 2);
      ctx.lineTo(xCoord + squareWidth / 2, yCoord + squareWidth / 2);
      ctx.lineTo(xCoord - squareWidth / 2, yCoord + squareWidth / 2);
      ctx.lineTo(xCoord - squareWidth / 2, yCoord - squareWidth / 2);
      ctx.closePath();
      ctx.stroke();
    }

    function drawCircle(x: number, y: number, color: string) {
      const circleRadius = stoneRadius * 0.55;
      const xCoord = getCoord(x);
      const yCoord = getCoord(y);

      ctx.strokeStyle = color;
      ctx.lineWidth = unit / 18;

      ctx.beginPath();
      ctx.moveTo(xCoord + circleRadius, yCoord);
      ctx.arc(xCoord, yCoord, circleRadius, 0, Math.PI * 2);
      ctx.stroke();
    }

    function drawLine(x1: number, y1: number, x2: number, y2: number) {
      const x1Coord = getCoord(x1);
      const y1Coord = getCoord(y1);
      const x2Coord = getCoord(x2);
      const y2Coord = getCoord(y2);

      ctx.strokeStyle = '#000'; // Maybe try other colors?
      ctx.lineWidth = unit / 10;

      ctx.beginPath();
      ctx.moveTo(x1Coord, y1Coord);
      ctx.lineTo(x2Coord, y2Coord);
      ctx.stroke();
    }

    function drawXMark(x: number, y: number, color: string) {
      drawLabel(x, y, 'X', color);
    }

    function drawLabel(x: number, y: number, label: string, color: string) {
      ctx.font = `${unit * 0.7}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = color;
      ctx.fillText(label, getCoord(x), getCoord(y) + 0.7);
    }

    return () => ctx.clearRect(0, 0, width, height);
  }, [
    height,
    width,
    currentPoint,
    boardState,
    moveState,
    getCoord,
    stoneRadius,
    unit,
  ]);

  return <CanvasLayer ref={canvasRef} height={height} width={width} />;
};

export default MarkupLayer;
