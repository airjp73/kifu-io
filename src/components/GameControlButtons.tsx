import React from 'react';
import styled from 'styled-components';
import { useGoGameContext } from 'contexts/GoGameContext';
import FontIcon from './FontIcon';
import FlatButton from './FlatButton';
import { dark, lightBorder } from 'style';

interface GameControlButtonsProps {
  className?: string;
}

const GameControlButtonBar = styled.div`
  display: flex;
  justify-content: space-evenly;
  color: ${dark};
`;

const GameControlButtons: React.FunctionComponent<GameControlButtonsProps> = ({
  className,
}) => {
  const { forward, back } = useGoGameContext();

  return (
    <GameControlButtonBar className={className}>
      <FlatButton onClick={() => back(-1)}>
        <FontIcon icon="skip_previous" />
      </FlatButton>
      <FlatButton onClick={() => back(10)}>
        <FontIcon icon="fast_rewind" />
      </FlatButton>
      <FlatButton onClick={() => back(1)}>
        <FontIcon icon="navigate_before" />
      </FlatButton>
      <FlatButton onClick={() => forward(1)}>
        <FontIcon icon="navigate_next" />
      </FlatButton>
      <FlatButton onClick={() => forward(10)}>
        <FontIcon icon="fast_forward" />
      </FlatButton>
      <FlatButton onClick={() => forward(-1)}>
        <FontIcon icon="skip_next" />
      </FlatButton>
    </GameControlButtonBar>
  );
};

export default GameControlButtons;
