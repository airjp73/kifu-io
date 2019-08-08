const pointToXY = (point: string): [number, number] => {
  const A = 'a'.charCodeAt(0);
  const x = point.charCodeAt(0) - A;
  const y = point.charCodeAt(1) - A;
  return [x, y];
};

export default pointToXY;
