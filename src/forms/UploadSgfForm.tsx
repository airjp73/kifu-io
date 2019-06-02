import React, { useEffect, useState, useRef } from 'react';
import { UploadInput } from 'components/Input';
import { GoGameContextProvider } from 'goban/GoGameContext';
import Goban from 'goban/Goban';
import GameControlButtons from 'goban/GameControlButtons';

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

const UploadSgfForm = () => {
  const [file, setFile] = useState<File>(null);
  const contents = useFileContents(file);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFile(event.currentTarget.files[0]);

  return (
    <>
      <UploadInput label="SGF File" onChange={handleChange} />
      {contents && (
        <GoGameContextProvider key={contents} sgf={contents}>
          <div style={{ display: 'grid', height: '500px' }}>
            <Goban />
          </div>
          <GameControlButtons />
        </GoGameContextProvider>
      )}
    </>
  );
};

export default UploadSgfForm;
