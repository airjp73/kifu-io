import React from 'react';
import styled from 'styled-components';
import { useGoGameContext } from 'goban/GoGameContext';
import {
  SkipBack,
  Rewind,
  ChevronLeft,
  ChevronRight,
  FastForward,
  SkipForward,
} from 'react-feather';
import FlatButton from '../components/FlatButton';
import { dark } from 'style';
import HideInSmallLandscape from 'components/HideInSmallLandscape';

interface GameControlButtonsProps {
  className?: string;
}

const GameControlButtonBar = styled.div`
  display: flex;
  justify-content: space-evenly;
  color: ${dark};
  max-width: 100%;
`;

const GameControlButtons: React.FunctionComponent<GameControlButtonsProps> = ({
  className,
  children,
}) => {
  const { forward, back } = useGoGameContext();

  return (
    <GameControlButtonBar className={className}>
      <HideInSmallLandscape>
        <FlatButton onClick={() => back(-1)}>
          <SkipBack fill="currentColor" />
        </FlatButton>
      </HideInSmallLandscape>
      <FlatButton onClick={() => back(10)}>
        <Rewind fill="currentColor" />
      </FlatButton>
      <FlatButton onClick={() => back(1)}>
        <ChevronLeft />
      </FlatButton>
      {children}
      <FlatButton onClick={() => forward(1)}>
        <ChevronRight />
      </FlatButton>
      <FlatButton onClick={() => forward(10)}>
        <FastForward fill="currentColor" />
      </FlatButton>
      <HideInSmallLandscape>
        <FlatButton onClick={() => forward(-1)}>
          <SkipForward fill="currentColor" />
        </FlatButton>
      </HideInSmallLandscape>
    </GameControlButtonBar>
  );
};

export default GameControlButtons;
