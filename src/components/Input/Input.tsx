import React, { forwardRef, useRef } from 'react';
import styled from 'styled-components';
import MaterialInput from './MaterialInput';

interface InputProps
  extends React.AllHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  className?: string;
  error?: string;
  hint?: string;
  icon?: string;
  inputRef?: InputRef;
  label?: string;
  type?: string;
  value?: string;
}

interface InputRef {
  (ref: HTMLInputElement | HTMLTextAreaElement): void;
}

const InputElement = styled.input`
  border: none;
  outline: none;
  background: none;
  padding: 0;
  height: 1rem;
  width: 100%;
  cursor: pointer;
`;

const TextAreaElement = styled.textarea`
  border: none;
  outline: none;
  background: none;
  padding: 0;
  resize: none;
  height: 5rem;
  width: 100%;
  cursor: pointer;
`;

const Input: React.FunctionComponent<
  InputProps & React.HTMLProps<HTMLInputElement>
> = ({ className, error, hint, icon, label, type, value, ...rest }, ref) => {
  console.log(ref);
  return (
    <MaterialInput
      className={className}
      error={error}
      hint={hint}
      icon={icon}
      // inputHasContent={!!inputValue}
      label={label}
    >
      {type === 'textarea' ? (
        <TextAreaElement
          ref={ref}
          // {...rest}
          // value={inputValue}
          // ref={this._getInputElementRef}
        />
      ) : (
        <InputElement
        // {...rest}
        // type={type}
        // value={inputValue}
        // ref={this._getInputElementRef}
        />
      )}
    </MaterialInput>
  );
};

export default Input;
