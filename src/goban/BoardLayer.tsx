import React, { useEffect, useRef } from 'react';
import useGobanLayer from './useGobanLayer';
import CanvasLayer from './canvas/CanvasLayer';
import { useGoGameContext } from './GoGameContext';

interface BoardLayerProps {
  showCoords?: boolean;
}

type StarPoints = [number, number][];
const starPoints9: StarPoints = [
  [2, 2],
  [6, 2],
  [2, 6],
  [6, 6],
  [4, 4],
];
const starPoints13: StarPoints = [
  [3, 3],
  [9, 3],
  [3, 9],
  [9, 9],
  [6, 6],
];
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

const BoardLayer: React.FC<BoardLayerProps> = ({ showCoords }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { height, width, getCoord, unit, stoneRadius } = useGobanLayer();
  const context = useGoGameContext();
  const boardSize = context.gameState.properties.boardSize || [19, 19];
  const boardWidth = boardSize[0];
  const boardHeight = boardSize[1];

  useEffect(() => {
    if (!height || !width) return;
    const ctx = canvasRef.current.getContext('2d');

    drawBoard();
    if (showCoords) drawCoordinates();

    function drawBoard() {
      // Background color
      const gradient = ctx.createLinearGradient(0.2, 0.2, 0.8, 0.8);
      gradient.addColorStop(0, '#bb945d');
      gradient.addColorStop(1, '#e3b472');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const start = getCoord(0);
      const xEnd = getCoord(boardWidth - 1);
      const yEnd = getCoord(boardHeight - 1);

      ctx.beginPath();
      ctx.lineWidth = unit / 30;
      ctx.strokeStyle = '#000';

      // Vertical lines
      for (let x = 0; x < boardWidth; ++x) {
        const xCoord = getCoord(x);
        ctx.moveTo(xCoord, start);
        ctx.lineTo(xCoord, yEnd);
      }

      // Horizontal lines
      for (let y = 0; y < boardHeight; ++y) {
        const yCoord = getCoord(y);
        ctx.moveTo(start, yCoord);
        ctx.lineTo(xEnd, yCoord);
      }

      // Draw lines
      ctx.stroke();
      ctx.closePath();

      // Star points
      const starPointRadius = stoneRadius / 4;
      ctx.fillStyle = '#000';
      ctx.beginPath();

      let starPoints: StarPoints;
      if (boardWidth !== boardHeight) starPoints = [];
      else if (boardWidth === 19) starPoints = starPoints19;
      else if (boardWidth === 13) starPoints = starPoints13;
      else if (boardWidth === 9) starPoints = starPoints9;
      else starPoints = [];

      starPoints.forEach(([x, y]) => {
        const xCoord = getCoord(x);
        const yCoord = getCoord(y);
        ctx.moveTo(xCoord - starPointRadius, yCoord - starPointRadius);
        ctx.arc(xCoord, yCoord, starPointRadius, 0, Math.PI * 2);
      });

      ctx.closePath();
      ctx.fill();
    }

    function drawCoordinates() {
      ctx.font = `bold ${Math.round(unit * 0.4)}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const A = 'A'.charCodeAt(0);
      const I = 'I'.charCodeAt(0);
      const Z = 'Z'.charCodeAt(0);
      for (let x = 0; x < boardWidth; ++x) {
        // The spec technically allows boards up to 52x52
        // Other sgf views don't seem to support at all
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
        ctx.fillText(coordString, getCoord(x), getCoord(-0.5));
        ctx.fillText(coordString, getCoord(x), getCoord(boardHeight - 0.5));
      }

      for (let y = 0; y < boardHeight; ++y) {
        const coordString = (boardHeight - y).toString();
        ctx.fillText(coordString, getCoord(-0.5), getCoord(y));
        ctx.fillText(coordString, getCoord(boardWidth - 0.5), getCoord(y));
      }
    }
  }, [
    boardHeight,
    boardWidth,
    height,
    showCoords,
    stoneRadius,
    unit,
    width,
    getCoord,
  ]);

  return <CanvasLayer ref={canvasRef} height={height} width={width} />;
};

export default BoardLayer;
