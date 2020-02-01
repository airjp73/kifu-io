import React, { useRef } from 'react';
import ObservedCanvasContainer from './canvas/ObservedCanvasContainer';
import WindowResizableCanvasContainer from './canvas/WindowResizableCanvasContainer';
import {
  createBlackStone,
  createWhiteStone,
  createSimpleBlackStone,
  createSimpleWhiteStone,
} from 'canvas/createStoneSprite';
import StoneLayer from './StoneLayer';
import BoardLayer from './BoardLayer';
import MarkupLayer from './MarkupLayer';
import EditingLayer from './EditingLayer';

interface GobanProps {
  className?: string;
  smallBoard?: boolean;
  observeRect?: boolean;
}

export type StoneColor = 'b' | 'w';

const Goban: React.FunctionComponent<GobanProps> = ({
  children,
  className,
  smallBoard = false,
  observeRect = true,
}) => {
  const containerRef = useRef(null);

  const CanvasContainer = observeRect
    ? ObservedCanvasContainer
    : WindowResizableCanvasContainer;

  const blackStoneFactory = smallBoard
    ? createSimpleBlackStone
    : createBlackStone;

  const whiteStoneFactory = smallBoard
    ? createSimpleWhiteStone
    : createWhiteStone;

  return (
    <CanvasContainer ref={containerRef} className={className}>
      <BoardLayer showCoords={!smallBoard} />
      <StoneLayer
        blackStoneFactory={blackStoneFactory}
        whiteStoneFactory={whiteStoneFactory}
      />
      <MarkupLayer />
      {children}
      {false && !smallBoard && (
        <EditingLayer
          blackStoneFactory={blackStoneFactory}
          whiteStoneFactory={whiteStoneFactory}
        />
      )}
    </CanvasContainer>
  );
};

export default Goban;
