import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import 'styled-components/macro';
import { landscapeMedia, portraitMedia } from 'style';
import { UploadInput } from 'components/Input';
import { GoGameContextProvider } from 'goban/GoGameContext';
import SimpleContent from 'components/SimpleContent';
import Goban from 'goban/Goban';
import GameControlButtons from 'goban/GameControlButtons';
import CaptureCounts from 'goban/CaptureCounts';
import Button from 'components/Button';
import useSgf from 'goban/useSgf';
import AutoAdvanceControl from 'goban/AutoAdvanceControl';

const useFileContents = (file?: File): null | string => {
  const [contents, setContents] = useState<string>(null);
  const fileReader = useRef<FileReader>(null);

  useEffect(() => {
    if (fileReader.current) fileReader.current.abort();

    if (!file) {
      fileReader.current = null;
      setContents(null);
    } else {
      fileReader.current = new FileReader();
      fileReader.current.onload = () =>
        setContents(fileReader.current.result as string);
      fileReader.current.readAsText(file);
    }
  }, [file]);

  return contents;
};

const UploadPreview = styled.div`
  grid-area: preview;
`;
const UploadFormFields = styled(SimpleContent)`
  grid-area: fields;
`;
const UploadControlButtons = styled(GameControlButtons)`
  grid-area: buttons;
`;
const UploadCaptureCounts = styled(CaptureCounts)`
  grid-area: captures;
`;

const UploadForm = styled.form`
  height: 100%;
  display: grid;
  width: 100%;

  ${landscapeMedia} {
    grid-template-areas:
      'fields captures'
      'fields preview'
      'fields buttons';
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr auto;
  }

  ${portraitMedia} {
    grid-template-areas:
      'fields'
      'captures'
      'preview'
      'buttons';
    grid-template-rows: auto auto 1fr auto;
  }
`;

const UploadSgfForm = () => {
  const [file, setFile] = useState<File>(null);
  const contents = useFileContents(file);
  const [gameTree, error] = useSgf(contents);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFile(event.currentTarget.files[0]);

  return (
    <UploadForm
      onSubmit={e => {
        e.preventDefault();
        // TODO: Do actual upload
      }}
    >
      <UploadFormFields>
        <h2>Choose a file to upload</h2>
        <UploadInput label="SGF File" onChange={handleChange} />
        <Button
          css={`
            margin-left: auto;
          `}
          type="submit"
          icon="cloud_upload"
          disabled={!!error || !gameTree}
        >
          Upload Not Yet Implemented
        </Button>
      </UploadFormFields>
      {gameTree && (
        <GoGameContextProvider key={contents} gameTree={gameTree}>
          <UploadCaptureCounts />
          <UploadPreview>
            <Goban
              css={`
                height: 100%;
              `}
            />
          </UploadPreview>
          <UploadControlButtons>
            <AutoAdvanceControl />
          </UploadControlButtons>
        </GoGameContextProvider>
      )}
      {error && (
        <UploadPreview>
          <SimpleContent>
            <h2>Error Parsing SGF</h2>
            <pre>{error.message}</pre>
          </SimpleContent>
        </UploadPreview>
      )}
    </UploadForm>
  );
};

export default UploadSgfForm;
