import React from 'react';
import { InputContainer, InputIcon, HintText, LabelText } from './stylePieces';

export interface MaterialInputProps {
  children?: any;
  className?: string;
  error?: string;
  hint?: string;
  icon?: string;
  isOpen?: boolean;
  label?: string;
  isFocused?: boolean;
}

const MaterialInput: React.SFC<MaterialInputProps> = ({
  children,
  error,
  hint,
  icon,
  isOpen,
  isFocused,
  label,
  ...rest
}) => {
  const hintValue = error || hint;

  return (
    <InputContainer error={error} isFocused={isFocused} {...rest}>
      <LabelText isOpen={isOpen}>{label}</LabelText>
      {hintValue && <HintText>{hintValue}</HintText>}
      {children}
      {icon && <InputIcon icon={icon} size="SMALL" />}
    </InputContainer>
  );
};

export default MaterialInput;
