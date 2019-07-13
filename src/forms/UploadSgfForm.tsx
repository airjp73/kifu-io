import React, { useEffect, useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import firebase from 'firebase';
import 'styled-components/macro';
import { UploadCloud } from 'react-feather';
import firebaseApp from 'api/firebase';
import { UploadInput } from 'components/Input';
import { GoGameContextProvider } from 'goban/GoGameContext';
import SimpleContent from 'components/SimpleContent';
import Goban from 'goban/Goban';
import GameControlButtons from 'goban/GameControlButtons';
import CaptureCounts from 'goban/CaptureCounts';
import Button from 'components/Button';
import useSgf from 'goban/useSgf';
import AutoAdvanceControl from 'goban/AutoAdvanceControl';
import useCurrentUser from 'hooks/useCurrentUser';
import WithRouter from 'components/WithRouter';
import { SgfFile, NewEntity } from 'api/apiDataTypes';
import GameAnnouncements from 'goban/GameAnnouncements';
import Tabs from 'components/Tabs/Tabs';
import TabBar from 'components/Tabs/TabBar';
import ButtonTab from 'components/Tabs/ButtonTab';
import TabContent from 'components/Tabs/TabContent';
import TabContentArea from 'components/Tabs/TabContentArea';

const firestore = firebaseApp.firestore();

const useFileContents = (file?: File): [null | string, null | string] => {
  const [contents, setContents] = useState<string>(null);
  const [error, setError] = useState<string>(null);
  const fileReader = useRef<FileReader>(null);

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
      fileReader.current.onload = () =>
        setContents(fileReader.current.result as string);
      fileReader.current.readAsText(file);
    }
  }, [file]);

  return [contents, error];
};

const UploadTabContent = styled.div`
  padding: 0 1rem;
  width: 27rem;
  height: 12rem;
`;
const UploadPreview = styled.div`
  max-width: 100vw;
  grid-area: preview;

  @media only screen and (orientation: landscape) and (max-width: 1100px) {
    height: 20rem;
  }
`;
const UploadFormFields = styled(SimpleContent)`
  max-width: 100vw;
  padding: 0;
  grid-area: fields;
  overflow: hidden;
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

  @media only screen and (orientation: landscape) and (min-width: 1100px) {
    grid-template-areas:
      'fields captures'
      'fields preview'
      'fields buttons';
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr auto;
  }

  @media only screen and (orientation: portrait), (max-width: 1100px) {
    grid-template-areas:
      'fields'
      'captures'
      'preview'
      'buttons';
    grid-template-rows: auto auto 1fr auto;
  }

  @media only screen and (orientation: landscape) and (max-width: 1100px) {
    height: auto;
  }
`;

const UploadSgfForm = () => {
  const [currentUser] = useCurrentUser();
  const [file, setFile] = useState<File>(null);
  const [contents, fileError] = useFileContents(file);
  const [gameTree, sgfError] = useSgf(contents);
  const [uploadError, setUploadError] = useState<string>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFile(event.currentTarget.files[0]);

  const uploadSgf = async () => {
    setUploadError(null);
    const newDocument = firestore.collection('sgfFiles').doc();
    const sgfFile: NewEntity<SgfFile> = {
      contents,
      uploadTimestamp: firebase.firestore.Timestamp.fromDate(new Date()),
      userId: currentUser ? currentUser.uid : null,
      userPhotoURL: currentUser ? currentUser.photoURL : null,
      userDisplayName: currentUser ? currentUser.displayName : null,
    };
    try {
      await newDocument.set(sgfFile);
      return newDocument.id;
    } catch (error) {
      setUploadError(error.message);
    }
  };

  return (
    <WithRouter>
      {({ history }) => (
        <UploadForm
          onSubmit={async e => {
            e.preventDefault();
            setIsUploading(true);
            const docId = await uploadSgf();
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
                    <h2>Choose a file to upload</h2>
                    <UploadInput label="SGF File" onChange={handleChange} />
                    <Button
                      css={`
                        margin-left: auto;
                      `}
                      type="submit"
                      icon={<UploadCloud />}
                      disabled={
                        isUploading || !!fileError || !!sgfError || !gameTree
                      }
                    >
                      {isUploading ? 'Uploading...' : 'Upload'}
                    </Button>
                  </TabContent>
                  <TabContent tab="raw">Stuff?</TabContent>
                </TabContentArea>
              </UploadTabContent>
            </Tabs>
            {!!uploadError && <p>{uploadError}</p>}
          </UploadFormFields>
          {gameTree && (
            <GoGameContextProvider key={contents} gameTree={gameTree}>
              <UploadCaptureCounts />
              <UploadPreview>
                <Goban
                  css={`
                    height: 100%;
                  `}
                >
                  <GameAnnouncements />
                </Goban>
              </UploadPreview>
              <UploadControlButtons>
                <AutoAdvanceControl playByDefault />
              </UploadControlButtons>
            </GoGameContextProvider>
          )}
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
