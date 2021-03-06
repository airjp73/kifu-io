import React from 'react';
import styled from 'styled-components';
import { primaryAction, purple, teal } from 'style';

const primaryHighlight = `${teal[10]}77`;
const primaryActive = `${teal[30]}77`;
const panelActiveButton = `${purple[50]}77`;
const panelHighlight = `${purple[30]}77`;

interface FlatButtonProps {
  leftIcon?: React.ReactElement;
  primary?: boolean;
  rightIcon?: React.ReactElement;
}

interface FlatButtonStyleProps extends React.HTMLProps<HTMLButtonElement> {
  primary?: boolean;
}

const primaryStyles = `
  color: ${primaryAction};
  font-weight: 600;
`;

const FlatButtonStyles = styled.button<FlatButtonStyleProps>`
  border: none;
  outline: none;
  color: inherit;
  padding: 0.5rem;
  background: none;
  display: flex;
  align-items: center;

  ${props => props.primary && primaryStyles};

  :not(:disabled) {
    cursor: pointer;

    &:hover,
    &:focus {
      background-color: ${props =>
        props.primary ? primaryHighlight : panelHighlight};
    }

    &:active {
      background-color: ${props =>
        props.primary ? primaryActive : panelActiveButton};
    }
  }

  :disabled {
    opacity: 0.5;
  }

  > * + * {
    margin-left: 0.5rem;
  }
`;

const FlatButton: React.FunctionComponent<FlatButtonProps &
  React.ComponentProps<typeof FlatButtonStyles>> = ({
  children,
  leftIcon,
  primary,
  rightIcon,
  ...rest
}) => (
  <FlatButtonStyles primary={primary} type="button" {...rest}>
    {leftIcon}
    {children && <span>{children}</span>}
    {rightIcon}
  </FlatButtonStyles>
);

export default FlatButton;
