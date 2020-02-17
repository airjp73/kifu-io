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
import { dark, smallLandscapeMedia } from 'style';
import HideInSmallLandscape from 'components/HideInSmallLandscape';
import MediaQueryView, { LandscapeView } from 'components/MediaQueryView';

interface GameControlButtonsProps {
  className?: string;
}

const GameControlButtonBar = styled.div`
  display: flex;
  justify-content: space-evenly;
  color: ${dark};
  max-width: 100%;

  ${smallLandscapeMedia} {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

const GameControlButtons: React.FunctionComponent<GameControlButtonsProps> = ({
  className,
  children,
}) => {
  const { forward, back } = useGoGameContext();

  const beginning = (
    <FlatButton onClick={() => back(-1)}>
      <SkipBack fill="currentColor" />
    </FlatButton>
  );
  const back10 = (
    <FlatButton onClick={() => back(10)}>
      <Rewind fill="currentColor" />
    </FlatButton>
  );
  const back1 = (
    <FlatButton onClick={() => back(1)}>
      <ChevronLeft />
    </FlatButton>
  );
  const forward1 = (
    <FlatButton onClick={() => forward(1)}>
      <ChevronRight />
    </FlatButton>
  );
  const forward10 = (
    <FlatButton onClick={() => forward(10)}>
      <FastForward fill="currentColor" />
    </FlatButton>
  );
  const end = (
    <FlatButton onClick={() => forward(-1)}>
      <SkipForward fill="currentColor" />
    </FlatButton>
  );

  return (
    <GameControlButtonBar className={className}>
      <HideInSmallLandscape>
        {beginning}
        {back10}
        {back1}
        {children}
        {forward1}
        {forward10}
        {end}
      </HideInSmallLandscape>
      <LandscapeView>
        <MediaQueryView maxWidth={1000}>
          {beginning}
          {end}
          {back10}
          {forward10}
          {back1}
          {forward1}
        </MediaQueryView>
      </LandscapeView>
    </GameControlButtonBar>
  );
};

export default GameControlButtons;
