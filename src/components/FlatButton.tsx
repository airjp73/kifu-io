import React from 'react';
import styled from 'styled-components';
import {
  primaryHighlight,
  panelHighlight,
  panelActiveButton,
  primaryAction,
  primaryActive,
} from 'style';

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
  cursor: pointer;

  ${props => props.primary && primaryStyles};

  :hover {
    background-color: ${props =>
      props.primary ? primaryHighlight : panelHighlight};
  }

  :active {
    background-color: ${props =>
      props.primary ? primaryActive : panelActiveButton};
  }

  > * + * {
    margin-left: 0.5rem;
  }
`;

const FlatButton: React.FunctionComponent<
  FlatButtonProps & React.ComponentProps<typeof FlatButtonStyles>
> = ({ children, leftIcon, primary, rightIcon, ...rest }) => (
  <FlatButtonStyles primary={primary} type="button" {...rest}>
    {leftIcon}
    {children && <span>{children}</span>}
    {rightIcon}
  </FlatButtonStyles>
);

export default FlatButton;
