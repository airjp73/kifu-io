const xyToPoint = (xy: [number, number]): string => {
  const A = 'a'.charCodeAt(0);
  const [x, y] = xy;
  const xPoint = String.fromCharCode(A + x);
  const yPoint = String.fromCharCode(A + y);
  return `${xPoint}${yPoint}`;
};

export default xyToPoint;
