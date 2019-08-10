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
  editable?: boolean;
}

export type StoneColor = 'b' | 'w';

const Goban: React.FunctionComponent<GobanProps> = ({
  children,
  className,
  smallBoard = false,
  observeRect = true,
  editable = true,
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
      {editable && (
        <EditingLayer
          blackStoneFactory={blackStoneFactory}
          whiteStoneFactory={whiteStoneFactory}
        />
      )}
      <BoardLayer showCoords={!smallBoard} />
      <StoneLayer
        blackStoneFactory={blackStoneFactory}
        whiteStoneFactory={whiteStoneFactory}
      />
      <MarkupLayer />
      {children}
    </CanvasContainer>
  );
};

export default Goban;
