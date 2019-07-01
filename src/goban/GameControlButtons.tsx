import React from 'react';
import styled from 'styled-components';
import { useGoGameContext } from 'goban/GoGameContext';
import { ReactComponent as BeginningIcon } from 'svg/skip-back.svg';
import { ReactComponent as RewindIcon } from 'svg/rewind.svg';
import { ReactComponent as BackIcon } from 'svg/chevron-left.svg';
import { ReactComponent as ForwardIcon } from 'svg/chevron-right.svg';
import { ReactComponent as FastForwardIcon } from 'svg/fast-forward.svg';
import { ReactComponent as EndIcon } from 'svg/skip-forward.svg';
import FlatButton from '../components/FlatButton';
import { dark } from 'style';

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
      <FlatButton onClick={() => back(-1)}>
        <BeginningIcon fill="currentColor" />
      </FlatButton>
      <FlatButton onClick={() => back(10)}>
        <RewindIcon fill="currentColor" />
      </FlatButton>
      <FlatButton onClick={() => back(1)}>
        <BackIcon />
      </FlatButton>
      {children}
      <FlatButton onClick={() => forward(1)}>
        <ForwardIcon />
      </FlatButton>
      <FlatButton onClick={() => forward(10)}>
        <FastForwardIcon fill="currentColor" />
      </FlatButton>
      <FlatButton onClick={() => forward(-1)}>
        <EndIcon fill="currentColor" />
      </FlatButton>
    </GameControlButtonBar>
  );
};

export default GameControlButtons;
