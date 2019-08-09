export function setCanvasDimensionsWithCorrectScaling(
  canvas: HTMLCanvasElement,
  width: number,
  height: number
) {
  const ctx = canvas.getContext('2d');
  const devicePixelRatio = window.devicePixelRatio || 1;
  const backingStoreRatio =
    (ctx as any).webkitBackingStorePixelRatio ||
    (ctx as any).mozBackingStorePixelRatio ||
    (ctx as any).msBackingStorePixelRatio ||
    (ctx as any).oBackingStorePixelRatio ||
    (ctx as any).backingStorePixelRatio ||
    1;
  const ratio = devicePixelRatio / backingStoreRatio;

  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = `${Math.round(width)}px`;
  canvas.style.height = `${Math.round(height)}px`;

  ctx.scale(ratio, ratio);
}
