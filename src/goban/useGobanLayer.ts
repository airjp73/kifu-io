import { useContext, useMemo } from 'react';
import CanvasContext from './canvas/CanvasContext';
import { useGoGameContext } from './GoGameContext';

interface GobanLayerData {
  height: number;
  width: number;
  unit: number;
  stoneRadius: number;
  getCoord: (coord: number) => number;
}

/**
 * Given the size provided by the current canvas context and the size of the goban,
 * calculate the dimensions, unit length, and stone radius.
 */
const useGobanLayer = (): GobanLayerData => {
  const { height, width } = useContext(CanvasContext);
  const goGameContext = useGoGameContext();
  const boardSize = goGameContext.gameState.properties.boardSize || [19, 19];
  const boardWidth = boardSize[0];
  const boardHeight = boardSize[1];

  return useMemo(() => {
    const unit = calculateUnit(height, width, boardWidth, boardHeight);
    const stoneRadius = unit / 2.08;

    // TODO: support irregular board sizes
    return {
      height: unit * boardWidth + 1,
      width: unit * boardWidth + 1,
      unit,
      stoneRadius,
      getCoord: coord => coord * unit + unit * 0.5,
    };
  }, [height, width, boardWidth, boardHeight]);
};

/**
 * Since the board can technically be rectangular,
 * we need to calculate the unit based on the longest side.
 *
 * @param height The height of the canvas container
 * @param width The width of the canvas container
 * @param boardSize The dimensions of the go board
 */
function calculateUnit(
  height: number,
  width: number,
  boardWidth: number,
  boardHeight: number
) {
  const widthUnit = width / (boardWidth + 1);
  const heightUnit = height / (boardHeight + 1);
  return Math.min(widthUnit, heightUnit);
}

export default useGobanLayer;
