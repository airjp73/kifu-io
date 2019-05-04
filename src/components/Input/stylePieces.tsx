import styled from 'styled-components';
import FontIcon from 'components/FontIcon';
import { error, primaryAction, dark } from 'style';

interface LabelTextProps {
  inputHasContent?: boolean;
}

interface InputContainerProps {
  error?: string;
}

export const labelPositionStyle = `
  top: 0;
  left: .25rem;
  transform: translateY(-50%) scale(.75);
`;

export const LabelText = styled.span<LabelTextProps>`
  position: absolute;
  pointer-events: none;
  font-size: 1rem;
  transition: all 0.25s ease;
  background-color: white;
  top: 0.75rem;
  left: 0.5rem;
  padding: 0 0.25rem;

  ${props => props.inputHasContent && labelPositionStyle}
`;

export const HintText = styled.span`
  position: absolute;
  bottom: -1.125rem;
  font-size: 0.75rem;
  left: 0.75rem;
`;

export const InputIcon = styled(FontIcon)`
  line-height: 1rem;
`;

export const InputContainer = styled.label<InputContainerProps>`
  position: relative;
  display: flex;
  justify-content: flex-end;
  /* color: ${dark}; */
  border: 1px solid ${dark};
  border-radius: 3px;
  padding: 0.75rem;
  min-width: 8rem;
  margin-bottom: 2rem;
  cursor: pointer;

  :focus-within {
    border-color: ${primaryAction};
    box-shadow: 0 0 0 1px ${primaryAction};

    ${LabelText} {
      color: ${primaryAction};
      ${labelPositionStyle}
    }
  }

  ${props =>
    props.error &&
    `
    border: 1px solid ${error};

    ${LabelText} {
      color: ${error};
    }

    ${HintText} {
      color: ${error};
    }
  `}
`;
