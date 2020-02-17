import React from 'react';
import { animated } from 'react-spring';
import styled, { css } from 'styled-components';
import 'styled-components/macro';
import Fab from './Fab';
import { darkFaded, highlight } from 'style';

const AnimatedFab = animated(Fab);

export enum labelDirections {
  RIGHT = 'RIGHT',
  LEFT = 'LEFT',
}

interface SpeedDialOptionProps
  extends React.ComponentProps<typeof AnimatedFab> {
  label: string;
  labelDirection?: labelDirections;
}

const Label = animated(styled.span<{ labelDirection: labelDirections }>`
  position: absolute;
  font-size: 0.7rem;
  background-color: ${darkFaded};
  color: ${highlight};
  padding: 0.5rem;
  border-radius: 5px;
  white-space: nowrap;
  cursor: default;

  ${({ labelDirection }) => {
    switch (labelDirection) {
      case labelDirections.RIGHT:
        return css`
          top: 0.4rem;
          left: calc(100% + 0.5em);
        `;
      case labelDirections.LEFT:
        return css`
          top: 0.4rem;
          right: calc(100% + 0.5em);
        `;
    }
  }}
`);

const SpeedDialOption: React.FC<SpeedDialOptionProps> = ({
  children,
  label,
  labelDirection = labelDirections.LEFT,
  style = {},
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
    <Label style={{ opacity: style.opacity }} labelDirection={labelDirection}>
      {label}
    </Label>
  </span>
);

export default SpeedDialOption;
