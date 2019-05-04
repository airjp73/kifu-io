import styled from 'styled-components';
import FontIcon from 'components/FontIcon';
import { fadedGrey, error, primaryAction, dark } from 'style';

interface LabelTextProps {
  isOpen?: boolean;
}

interface InputContainerProps {
  error?: string;
  isFocused?: boolean;
}

export const LabelText = styled.span<LabelTextProps>`
  position: absolute;
  pointer-events: none;
  font-size: 1rem;
  color: ${fadedGrey};
  transition: top 0.25s ease, left 0.25s ease, transform 0.25s ease;
  background-color: white;
  top: 0.75rem;
  left: 0.5rem;
  padding: 0 0.25rem;

  ${props =>
    props.isOpen &&
    `
    top: 0;
    left: .25rem;
    transform: translateY(-50%) scale(.75);
  `}
`;

export const HintText = styled.span`
  color: ${fadedGrey};
  position: absolute;
  bottom: -1.125rem;
  font-size: 0.75rem;
  left: 0.75rem;
`;

export const InputIcon = styled(FontIcon)`
  color: ${fadedGrey};
  line-height: 1rem;
`;

export const InputContainer = styled.label<InputContainerProps>`
  position: relative;
  display: flex;
  justify-content: flex-end;
  border: 1px solid ${fadedGrey};
  border-radius: 3px;
  padding: 0.75rem;
  min-width: 8rem;
  margin-bottom: 2rem;
  cursor: pointer;

  ${props =>
    props.isFocused &&
    `
    border-color: ${primaryAction};
    box-shadow: 0 0 0 1px ${primaryAction};

    ${LabelText} {
      color: ${primaryAction};
    }
  `}

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
