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
  icon?: string;
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

  ${FontIcon} {
    font-size: 1rem;
  }
`;

const FlatButton: React.FunctionComponent<
  FlatButtonProps & React.ComponentProps<typeof FlatButtonStyles>
> = ({ children, icon, primary, rightIcon, ...rest }) => (
  <FlatButtonStyles primary={primary} {...rest}>
    {icon && <FontIcon style={{ marginRight: '.5rem' }} icon={icon} />}
    {children}
    {rightIcon && <FontIcon style={{ marginLeft: '.5rem' }} icon={rightIcon} />}
  </FlatButtonStyles>
);

export default FlatButton;
