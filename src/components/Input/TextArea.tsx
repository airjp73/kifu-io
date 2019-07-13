import React, { forwardRef, useState } from 'react';
import styled, { css } from 'styled-components';
import 'styled-components/macro';
import MaterialInput from './MaterialInput';
import useForwardedRef from 'hooks/useForwardedRef';

interface TextAreaProps {
  className?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactElement;
  label?: string;
  value?: string;
}

const TextAreaElement = styled.textarea`
  border: none;
  outline: none;
  background: none;
  padding: 1rem 0.75rem;
  resize: none;
  height: 5rem;
  width: 100%;
  cursor: pointer;
`;

const TextArea: React.FunctionComponent<
  TextAreaProps & React.ComponentProps<typeof TextAreaElement>
> = (
  { className, error, hint, icon, label, onChange, value, ...rest },
  forwardedRef
) => {
  const [inputRef, refCallback] = useForwardedRef<HTMLTextAreaElement>(
    forwardedRef
  );
  const [isFocused, setIsFocused] = useState(false);

  const inputValue =
    value === undefined
      ? (inputRef.current && inputRef.current.value) || ''
      : value;

  return (
    <MaterialInput
      css={`
        padding: 0;
      `}
      className={className}
      error={error}
      hint={hint}
      isOpen={isFocused || !!inputValue}
      label={label}
      icon={icon}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <TextAreaElement
        {...rest}
        value={inputValue}
        onChange={onChange}
        ref={refCallback}
      />
    </MaterialInput>
  );
};
export default forwardRef(TextArea);
