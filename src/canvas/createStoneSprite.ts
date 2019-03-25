const createStoneSprite = (
  radius: number,
  highlightColor: string,
  baseColor: string,
  gradientEnd: number
) => {
  const padding = 2;
  const canvas = document.createElement('canvas');
  canvas.width = radius * 2 + padding + 10;
  canvas.height = radius * 2 + padding + 10;

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
  ctx.shadowBlur = 2;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.shadowColor = 'rgba(0, 0, 0, .35)';

  ctx.beginPath();
  ctx.moveTo(stoneCenter, padding);
  ctx.arc(stoneCenter, stoneCenter, radius, 0, Math.PI * 2);
  ctx.fill();
  return canvas;
};

export const createBlackStone = (radius: number) =>
  createStoneSprite(radius, '#555', '#000', 0.85);

export const createWhiteStone = (radius: number) =>
  createStoneSprite(radius, '#fff', '#bbb', 0.95);

export default createStoneSprite;
