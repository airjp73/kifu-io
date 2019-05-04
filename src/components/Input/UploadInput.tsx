import React from 'react';
import styled from 'styled-components';
import MaterialInput from './MaterialInput';
import { LabelText } from './stylePieces';

interface UploadInputProps extends React.AllHTMLAttributes<HTMLInputElement> {
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
  (ref: HTMLInputElement): void;
}

const FileInput = styled.input`
  visibility: hidden;
  height: 0;
  width: 0;
  margin: 0;
  padding: 0;
`;

class UploadInput extends React.Component<UploadInputProps, never> {
  inputElementRef?: HTMLInputElement;

  _getSelectedFileName = (value?: string) => {
    // This is true if this component hasn't been rendered yet
    // since the ref gets set on render
    if (!this.inputElementRef) {
      return;
    }

    // Allows the file input to be controlled which they normally can't
    // undefined === not controlled so we have to check for that
    if (!value && value !== undefined) {
      this.inputElementRef.value = '';
      return;
    }

    return this.inputElementRef.files ? this.inputElementRef.files[0].name : '';
  };

  // Gets the input ref for internal use
  // and then forwards on the external ref getter
  _getInputElementRef = (ref: HTMLInputElement) => {
    const { inputRef } = this.props;
    this.inputElementRef = ref;
    inputRef && inputRef(ref);
  };

  render() {
    const {
      className,
      error,
      hint,
      label,
      onChange,
      type,
      value,
      ...rest
    } = this.props;

    // Must be called since there's some logic in there
    const selectedFileName = this._getSelectedFileName(value);

    return (
      <MaterialInput
        className={className}
        error={error}
        hint={hint}
        icon="insert_drive_file"
        inputHasContent={!!selectedFileName}
        label={label}
      >
        {selectedFileName && <LabelText>{selectedFileName}</LabelText>}
        <FileInput
          {...rest}
          type="file"
          onChange={onChange}
          ref={this._getInputElementRef}
        />
      </MaterialInput>
    );
  }
}
export default UploadInput;
