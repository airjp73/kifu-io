import React, { forwardRef, useState } from 'react';
import styled from 'styled-components';
import MaterialInput from './MaterialInput';
import { LabelText } from './stylePieces';

interface UploadInputProps extends React.AllHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: string;
  hint?: string;
  icon?: string;
  label?: string;
  type?: string;
}

const FileInput = styled.input`
  visibility: hidden;
  height: 0;
  width: 0;
  margin: 0;
  padding: 0;
`;

const UploadInput: React.FunctionComponent<
  UploadInputProps & React.ComponentProps<typeof FileInput>
> = (
  { className, error, hint, label, onChange, type, ...rest },
  forwardedRef
) => {
  const [currentFilename, setCurrentFilename] = useState(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentFilename(
      event.currentTarget.files[0] && event.currentTarget.files[0].name
    );
    onChange && onChange(event);
  };

  return (
    <MaterialInput
      className={className}
      error={error}
      hint={hint}
      icon="insert_drive_file"
      isOpen={!!currentFilename}
      label={label}
    >
      {currentFilename && <LabelText>{currentFilename}</LabelText>}
      <FileInput
        {...rest}
        type="file"
        onChange={handleChange}
        ref={forwardedRef}
      />
    </MaterialInput>
  );
};

export default forwardRef(UploadInput);
