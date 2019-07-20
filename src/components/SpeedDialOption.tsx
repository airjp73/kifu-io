import React from 'react';
import { animated } from 'react-spring';
import styled, { css } from 'styled-components';
import 'styled-components/macro';
import Fab from './Fab';
import { darkFaded, highlight } from 'style';

const AnimatedFab = animated(Fab);

interface SpeedDialOptionProps
  extends React.ComponentProps<typeof AnimatedFab> {
  label: string;
}

const Label = animated(styled.span`
  position: absolute;
  font-size: 0.7rem;
  background-color: ${darkFaded};
  color: ${highlight};
  right: calc(100% + 0.5em);
  top: 0.1rem;
  padding: 0.5rem;
  border-radius: 5px;
  white-space: nowrap;
  cursor: default;
`);

const SpeedDialOption: React.FC<SpeedDialOptionProps> = ({
  children,
  label,
  style,
  ...rest
}) => (
  <span
    css={css`
      position: relative;
    `}
  >
    <AnimatedFab size="SMALL" style={{ transform: style.transform }} {...rest}>
      {children}
    </AnimatedFab>
    <Label style={{ opacity: style.opacity }}>{label}</Label>
  </span>
);

export default SpeedDialOption;
