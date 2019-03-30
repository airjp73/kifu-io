import { stoneSelectionHighlight } from 'style';

const createStoneSprite = (
  radius: number,
  highlightColor: string,
  baseColor: string,
  gradientEnd: number,
  canvas: HTMLCanvasElement = document.createElement('canvas')
) => {
  const padding = calculateStonePadding(radius);
  canvas.width = (radius + padding) * 2;
  canvas.height = (radius + padding) * 2;

  const stoneCenter = radius + padding;

  const ctx = canvas.getContext('2d');

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
  ctx.shadowOffsetX = radius * 0.1;
  ctx.shadowOffsetY = radius * 0.1;
  ctx.shadowColor = 'rgba(0, 0, 0, .35)';

  ctx.beginPath();
  ctx.moveTo(stoneCenter, padding);
  ctx.arc(stoneCenter, stoneCenter, radius, 0, Math.PI * 2);
  ctx.fill();
  return canvas;
};

export const createBlackStone = (radius: number, canvas?: HTMLCanvasElement) =>
  createStoneSprite(radius, '#555', '#000', 0.85, canvas);

export const createWhiteStone = (radius: number, canvas?: HTMLCanvasElement) =>
  createStoneSprite(radius, '#fff', '#bbb', 0.95, canvas);

export const createSelectionHighlight = (radius: number) => {
  const padding = 2;
  const canvas = document.createElement('canvas');
  canvas.width = (radius + padding) * 2;
  canvas.height = (radius + padding) * 2;

  const stoneCenter = radius + padding;

  const ctx = canvas.getContext('2d');

  ctx.fillStyle = stoneSelectionHighlight;
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
