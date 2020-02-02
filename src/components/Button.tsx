import React from 'react';
import styled from 'styled-components';
import { boxShadowDepressed, boxShadowLow, primaryAction, teal } from 'style';

export interface ButtonProps {
  icon?: React.ReactElement;
}

const ButtonContainer = styled.button`
  border: none;
  border-radius: 0.2rem;
  color: ${teal[0]};
  text-transform: uppercase;
  padding: 0 1rem;
  min-width: 4rem;
  display: flex;
  align-items: center;
  line-height: 2.5rem;

  background-color: ${props => (props.disabled ? teal[70] : primaryAction)};
  box-shadow: ${props => (props.disabled ? 'none' : boxShadowLow)};
  ${props => !props.disabled && 'cursor: pointer;'} :hover {
    ${props =>
      props.disabled
        ? 'box-shadow: none;'
        : `
      box-shadow: ${boxShadowDepressed};
      transform: translateY(1px);
    `}
  }

  :active:not(:disabled) {
    box-shadow: ${boxShadowLow} inset;
  }

  > * + * {
    margin-left: 0.5rem;
  }
`;

const Button: React.FunctionComponent<ButtonProps &
  React.ComponentProps<typeof ButtonContainer>> = ({
  children,
  icon,
  ...rest
}) => (
  <ButtonContainer {...rest}>
    {icon}
    <span>{children}</span>
  </ButtonContainer>
);

export default Button;
