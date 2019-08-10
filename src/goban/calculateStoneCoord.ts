import { calculateStonePadding } from 'canvas/createStoneSprite';

/**
 * Calculates coordinates for drawing a stone on the board.
 * We want the center of the sprite on the point,
 * so we subtract the radius and sprite padding
 *
 * @param stoneRadius the radius of the stone
 * @param xCoord the x coordinate (pxs) on the canvas
 * @param yCoord the y coordinate (pxs) on the canvas
 */
function calculateStoneCoord(
  stoneRadius: number,
  xCoord: number,
  yCoord: number
) {
  const stonePadding = calculateStonePadding(stoneRadius);
  const x = Math.floor(xCoord - stoneRadius - stonePadding + 0.5);
  const y = Math.floor(yCoord - stoneRadius - stonePadding + 0.5);
  return { x, y };
}

export default calculateStoneCoord;
