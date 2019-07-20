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
  labelAbove?: boolean;
}

const Label = animated(styled.span<{ labelAbove?: boolean }>`
  position: absolute;
  font-size: 0.7rem;
  background-color: ${darkFaded};
  color: ${highlight};
  right: calc(100% + 0.5em);
  padding: 0.5rem;
  border-radius: 5px;
  white-space: nowrap;
  cursor: default;
  top: 0.4rem;

  ${({ labelAbove }) =>
    labelAbove &&
    css`
      bottom: calc(100% + 0.5rem);
      top: unset;
      left: -30%;
      right: -30%;
      text-align: center;
    `}
`);

const SpeedDialOption: React.FC<SpeedDialOptionProps> = ({
  children,
  label,
  labelAbove,
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
    <Label style={{ opacity: style.opacity }} labelAbove={labelAbove}>
      {label}
    </Label>
  </span>
);

export default SpeedDialOption;
