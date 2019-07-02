import React from 'react';
import { InputContainer, HintText, LabelText } from './stylePieces';

export interface MaterialInputProps {
  children?: any;
  className?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactElement;
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
      {icon}
    </InputContainer>
  );
};

export default MaterialInput;
