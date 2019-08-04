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

  return useMemo(() => {
    const unit = calculateUnit(height, width, boardSize);
    const stoneRadius = unit / 2.08;

    return {
      height: unit * boardSize[0] + 1,
      width: unit * boardSize[0] + 1,
      unit,
      stoneRadius,
      getCoord: coord => coord * unit + unit * 0.5,
    };
  }, [height, width, boardSize[0], boardSize[1]]);
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
  boardSize: [number, number]
) {
  const widthUnit = width / (boardSize[0] + 1);
  const heightUnit = height / (boardSize[1] + 1);
  return Math.min(widthUnit, heightUnit);
}

export default useGobanLayer;
