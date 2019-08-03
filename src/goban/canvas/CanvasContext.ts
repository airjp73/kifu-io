import { createContext } from 'react';

interface CanvasContext {
  height: number;
  width: number;
}

const CanvasContext = createContext<CanvasContext>(null);

export default CanvasContext;
