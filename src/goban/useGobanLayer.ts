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
    const unit = calculateUnit(height, width, boardHeight, boardWidth);
    const stoneRadius = unit / 2.08;

    // TODO: support irregular board sizes
    return {
      height: calcNonBlurryLength(unit, boardHeight),
      width: calcNonBlurryLength(unit, boardWidth),
      unit,
      stoneRadius,
      getCoord: coord => Math.round(coord * unit + unit),
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
  boardHeight: number,
  boardWidth: number
) {
  const widthUnit = width / (boardWidth + 1);
  const heightUnit = height / (boardHeight + 1);
  return Math.min(widthUnit, heightUnit);
}

/**
 * Calculates the height or width of the goban canvas based on the unit and the board size.
 * For some reason, the canvas is blurry if the height and width are odd,
 * so this function ensures that it is always even.
 *
 * @param unit the pre-calculated distance between points on the canvas
 * @param boardLength height or width of goban in number of points
 */
function calcNonBlurryLength(unit: number, boardLength: number) {
  const length = Math.round(unit * (boardLength + 1));
  const adjuster = length % 2 === 1 ? 1 : 0;
  return length + adjuster;
}

export default useGobanLayer;
