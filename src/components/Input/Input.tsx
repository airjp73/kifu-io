import React, { useState, forwardRef } from 'react';
import styled from 'styled-components';
import useForwardedRef from 'hooks/useForwardedRef';
import MaterialInput from './MaterialInput';

interface InputProps {
  className?: string;
  error?: string;
  hint?: string;
  icon?: string;
  label?: string;
  value?: string;
}

const InputElement = styled.input`
  border: none;
  outline: none;
  background: none;
  padding: 0.75rem 0;
  height: 1rem;
  font-size: 1rem;
  line-height: 1rem;
  width: 100%;
  cursor: pointer;
`;

// // TODO: Make Separate textarea component
// const TextAreaElement = styled.textarea`
//   border: none;
//   outline: none;
//   background: none;
//   padding: 0;
//   resize: none;
//   height: 5rem;
//   width: 100%;
//   cursor: pointer;
// `;

const Input: React.FunctionComponent<
  InputProps & React.ComponentProps<typeof InputElement>
> = ({ className, error, hint, icon, label, value, ...rest }, forwardedRef) => {
  const [ref, refCallback] = useForwardedRef<HTMLInputElement>(forwardedRef);

  const getInputValue = () =>
    typeof value === 'undefined' ? ref.current && ref.current.value : value;

  const [isOpen, setIsOpen] = useState(!!getInputValue());
  const [isFocused, setIsFocused] = useState(false);

  return (
    <MaterialInput
      className={className}
      error={error}
      hint={hint}
      icon={icon}
      isOpen={isOpen}
      isFocused={isFocused}
      label={label}
    >
      <InputElement
        value={value}
        ref={refCallback}
        onFocus={() => {
          setIsOpen(true);
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsOpen(!!getInputValue());
          setIsFocused(false);
        }}
        {...rest}
      />
    </MaterialInput>
  );
};

export default forwardRef(Input);
