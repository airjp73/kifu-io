import React from 'react';
import styled from 'styled-components';
import { boxShadowDepressed, boxShadowLow, primaryAction } from 'style';
import FontIcon from './FontIcon';

export interface ButtonProps {
  icon?: string;
}

const ButtonContainer = styled.button`
  border: none;
  border-radius: 0.2rem;
  color: white;
  text-transform: uppercase;
  padding: 0 1rem;
  min-width: 4rem;
  display: flex;
  align-items: center;
  line-height: 2.5rem;

  background-color: ${props => (props.disabled ? 'grey' : primaryAction)};
  box-shadow: ${props => (props.disabled ? 'none' : boxShadowLow)};
  ${props => !props.disabled && 'cursor: pointer;'}

  :hover {
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
`;

const ButtonIcon = styled(FontIcon)`
  display: inline-block;
  margin-right: 0.5rem;
  font-size: 1.25rem;
`;

const Button: React.FunctionComponent<
  ButtonProps & React.ComponentProps<typeof ButtonContainer>
> = ({ children, icon, ...rest }) => (
  <ButtonContainer {...rest}>
    {icon && <ButtonIcon icon={icon} />}
    {children}
  </ButtonContainer>
);

export default Button;
