import React from 'react';
import styled from 'styled-components';
import FontIcon from 'components/FontIcon';
import {
  primaryHighlight,
  panelHighlight,
  panelActiveButton,
  primaryAction,
  primaryActive,
} from 'style';

interface FlatButtonProps {
  leftIcon?: string;
  primary?: boolean;
  rightIcon?: string;
}

interface FlatButtonStyleProps extends React.HTMLProps<HTMLButtonElement> {
  primary?: boolean;
}

const primaryStyles = `
  color: ${primaryAction};
  font-weight: 600;
`;

const ButtonIcon = styled(FontIcon)`
  font-size: 1rem;
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
`;

const FlatButton: React.FunctionComponent<
  FlatButtonProps & React.ComponentProps<typeof FlatButtonStyles>
> = ({ children, leftIcon, primary, rightIcon, ...rest }) => (
  <FlatButtonStyles primary={primary} {...rest}>
    {leftIcon && (
      <FontIcon
        style={{ marginRight: '.5rem' }}
        size="XSMALL"
        icon={leftIcon}
      />
    )}
    {children}
    {rightIcon && (
      <FontIcon
        style={{ marginLeft: '.5rem' }}
        size="XSMALL"
        icon={rightIcon}
      />
    )}
  </FlatButtonStyles>
);

export default FlatButton;
