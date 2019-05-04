import React from 'react';
import { InputContainer, InputIcon, HintText, LabelText } from './stylePieces';

export interface MaterialInputProps {
  children?: any,
  className?: string,
  error?: string,
  hint?: string,
  icon?: string,
  inputHasContent?: boolean,
  label?: string,
}

const MaterialInput: React.SFC<MaterialInputProps> = ({
  children,
  error,
  hint,
  icon,
  inputHasContent,
  label,
  ...rest
}) => {
  const hintValue = error || hint;

  return (
    <InputContainer error={error} {...rest}>
      <LabelText inputHasContent={inputHasContent}>{label}</LabelText>
      {hintValue && <HintText>{hintValue}</HintText>}
      {children}
      {icon && <InputIcon value={icon} />}
    </InputContainer>
  );
}
 

export default MaterialInput;