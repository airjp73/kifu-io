import { setCanvasDimensionsWithCorrectScaling } from './util';

export type StoneSpriteFactory = (
  raius: number,
  canvas?: HTMLCanvasElement
) => HTMLCanvasElement;

const createStoneSprite = (
  radius: number,
  highlightColor: string,
  baseColor: string,
  gradientEnd: number,
  canvas: HTMLCanvasElement = document.createElement('canvas')
) => {
  const padding = calculateStonePadding(radius);
  const length = (radius + padding) * 2;
  setCanvasDimensionsWithCorrectScaling(canvas, length, length);

  const stoneCenter = radius + padding;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Unable to get canvas context');

  const highlightCenter = stoneCenter - radius / 3;
  const gradient = ctx.createRadialGradient(
    highlightCenter,
    highlightCenter,
    2,
    stoneCenter,
    stoneCenter,
    radius
  );
  gradient.addColorStop(0, highlightColor);
  gradient.addColorStop(gradientEnd, baseColor);

  ctx.fillStyle = gradient;
  ctx.shadowBlur = radius * 0.1;
  ctx.shadowOffsetX = radius * 0.11;
  ctx.shadowOffsetY = radius * 0.11;
  ctx.shadowColor = 'rgba(0, 0, 0, .35)';

  ctx.beginPath();
  ctx.moveTo(stoneCenter, padding);
  ctx.arc(stoneCenter, stoneCenter, radius, 0, Math.PI * 2);
  ctx.fill();
  return canvas;
};

export const createBlackStone: StoneSpriteFactory = (
  radius: number,
  canvas?: HTMLCanvasElement
) => createStoneSprite(radius, '#555', '#000', 0.85, canvas);

export const createWhiteStone: StoneSpriteFactory = (
  radius: number,
  canvas?: HTMLCanvasElement
) => createStoneSprite(radius, '#fff', '#bbb', 0.95, canvas);

export const createSimpleBlackStone: StoneSpriteFactory = (
  radius: number,
  canvas?: HTMLCanvasElement
) => createStoneSprite(radius, '#000', '#000', 1, canvas);

export const createSimpleWhiteStone: StoneSpriteFactory = (
  radius: number,
  canvas?: HTMLCanvasElement
) => createStoneSprite(radius, '#fff', '#fff', 1, canvas);

export const createSelectionHighlight = (radius: number, color: string) => {
  const padding = 2;
  const canvas = document.createElement('canvas');
  canvas.width = (radius + padding) * 2;
  canvas.height = (radius + padding) * 2;

  const stoneCenter = radius + padding;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Unabled to get canvas context');

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(stoneCenter, padding);
  ctx.arc(stoneCenter, stoneCenter, radius, 0, Math.PI * 2);
  ctx.fill();
  return canvas;
};

export function calculateStonePadding(radius: number) {
  return radius * 1.5;
}

export default createStoneSprite;

export const getStoneSize = (stone: HTMLCanvasElement) => {
  const width = stone.style.width;
  return parseInt(width.substr(0, width.length - 2));
};

export const createDoubleStone: StoneSpriteFactory = (
  radius: number,
  canvas: HTMLCanvasElement = document.createElement('canvas')
) => {
  const stoneRadius = radius * 0.75;
  const padding = calculateStonePadding(stoneRadius) / 4;
  const black = createBlackStone(stoneRadius);
  const white = createWhiteStone(stoneRadius);

  const length = (stoneRadius + padding) * 5;
  setCanvasDimensionsWithCorrectScaling(canvas, length, length);

  const ctx = canvas.getContext('2d');
  const stoneSize = getStoneSize(black);

  ctx.drawImage(black, padding, padding, stoneSize, stoneSize);
  ctx.drawImage(
    white,
    radius + padding,
    radius / 2 + padding,
    stoneSize,
    stoneSize
  );

  return canvas;
};
