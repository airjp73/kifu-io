import React from 'react';
import styled from 'styled-components';
import { useGoGameContext } from 'contexts/GoGameContext';
import FontIcon from './FontIcon';
import FlatButton from './FlatButton';

const GameControlButtonBar = styled.div`
  display: flex;
  justify-content: space-evenly;
  color: black;
  background-color: white;

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  border-top: 1px solid rgba(0, 0, 0, .2);
`;

const GameControlButtons = () => {
  const { forward, back } = useGoGameContext();

  return (
    <GameControlButtonBar>
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
}

export default GameControlButtons;