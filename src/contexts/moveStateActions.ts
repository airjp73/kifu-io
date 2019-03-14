export const ADD_CIRCLES = 'ADD_CIRCLES';
export const ADD_SQUARES = 'ADD_SQUARES';
export const ADD_TRIANGLES = 'ADD_TRIANGLES';

export interface AddCirclesAction {
  type: typeof ADD_CIRCLES;
  circles: string[];
}
export const addCircles = (circles: string[]): AddCirclesAction => ({
  type: ADD_CIRCLES,
  circles,
});

export interface AddSquaresAction {
  type: typeof ADD_SQUARES;
  squares: string[];
}
export const addSquares = (squares: string[]): AddSquaresAction => ({
  type: ADD_SQUARES,
  squares,
});

export interface AddTrianglesAction {
  type: typeof ADD_TRIANGLES;
  triangles: string[];
}
export const addTriangles = (triangles: string[]): AddTrianglesAction => ({
  type: ADD_TRIANGLES,
  triangles,
});