import React, { useEffect, useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import 'styled-components/macro';
import { UploadCloud } from 'react-feather';
import { UploadInput } from 'components/Input';
import { GoGameContextProvider } from 'goban/GoGameContext';
import SimpleContent from 'components/SimpleContent';
import Goban from 'goban/Goban';
import Button from 'components/Button';
import useSgf from 'goban/useSgf';
import AutoAdvanceControl from 'goban/AutoAdvanceControl';
import useCurrentUser from 'hooks/useCurrentUser';
import WithRouter from 'components/WithRouter';
import GameAnnouncements from 'goban/GameAnnouncements';
import Tabs from 'components/Tabs/Tabs';
import TabBar from 'components/Tabs/TabBar';
import ButtonTab from 'components/Tabs/ButtonTab';
import TabContent from 'components/Tabs/TabContent';
import TabContentArea from 'components/Tabs/TabContentArea';
import TextArea from 'components/Input/TextArea';
import { GameTree } from 'goban/parseSgf/normalizeGameTree';
import { smallLandscapeMedia, highlightFaded } from 'style';
import usePlayerNames from 'goban/usePlayerNames';
import uploadSgf from './uploadSgf';

const useFileContents = (file: File | null): [null | string, null | string] => {
  const [contents, setContents] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileReader = useRef<FileReader | null>(null);

  useEffect(() => {
    if (fileReader.current) fileReader.current.abort();

    if (!file) {
      fileReader.current = null;
      setContents(null);
      setError(null);
    } else if (file.size > 900000) {
      fileReader.current = null;
      setContents(null);
      setError('Cannot upload file larger than 900kb');
    } else {
      setError(null);
      fileReader.current = new FileReader();
      fileReader.current.onload = () => {
        if (!fileReader.current) return;
        if (typeof fileReader.current.result === 'string')
          setContents(fileReader.current.result);
        else {
          setContents(null);
          setError('Unknown file type');
        }
      };
      fileReader.current.readAsText(file);
    }
  }, [file]);

  return [contents, error];
};

const UploadTabContent = styled.div`
  box-sizing: border-box;
  padding: 0 1rem;
  width: 27rem;
  max-width: 100vw;
  height: 11rem;

  ${smallLandscapeMedia} {
    width: 20rem;
  }
`;
const UploadPreview = styled.div`
  max-width: 100vw;
  grid-area: preview;
`;
const UploadFormFields = styled(SimpleContent)`
  max-width: 100vw;
  padding: 0;
  grid-area: fields;
  overflow: hidden;
`;
const UploadPlayers = () => {
  const names = usePlayerNames();
  return (
    <h3
      css={css`
        grid-area: captures;
        text-align: center;
        color: ${highlightFaded};
      `}
    >
      {names}
    </h3>
  );
};
const UploadForm = styled.form<{ previewing: boolean }>`
  display: grid;

  @media only screen and (orientation: landscape) and (min-width: 1000px) {
    height: 100%;
    grid-template-areas:
      'fields captures'
      'fields preview'
      'fields buttons';
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr auto;
  }

  ${smallLandscapeMedia} {
    min-height: 100%;
    grid-template-areas:
      'fields'
      'captures'
      'preview';
    grid-template-rows: min-content min-content 1fr;
  }

  @media only screen and (orientation: portrait) {
    grid-template-areas:
      'fields'
      'captures'
      'preview';
    height: 100%;
    grid-template-rows: min-content min-content 1fr;
  }
`;

const UploadSgfForm = () => {
  const [currentUser] = useCurrentUser();
  const [file, setFile] = useState<File | null>(null);
  const [contents, fileError] = useFileContents(file);
  const [rawContent, setRawContent] = useState<string>('');
  const sgf = rawContent || contents;
  const [gameTree, sgfError] = useSgf(sgf);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.currentTarget?.files?.[0] ?? null);
    setRawContent('');
  };

  const handleRawChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRawContent(event.target.value);
    setFile(null);
  };

  const GamePreview: React.FC<{ gameTree: GameTree }> = ({ gameTree }) => (
    <GoGameContextProvider gameTree={gameTree}>
      <UploadPlayers />
      <UploadPreview>
        <Goban
          css={css`
            height: 100%;

            @media only screen and (orientation: portrait) and (max-width: 1100px) {
              width: 100%;
            }
          `}
        >
          <GameAnnouncements />
        </Goban>
      </UploadPreview>
      <AutoAdvanceControl
        css={css`
          display: none;
        `}
        playByDefault
      />
    </GoGameContextProvider>
  );

  const performUpload = async (): Promise<string | null> => {
    setUploadError(null);
    return await uploadSgf(sgf, currentUser).catch(error => {
      setUploadError(error.message);
      return null;
    });
  };

  const uploadButton = (
    <Button
      css={`
        margin-left: auto;
      `}
      type="submit"
      icon={<UploadCloud />}
      disabled={isUploading || !!fileError || !!sgfError || !gameTree}
    >
      {isUploading ? 'Uploading...' : 'Upload'}
    </Button>
  );

  return (
    <WithRouter>
      {({ history }) => (
        <UploadForm
          previewing={!!gameTree}
          onSubmit={async e => {
            e.preventDefault();
            setIsUploading(true);
            const docId = await performUpload();
            setIsUploading(false);
            docId && history.push(`/view/${docId}`);
          }}
        >
          <UploadFormFields>
            <Tabs defaultTab="fileUpload">
              <TabBar>
                <ButtonTab tabName="fileUpload" label="Upload" />
                <ButtonTab tabName="raw" label="Raw SGF" />
              </TabBar>
              <UploadTabContent>
                <TabContentArea>
                  <TabContent tab="fileUpload">
                    <UploadInput
                      label="Choose an SGF to upload"
                      onChange={handleFileChange}
                    />
                    {uploadButton}
                  </TabContent>
                  <TabContent tab="raw">
                    <TextArea
                      label="Paste raw SGF data"
                      value={rawContent}
                      onChange={handleRawChange}
                    />
                    {uploadButton}
                  </TabContent>
                </TabContentArea>
              </UploadTabContent>
            </Tabs>
            {!!uploadError && <p>{uploadError}</p>}
          </UploadFormFields>
          {gameTree && <GamePreview key={contents} gameTree={gameTree} />}
          {(!!fileError || !!sgfError) && (
            <UploadPreview
              css={css`
                margin-top: 1rem;
              `}
            >
              <SimpleContent>
                <h2>Error {sgfError && 'Parsing SGF'}</h2>
                <pre
                  css={css`
                    white-space: normal;
                  `}
                >
                  {fileError || (sgfError && sgfError.message)}
                </pre>
              </SimpleContent>
            </UploadPreview>
          )}
        </UploadForm>
      )}
    </WithRouter>
  );
};

export default UploadSgfForm;
